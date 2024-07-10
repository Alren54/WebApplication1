// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Components/NAVbarr';
import SiteRoutes from './Components/SiteRotute';
import { getNotes } from './services/apiService';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <SiteRoutes />
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.description}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
