import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Banner.css";
import "../styles/Forum.css";
import ModuleFolder from "../components/ModuleFolder";

function ForumClass() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { classId, moduleId } = useParams();
  const [modules, setModules] = useState([]);

    // Get modules pertaining to a selected class
  const getModules = () => {
    api
      .get(`/api/public/classes/${classId}/modules/`)
      .then((res) => setModules(res.data))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getModules();
  }, [])

  const filteredModules = modules.filter((ModuleFolder) =>
    ModuleFolder.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="banner" >
        <h1>NoteBinder</h1>
        <div className="header-actions">
          <span className="page-title">Modules</span>
          <button type="button" className="home-button" onClick={() => navigate("/")}>
              Home
          </button>
          <button type="button" className="forum-button" onClick={() => navigate("/forum")}>
              Forum
          </button>
          <button type="button" className="logout-button"onClick={() => navigate("/logout")}>
          Logout
          </button>
        </div>
      </header>

      <div className="forum">
        <aside className="forum-left-panel">
          <h3>Modules</h3>
          <input
            type="text"
            placeholder="Search for module"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="class-search-list">
            {filteredModules.map((ModuleFolder) => (
            <div
              key={ModuleFolder.id}
              className="class-search-item"
              onClick={() => navigate(`/forum/class/${classId}/module/${ModuleFolder.id}`)}
            >
              <h3>{ModuleFolder.name}</h3>
            </div>
            ))}
          </div>
        </aside>

        <main className="forum-content">
          <div className="public-class-grid">
            {modules.map((module) => (
              <div
                key={module.id}
                className="class-card"
                onClick={() => navigate(`/forum/class/${classId}/module/${module.id}`)}
              >
                <h3>{module.name}</h3>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}

export default ForumClass;