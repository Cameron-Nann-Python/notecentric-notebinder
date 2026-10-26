import api from "../api";
import { useState, useEffect } from "react";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import ClassFolder from "../components/ClassFolder";
import ModuleFolder from "../components/ModuleFolder";

function Home() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState();
  const [title, setTitle] = useState("");
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  useEffect(() => {
    getNotes();
    getClasses();
    getModules();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getClasses = () => {
    api
      .get("/api/classes/")
      .then((res) => res.data)
      .then((data) => {
        setClasses(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getModules = () => {
    api
      .get("/api/modules/")
      .then((res) => res.data)
      .then((data) => {
        setModules(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status == 204) alert("Note deleted!");
        else alert("Failed to delete note.");

        // Update notes after note deletion
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title, module: Number(selectedModule) })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to create note.");

        // Update notes after note deletion
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createClass = (e) => {
    e.preventDefault();
    api
      .post("/api/classes/", { name: className })
      .then((res) => {
        if (res.status === 201) alert("Class created!");
        else alert("Failed to create class.");

        getClasses();
      })
      .catch((err) => alert(err));
  };

  const createModule = (e) => {
    e.preventDefault();
    api
      .post("/api/modules/", {
        name: moduleName,
        class_folder: Number(selectedClass),
      })
      .then((res) => {
        if (res.status === 201) alert("Module created!");
        else alert("Failed to create module.");

        getModules();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      Home
      <div>
        <h2>Classes</h2>
        {classes.map((classFolder) => (
          <ClassFolder
            classFolder={classFolder}
            onSelect={setSelectedClass}
            key={classFolder.id}
          />
        ))}
      </div>
      <h2>Create a Class</h2>
      <form onSubmit={createClass}>
        <label htmlFor="className">Class name:</label>
        <br />
        <input
          type="text"
          id="className"
          name="className"
          required
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <h2>Modules</h2>
        {modules.map((module) => (
          <ModuleFolder
            module={module}
            onSelect={setSelectedModule}
            key={module.id}
          />
        ))}
      </div>
      <h2>Create a Module</h2>
      <form onSubmit={createModule}>
        <label htmlFor="moduleName">Module name:</label>
        <br />
        <input
          type="text"
          id="moduleName"
          name="moduleName"
          required
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />

        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />

        <label htmlFor="content">Content:</label>
        <br />

        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
      <div>
        <button type="button" onClick={() => navigate("/logout")}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
