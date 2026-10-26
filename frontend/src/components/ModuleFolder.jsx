import React from "react";

function ModuleFolder({ module }) {
  return (
    <div className="module-container">
      <p className="module-name">{module.name}</p>
    </div>
  );
}

export default ModuleFolder;
