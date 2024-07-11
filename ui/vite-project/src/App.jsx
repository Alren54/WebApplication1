// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Components/NAVbarr';
import SiteRoutes from './Components/SiteRotute';
import { getNotes } from './services/apiService';
import FooTeR from './Components/Footer';

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
      <br />
     <br />
     <br />
      <div >
        <SiteRoutes notes={notes} />
        
        {/* <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.description}</li>
          ))}
        </ul> */}
        <FooTeR/>
      </div>
    </>
  );
}

export default App;
