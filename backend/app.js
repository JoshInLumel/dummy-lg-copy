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
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
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



// Endpoint to delete a log by ID
// app.delete('/api/deleteLogs/:logId', async (req, res) => {
//   const logId = req.params.logId;

//   try {
//     // Assuming Log is your Mongoose model
//     const deletedLog = await Log.findByIdAndDelete(logId);

//     if (deletedLog) {
//       console.log(`Log deleted: ${logId}`);
//       res.json({ status: 'success', message: 'Log deleted successfully' });
//     } else {
//       res.status(404).json({ status: 'error', error: 'Log not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting log:', error);
//     res.status(500).json({ status: 'error', error: 'Internal Server Error' });
//   }
// });

// Endpoint to delete logs by IDs
app.delete('/api/deleteLogs', async (req, res) => {
  const logIds = req.body.logIds;

  if (!logIds || !Array.isArray(logIds)) {
    return res.status(400).json({ status: 'error', error: 'Invalid logIds provided' });
  }

  try {
    // Assuming Log is your Mongoose model
    const deletedLogs = await Log.deleteMany({ _id: { $in: logIds } });

    if (deletedLogs.deletedCount > 0) {
      console.log(`${deletedLogs.deletedCount} logs deleted successfully.`);
      res.json({ status: 'success', message: 'Logs deleted successfully' });
    } else {
      res.status(404).json({ status: 'error', error: 'Logs not found' });
    }
  } catch (error) {
    console.error('Error deleting logs:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});


//starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
