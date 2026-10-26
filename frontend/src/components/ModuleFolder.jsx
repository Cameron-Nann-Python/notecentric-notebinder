import React from "react";

function ModuleFolder({ module, onSelect }) {
  return (
    <div className="module-container">
      <p className="module-name">{module.name}</p>
      <button className="select-button" onClick={() => onSelect(module.id)}>
        Select
      </button>
    </div>
  );
}

export default ModuleFolder;
