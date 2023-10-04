// App.js
import React, { useState } from "react";
import NoteBox from "./Notebox";
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleAddNote = () => {
    if (title.trim() !== "" && paragraph.trim() !== "") {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        paragraph: paragraph.trim(),
      };
      setNotes([...notes, newNote]);
      setTitle("");
      setParagraph("");
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      
      <main>
        <div className="note-inputs">
          <input
            type="text"
            value={title}
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={paragraph}
            placeholder="Enter paragraph..."
            onChange={(e) => setParagraph(e.target.value)}
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
        <div className="note-boxes">
          {notes.map((note) => (
            <NoteBox
              key={note.id}
              title={note.title}
              paragraph={note.paragraph}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </main>
     
    </div>
  );
};

export default App;
