import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5221/api/WebApplication1/GetNotes')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div>
        {data.length > 0 ? (
          data.map(note => (
            <div key={note.Id} className="card my-3">
              <div className="card-body">
                <p className="card-text"><b>{note.Description}</b></p>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}
