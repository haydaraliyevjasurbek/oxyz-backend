const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API ga xush kelibsiz!");
});

// Global xatoliklarni ushlovchi
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Serverda xatolik yuz berdi",
  });
});

module.exports = app;
