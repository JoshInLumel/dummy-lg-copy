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

    //finding the documents in the "logs" collection based on the filter
    const logs = await Log.find(filter);

    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

//starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
