const axios = require('axios');

async function deleteLogs(logIds) {
    const serverUrl = 'http://localhost:3000/api/deleteLogs'; // Replace with your server endpoint
  
    try {
      // Send a DELETE request to the server with an array of logIds
      await axios.delete(serverUrl, { data: { logIds } });
  
      console.log(`${logIds.length} logs deleted successfully.`);
    } catch (error) {
      console.error('Error deleting logs:', error.message);
    }
  }
  
  // Example: Delete logs with multiple logIds
  const logIdsToDelete = ['logId1', 'logId2', 'logId3'];
  deleteLogs(logIdsToDelete);
  