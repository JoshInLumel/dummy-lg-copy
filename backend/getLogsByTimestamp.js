const axios = require("axios");

async function getLogsByTimestamp(timestamps) {
  const serverUrl = "http://localhost:3000/api/getLogsByTimestamp"; // Replace with your server endpoint

  try {
    // Send a GET request to the server with the timestamps
    const response = await axios.get(serverUrl, {
      params: {
        startTimestamp: timestamps[0], // Replace with your start timestamp
        endTimestamp: timestamps[1],   // Replace with your end timestamp
      },
    });

    const { status, logs } = response.data;

    if (status === "success") {
      console.log(`${logs.length} logs retrieved successfully.`);
      // console.log(logs);
    } else {
      console.error("Error retrieving logs:", response.data.error);
    }
  } catch (error) {
    console.error("Error retrieving logs:", error.message);
  }
}

// 8Nov23 to 16Nov23
// 2023-11-07T18:30:00.000Z 2023-11-15T18:30:00.000Z

// Example: Retrieve logs within a timestamp range
const timestamps = ["2023-11-07T18:30:00.000Z", "2023-11-15T18:30:00.000Z"];
getLogsByTimestamp(timestamps);
