import React from "react";

function ClassFolder({ classFolder, onSelect }) {
  return (
    <div className="class-container">
      <p className="class-name">{classFolder.name}</p>
      <button type="button" onClick={() => onSelect(classFolder.id)}>
        Select
      </button>
    </div>
  );
}

export default ClassFolder;
