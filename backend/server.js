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
app.use("/api/performance", require("./routes/performanceRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
// Start server (ALWAYS LAST)
const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=>{
    console.log('Server running on port ${PORT}')
});