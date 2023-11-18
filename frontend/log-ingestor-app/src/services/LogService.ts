import axios from "axios";
import { EnvironmentVariables } from "../EnvironmentVariables";

/**
 * @Note
 * to create a sample data i.e to send a sample log over port 3000:
 * run this command in terminal:
 * curl -X POST -H "Content-Type: application/json" -d '{
  "level": "info",
  "message": "Log message example",
  "resourceId": "123",
  "timestamp": "2023-11-17T12:00:00Z",
  "traceId": "456",
  "spanId": "789",
  "commit": "abcdef123456",
  "metadata": {
    "parentResourceId": "xyz"
  }
}' http://localhost:3000/api/log
 */

export class LogService {
  static getAllLogs = async () => {
    try {
      const response = await axios.get(
        `${EnvironmentVariables.BACKEND_URL}/getLogs`
      );
      return response.data.logs;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}
