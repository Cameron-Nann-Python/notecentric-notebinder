import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Banner.css";
import "../styles/Forum.css";

function ForumModule() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { classId, moduleId } = useParams();

  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    api
      .get(`/api/public/modules/${moduleId}/notes/`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {getNotes();}, [])

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="banner" >
        <h1>NoteBinder</h1>
        <div className="header-actions">
          <span className="page-title">Notes</span>
          <button type="button" className="home-button" onClick={() => navigate("/")}>
              Home
          </button>
          <button type="button" className="forum-button" onClick={() => navigate(`/forum/class/${classId}/module/${moduleId}`)}>
              Modules
          </button>
          <button type="button" className="logout-button"onClick={() => navigate("/logout")}>
              Logout
          </button>
        </div>
      </header>

      <div className="forum">
        <aside className="forum-left-panel">
          <h3>Notes</h3>
          <input
            type="text"
            placeholder="Search for notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="class-search-list">
            {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="class-search-item"
            >
              <h3>{note.title}</h3>
            </div>
            ))}
          </div>
        </aside>

        <main className="forum-content">
          <div className="public-class-grid">
            {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="class-card"
            >
              <h3>{note.title}</h3>
              <p>Author: {note.author}</p>
              <p>Created: {new Date(note.created_at).toLocaleDateString()}</p>
              <p>{note.content}</p>
            </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ForumModule;