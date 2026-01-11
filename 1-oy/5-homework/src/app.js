const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

// Global middleware
app.use(express.json());

// Routes
app.use("/", userRoutes);

module.exports = app;