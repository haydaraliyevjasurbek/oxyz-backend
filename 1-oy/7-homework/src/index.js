const express = require("express");
const seyRouter = require("./routes/sey.router");
const app = express();
const port = 3000;
const auth = require("./middlewares/auth");
// @middlewares
app.use(express.json());

// @routes
app.use("/api/v1", auth, seyRouter);

// @error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});
// @server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
