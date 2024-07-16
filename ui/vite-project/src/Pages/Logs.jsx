import React, { useEffect, useState } from 'react';
import Logger from '../Utils/Logger';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(Logger.getLogs());
    }, 5000); // Update logs every 5 seconds

    // Initial fetch of logs
    setLogs(Logger.getLogs());

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
