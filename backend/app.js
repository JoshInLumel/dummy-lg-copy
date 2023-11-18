const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require("path");

const app = express();
const port = 3000;

//connecting to the mongo databsase
mongoose.connect("mongodb://localhost:27017/logs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

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

// //endpoint - to serve the React app
// app.use(
//   express.static(path.join(__dirname, "../frontend/log-ingestor-app/build"))
// );

// // Handle React app index path
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../frontend/log-ingestor-app/build", "index.html")
//   );
// });

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

// Endpoint to get filtered logs
app.get("/api/getFilteredLogs", async (req, res) => {
  try {
    const query = req.query; // Get query parameters from the request

    // Build the filter object based on the query parameters
    const filter = {};
    if (query.level) filter.level = query.level;
    if (query.resourceId) filter.resourceId = query.resourceId;
    // ... (add other filters based on your requirements)

    // Find documents in the "logs" collection based on the filter
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
