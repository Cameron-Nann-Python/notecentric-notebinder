import React from "react";
import { useState } from "react";

function ClassFolder({ classFolder, children }) {
  // Make folder collapsible
  const [open, setOpen] = useState(false);

  return (
    <div className="class-container">
      <p className="class-name">{classFolder.name}</p>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? "▼": "▶"}
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
