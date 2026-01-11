const express = require("express");
const router = express.Router();
const {
  SeyGET,
  SeyGETMessage,
  SeyPOSTMessage,
} = require("../controllers/sey.controller");
// Define your routes here
router.get("/", SeyGET);
// Add message route
router.get("/message", SeyGETMessage);
// POST route for message
router.post("/message", SeyPOSTMessage);
module.exports = router;
