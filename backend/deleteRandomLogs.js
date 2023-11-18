const axios = require('axios');

async function deleteRandomLogs(n) {
  const serverUrl = 'http://localhost:3000/api'; // Replace with your server endpoint

  try {
    // Fetch n logs from the server (you might need to adjust the endpoint)
    const response = await axios.get(`${serverUrl}/firstNLogs/${n}`);
    console.log('response: ', response);
    const logsToDelete = response.data.logs;

    // Extract log IDs
    const logIdsToDelete = logsToDelete.map(log => log._id);

    // Use deleteLogs endpoint to delete logs by IDs
    const deleteResponse = await axios.delete(`${serverUrl}/deleteLogs`, { data: { logIds: logIdsToDelete } });

    console.log(`${n} logs deleted successfully. Server response:`, deleteResponse.data);
  } catch (error) {
    console.error('Error deleting logs:', error.message);
  }
}

const numberOfLogsToDelete = 2000;
deleteRandomLogs(numberOfLogsToDelete);
