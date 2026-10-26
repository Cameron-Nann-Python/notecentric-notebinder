import React from "react";

function ClassFolder({ classFolder }) {
  return (
    <div className="class-container">
      <p className="class-name">{classFolder.name}</p>
    </div>
  );
}

export default ClassFolder;
