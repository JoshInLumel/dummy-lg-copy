import axios from "axios";
import { EnvironmentVariables } from "../EnvironmentVariables";
import { IBackendFilterQuery } from "../types/Filter.types";

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

const axiosInstance = axios.create({
  baseURL: `${EnvironmentVariables.BACKEND_URL}`,
});

export class LogService {
  static getFilteredLogs = async (filterQuery: IBackendFilterQuery) => {
    try {
      const response = await axiosInstance.get("/getFilteredLogs", {
        params: filterQuery,
      });

      const data = response.data;

      if (data.status === "success") {
        return data.logs;
      } else {
        console.error("Error fetching filtered logs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching filtered logs:", error);
    }
  };

  static getAllLogs = async () => {
    try {
      const response = await axiosInstance.get("/getLogs");
      return response.data.logs;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}
