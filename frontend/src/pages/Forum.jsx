import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Banner.css";
import "../styles/Forum.css";


function Forum() {
  const navigate = useNavigate();
  // Search for specific classes, modules, or notes
  const [searchTerm, setSearchTerm] = useState("");

  // Populate Forum main page with available classes
  const [classes, setClasses] = useState([]);
  const getClasses = () => {
    api.get("/api/public/classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getClasses();
  }, []);

  // When using the search bar, only show filtered classes, modules, or notes
  const filteredClasses = classes.filter((classFolder) =>
    classFolder.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="banner" >
          <h1>NoteBinder</h1>
          <div className="header-actions">
            <span className="page-title">Forum</span>
            <button type="button" className="home-button" onClick={() => navigate("/")}>
              Home
            </button>
            <button type="button" className="logout-button"onClick={() => navigate("/logout")}>
              Logout
            </button>
          </div>
      </header>

      <div className="forum">
        <aside className="forum-left-panel">
          <h3>Classes</h3>
          <input
            type="text"
            placeholder="Search for class"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="class-search-list">
            {filteredClasses.map((classFolder) => (
              <div
                key={classFolder.id}
                className="class-search-item"
                onClick={() => navigate(`/forum/class/${classFolder.id}`)}
              >
                <h3>{classFolder.name}</h3>
              </div>
            ))}
          </div>
        </aside>

        <main className="forum-content">
          <div className="public-class-grid">
            {classes.map((classFolder) => (
              <div
                key={classFolder.id}
                className="class-card"
                onClick={() => navigate(`/forum/class/${classFolder.id}`)}
              >
                <h3>{classFolder.name}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  )
}

export default Forum;
