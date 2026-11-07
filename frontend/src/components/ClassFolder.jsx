import React from "react";
import { useState } from "react";

function ClassFolder({ classFolder, onSelect, children }) {
  // Make folder collapsible
  const [open, setOpen] = useState(false);

  return (
    <div className="class-container">
      <p className="class-name">{classFolder.name}</p>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? "▼": "▶"}
      </button>
      <button type="button" onClick={() => onSelect(classFolder.id)}>
        Select
      </button>
      {
        open && (
          <div style={{ marginLeft:"20px" }}>
            {children}
          </div>
        )
      }
    </div>
  );
}

export default ClassFolder;
