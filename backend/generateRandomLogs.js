const axios = require("axios");

function getRandomDate(startDate, endDate) {
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();
  // Generate a random timestamp between start and end
  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  // Create a new Date object from the random timestamp
  const randomDate = new Date(randomTimestamp);
  return randomDate.toISOString();
}

const startDate = "2023-01-01T00:00:00.000Z"; // Replace with your desired start date
const endDate = "2023-12-31T23:59:59.999Z"; // Replace with your desired end date

// Function to generate a random log
function generateRandomLog(commitId) {
  const levels = ["error", "warning", "info"];
  const resources = ["server-1234", "server-5678", "server-9101"];

  const randomLog = {
    level: levels[Math.floor(Math.random() * levels.length)],
    message: `Log message ${Math.floor(Math.random() * 1000)}`,
    resourceId: resources[Math.floor(Math.random() * resources.length)],
    // timestamp: new Date().toISOString(),
    timestamp: getRandomDate(startDate, endDate),
    traceId: `trace-${Math.floor(Math.random() * 1000000)}`,
    spanId: `span-${Math.floor(Math.random() * 1000000)}`,
    commit: `commit-${commitId}`,
    metadata: {
      parentResourceId: `parent-${Math.floor(Math.random() * 1000000)}`,
    },
  };

  return randomLog;
}

// Function to send logs to the server
async function createRandomLogs(logCount) {
  const serverUrl = "http://localhost:3000/api/log";
  const commitId = Math.floor(Math.random() * 1000000);

  for (let i = 0; i < logCount; i++) {
    const log = generateRandomLog(commitId);

    try {
      await axios.post(serverUrl, log);
      console.log(`Log sent(${i + 1}): ${JSON.stringify(log)}`);
    } catch (error) {
      console.error(`Error sending log: ${JSON.stringify(log)}`);
      console.error(error.message);
    }
  }
}

// Specify the number of logs to generate and send
const numberOfLogs = 10;

// Send the logs
createRandomLogs(numberOfLogs);
