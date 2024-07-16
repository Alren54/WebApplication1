class Logger {
  static log(message) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('tr-TR');
    const formattedTime = now.toLocaleTimeString('tr-TR', { hour12: false });
    const timestamp = now.getTime();
    const logMessage = `${formattedDate} - ${formattedTime} - ${message}`;
    console.log(logMessage);

    // Save logs to localStorage
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push({ message: logMessage, timestamp });
    localStorage.setItem('logs', JSON.stringify(logs));
  }

  static getLogs() {
    const now = new Date().getTime();
    const twoMinutesAgo = now - 2 * 60 * 1000; // 2 minutes in milliseconds
    
    /*
    5 minutes in milliseconds: 5 * 60 * 1000
    5 hours in milliseconds:  5 * 60 * 60 * 1000
    1 day (24 hours) in milliseconds: 24 * 60 * 60 * 1000
    1 week (7 days * 24 hours) in milliseconds: 7 * 24 * 60 * 60 * 1000
    1 month (30 days * 24 hours) in milliseconds: 30 * 24 * 60 * 60 * 1000
    */

    let logs = JSON.parse(localStorage.getItem('logs')) || [];

    // Filter logs from the last 2 minutes and delete older logs
    logs = logs.filter(log => log.timestamp >= twoMinutesAgo);
    localStorage.setItem('logs', JSON.stringify(logs));

    // Return only the log messages
    return logs.map(log => log.message);
  }
}

export default Logger;
