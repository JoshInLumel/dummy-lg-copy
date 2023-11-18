const axios = require('axios');

// Function to generate a random log
function generateRandomLog() {
  const levels = ['error', 'warning', 'info'];
  const resources = ['server-1234', 'server-5678', 'server-9101'];
  
  const randomLog = {
    level: levels[Math.floor(Math.random() * levels.length)],
    message: `Log message ${Math.floor(Math.random() * 1000)}`,
    resourceId: resources[Math.floor(Math.random() * resources.length)],
    timestamp: new Date().toISOString(),
    traceId: `trace-${Math.floor(Math.random() * 1000000)}`,
    spanId: `span-${Math.floor(Math.random() * 1000000)}`,
    commit: `commit-${Math.floor(Math.random() * 1000000)}`,
    metadata: {
      parentResourceId: `parent-${Math.floor(Math.random() * 1000000)}`
    }
  };

  return randomLog;
}

// Function to send logs to the server
async function createRandomLogs(logCount) {
  const serverUrl = 'http://localhost:3000/api/log';

  for (let i = 0; i < logCount; i++) {
    const log = generateRandomLog();

    try {
      await axios.post(serverUrl, log);
      console.log(`Log sent(${i+1}): ${JSON.stringify(log)}`);
    } catch (error) {
      console.error(`Error sending log: ${JSON.stringify(log)}`);
      console.error(error.message);
    }
  }
}

// Specify the number of logs to generate and send
const numberOfLogs = 100;

// Send the logs
createRandomLogs(numberOfLogs);
