const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { LOG_KEYS } = require("./constants/LogConstants");

const app = express();
const port = 3000;

//connecting to the mongo databsase
mongoose.connect("mongodb://localhost:27017/logs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//creating a schema for the logs
const logSchema = new mongoose.Schema({
  level: { type: String, index: true },
  message: { type: String, index: true },
  resourceId: { type: String, index: true },
  timestamp: { type: Date, index: true },
  traceId: { type: String, index: true },
  spanId: { type: String, index: true },
  commit: { type: String, index: true },
  metadata: {
    parentResourceId: { type: String, index: true },
  },
});

//creating a log model
const Log = mongoose.model("Log", logSchema);

app.use(cors());
app.use(bodyParser.json());

//endpoint - to receive the logs
app.post("/api/log", (req, res) => {
  const logData = req.body;

  const log = new Log(logData);

  // Save the log to the database
  log
    .save()
    .then(() => {
      res.json({ status: "success" });
    })
    .catch((error) => {
      console.error("Error saving log:", error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

//endpoint - to retrieve all the logs
app.get("/api/getLogs", async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

//endpoint to get the filtered logs
app.get("/api/getFilteredLogs", async (req, res) => {
  try {
    const query = req.query;

    //constructing the filter object based on the query parameters
    const filter = {};
    //processing the dropdowns filter query
    LOG_KEYS.forEach((key) => {
      const value = query?.[key];
      if (value) {
        switch (key) {
          case "parentResourceId":
            filter["metadata.parentResourceId"] = value;
            break;
          default:
            filter[key] = value;
            break;
        }
      }
    });

    //processing the date-range filter query
    if (query?.["dateData"]) {
      const { startTime, endTime } = query["dateData"];

      const formattedStartTime = new Date(startTime);
      const formattedEndTime = new Date(endTime);

      if (!isNaN(formattedStartTime) && !isNaN(formattedEndTime)) {
        filter["timestamp"] = {
          $gte: formattedStartTime,
          $lte: formattedEndTime,
        };
      }
    }

    //finding the documents in the "logs" collection based on the filter
    const logs = await Log.find(filter);

    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// Endpoint to get the first N logs
app.get("/api/firstNLogs/:limit", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const logs = await Log.find({}).limit(limit);

    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// Endpoint to delete logs by IDs
app.delete("/api/deleteLogs", async (req, res) => {
  const logIds = req.body.logIds;

  if (!logIds || !Array.isArray(logIds)) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid logIds provided" });
  }

  try {
    // Assuming Log is your Mongoose model
    const deletedLogs = await Log.deleteMany({ _id: { $in: logIds } });

    if (deletedLogs.deletedCount > 0) {
      console.log(`${deletedLogs.deletedCount} logs deleted successfully.`);
      res.json({ status: "success", message: "Logs deleted successfully" });
    } else {
      res.status(404).json({ status: "error", error: "Logs not found" });
    }
  } catch (error) {
    console.error("Error deleting logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// Endpoint to retrieve logs within a timestamp range
app.get("/api/getLogsByTimestamp", async (req, res) => {
  try {
    const { startTimestamp, endTimestamp } = req.query;
    console.log("startTimestamp, endTimestamp: ", startTimestamp, endTimestamp);

    // Convert ISO string timestamps to Date objects
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    // Build the filter object based on the timestamp range
    const filter = {
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    // Find documents in the "logs" collection based on the timestamp range
    const logs = await Log.find(filter);
    console.log("logs: ", logs);

    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
