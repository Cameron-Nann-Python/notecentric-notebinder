import api from "../api"
import {useState, useEffect} from "react";
import Note from "../components/Note"
import { useNavigate } from "react-router-dom"
import "../styles/Home.css"
import "../styles/Banner.css"

function Home() {
    const navigate = useNavigate()

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState();
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status == 204) alert("Note deleted!")
                else alert("Failed to delete note.")

                // Update notes after note deletion
                getNotes()
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) => {
        e.preventDefault()
        api
            .post("/api/notes/", {content, title})
            .then((res) => {
                if (res.status === 201) alert("Note created!")
                else alert("Failed to create note.")

                // Update notes after note deletion
                getNotes();
            })
            .catch((err) => alert(err))
    }

    return <div>
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
            <h2>Notes</h2>
            <div className="notes-grid">
            {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
            </div>
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>

            <input type="text" id="title" name="title" 
            required onChange={(e) => setTitle(e.target.value)}
            value={title}/>
            <br/>

            <label htmlFor="content">Content:</label>
            <br/>

            <textarea id="content" name="content" 
            required value={content} onChange={(e) => setContent(e.target.value)}/>
            <br/>

            <input className="submit-button" type="submit" value="Submit"/>
        </form>
    </div>
}

export default Home
