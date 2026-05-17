const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/training", require("./routes/trainingRoutes"));
app.use("/api/training-sets", require("./routes/trainingSetRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/assign", require("./routes/assignRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
// Start server (ALWAYS LAST)
app.listen(5000, () => console.log("Server running"));