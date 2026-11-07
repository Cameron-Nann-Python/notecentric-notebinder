import React from "react";
import { useState } from "react";

function ModuleFolder({ module, children }) {
  // Make folder collapsible
  const [open, setOpen] = useState(false);

  return (
    <div className="module-container">
      <p className="module-name">{module.name}</p>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? "▼": "▶"}
      </button>
      {
        open && (
          <div style={{ marginLeft: "20px "}}>
            {children}
          </div>
        )
      }
    </div>
  );
}

export default ModuleFolder;
