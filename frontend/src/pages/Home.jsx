import api from "../api";
import { useState, useEffect } from "react";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import ClassFolder from "../components/ClassFolder";
import ModuleFolder from "../components/ModuleFolder";
import "../styles/Home.css"
import "../styles/Banner.css"

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

  // Set visibiilty for creation forms for classes, modules and notes
  const [showClassForm, setShowClassForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);

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
      <header className="banner" >
        <h1>NoteBinder</h1>
        <div className="header-actions">
          <span className="page-title">Home</span>
          <button type="button" className="logout-button"onClick={() => navigate("/logout")}>
            Logout
          </button>
        </div>
      </header>

      <div>
        <h2>Classes</h2>
        <button type="button" onClick={() => setShowClassForm(true)}>
          + Create a Class
        </button>
        {
          showClassForm && (
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
              <input className="submit-button" type="submit" value="Submit" />
              <input className="cancel-button" type="button" onClick={() => {setShowClassForm(false); setClassName("");}} value="Cancel"/>
            </form>
          )
        }
        {
          classes
            .map(classFolder => (
              <ClassFolder
                classFolder={classFolder}
                onSelect={setSelectedClass}
                key={classFolder.id}
              >
              <div>
                <button type="button" onClick={() => {setSelectedClass(classFolder); setShowModuleForm(true);}}>
                  + Create a Module
                </button>
              </div>
              {
                showModuleForm && (
                  <form onSubmit={createModule}>
                    <p>Class: {classes.find(c => c.id === selectedClass)?.name || "None"}</p>
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
                    <input className="submit-button" type="submit" value="Submit" />
                    <input className="cancel-button" type="button" onClick={() => {setShowModuleForm(false); setModuleName("");}} value="Cancel"/>
                  </form>
                )
              }
              {
                modules
                  .filter(module => module.class_folder === classFolder.id)
                  .map(module => (
                    <ModuleFolder
                      module={module}
                      onSelect={setSelectedModule}
                      key={module.id}
                    >
                    <div>
                      <button type="button" onClick={() => {setSelectedModule(module); setShowNoteForm(true);}}>
                        + Create a Note
                      </button>
                    </div>
                    {
                      showNoteForm && (
                        <form onSubmit={createNote}>
                          <p><b>Module: {modules.find(m => m.id === selectedModule)?.name || "None"}</b></p>
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
                          <input className="submit-button" type="submit" value="Submit"/>
                          <input className="cancel-button" type="button" onClick={() => {setShowNoteForm(false); setModuleName("");}} value="Cancel"/>
                        </form>
                      )
                    }
                    {
                      notes
                        .filter(note => note.module === module.id)
                        .map(note => (
                          <Note
                            key={note.id}
                            note={note}
                            onDelete={deleteNote}
                          />
                        ))
                    }
                    </ModuleFolder>
                  ))
              }
              </ClassFolder>
          ))
        }
      </div>
    </div>
  )
}

export default Home;
