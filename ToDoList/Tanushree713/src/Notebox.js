
// NoteBox.js
import React from "react";

const NoteBox = ({ title, paragraph, onDelete }) => {
  return (
    <div className="note-box">
      <h3>{title}</h3>
      <p>{paragraph}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default NoteBox;
