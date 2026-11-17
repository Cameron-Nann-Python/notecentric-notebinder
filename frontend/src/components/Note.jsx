import React from "react";
import { useState } from "react";
import "../styles/Note.css";

 function Note({ note, onDelete, onUpdate, onShare }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  // start editing, save note, cancel editing
  const startEditing = () => {
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
    setError(null);
    setIsEditing(true);
  };

  const saveNote = async (e) => {
    e.preventDefault(); // stop form's submission from refreshing the page
    setIsSaving(true);
    setError(null);
    try {
      await onUpdate(note.id, updatedTitle, updatedContent);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update note.");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="note-container">
      {isEditing && (
        <form onSubmit={saveNote}>
          <label htmlFor="note-title">Title:</label>
          <input
            type="text"
            id="note-title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <label htmlFor="note-content">Content:</label>
          <textarea
            id="note-content"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          {error && <p role="alert">{error}</p>}
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        </form>
      )}
      {!isEditing && (
        <div>
          <p className="note-title">{note.title}</p>
          <p className="note-content">{note.content}</p>
          <p className="note-date">Created on: {formattedDate}</p>

          <button className="share-button" onClick={() => onShare(note.id)}>
            {note.is_public ? "Unshare" : "Share"}
          </button>

          {onUpdate && (
            <button type="button" onClick={startEditing}>
              Edit
            </button>
          )}

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}


export default Note;
