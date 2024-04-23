const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/main", function (req, res) {
  res.sendFile(path.join(__dirname, "../pages", "map_main.html"));
});

router.get("/is", function (req, res) {
  res.sendFile(path.join(__dirname, "../pages", "map_is.html"));
});

module.exports = router;