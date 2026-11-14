
import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ClassFolder from "../components/ClassFolder";
import ModuleFolder from "../components/ModuleFolder";
import Note from "../components/Note";

import "../styles/Home.css";
import "../styles/Banner.css";
import "../styles/Admin.css";

function Admin() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [classes, setClasses] = useState([]);
    const [modules, setModules] = useState([]);
    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(false);

    // Retrieve all users when page loads
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        api.get("/api/admin/users/")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Unable to retrieve users.");
            });
    };

    // Retrieve selected user's information
    const selectUser = async (user) => {
        setSelectedUser(user);
        setLoading(true);

        setClasses([]);
        setModules([]);
        setNotes([]);

        try {
            const [classRes, moduleRes, noteRes] =
            // Promise.all() collects information simultaneously
                await Promise.all([
                    api.get(`/api/admin/users/${user.id}/classes/`),
                    api.get(`/api/admin/users/${user.id}/modules/`),
                    api.get(`/api/admin/users/${user.id}/notes/`)
                ]);

            setClasses(classRes.data);
            setModules(moduleRes.data);
            setNotes(noteRes.data);

        } catch (err) {
            console.log(err);
            alert("Unable to retrieve user's notes.");
        } finally {
            setLoading(false);
        }
    };

    // Delete a selected user's note
    const deleteNote = async (id) => {
        // confirm deletion with admin
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            await api.delete(`/api/admin/notes/delete/${id}/`);
            // instead of retreiving notes again, just filter out deleted note
            setNotes(prevNotes =>
                prevNotes.filter(note => note.id !== id)
            );

            alert("Note deleted!");

        } catch (err) {
            console.log(err);
            alert("Unable to delete note.");
        }
    };

    return (
        <div>
            <header className="banner">
                <h1>NoteBinder</h1>
                <div className="header-actions">
                    <span className="page-title">Home</span>
                    <button type="button" className="logout-button" onClick={() => navigate("/logout")}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="admin-layout">
                <aside className="user-sidebar">
                    <h2>Users</h2>
                    {users.map(user => (
                        <button key={user.id} type="button"
                            className={`user-button ${
                                selectedUser?.id === user.id
                                    ? "selected-user"
                                    : ""
                            }`}
                            onClick={() => selectUser(user)}
                        >
                            {user.username}
                        </button>
                    ))}
                </aside>

                <main className="admin-content">

                    {selectedUser ? (
                        <>
                            <h2>
                                {selectedUser.username}'s Notes
                            </h2>

                            {loading ? (
                                <p>Loading notes...</p>
                            ) : classes.length === 0 ? (
                                <p>This user has no classes.</p>
                            ) : (
                                classes.map(classFolder => (
                                    <ClassFolder
                                        key={classFolder.id}
                                        classFolder={classFolder}
                                    >
                                        {modules
                                            .filter(module =>
                                                module.class_folder === classFolder.id
                                            )
                                            .map(module => (
                                                <ModuleFolder
                                                    key={module.id}
                                                    module={module}
                                                >
                                                    {notes
                                                        .filter(note =>
                                                            note.module === module.id
                                                        )
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
                            )}
                        </>
                    ) : (
                        <h2>Select a user to view their notes</h2>
                    )}

                </main>
            </div>
        </div>
    );
}

export default Admin;