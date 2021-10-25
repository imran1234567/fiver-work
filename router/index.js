const express = require("express");
const router = express.Router();
const os = require("os");

router.get("/", (req, res) => {
  let details = {};
  var totalMemory = os.totalmem();
  var freeMemory = os.freemem();
  var cpu = os.cpus();
  details.totalMemory = totalMemory;
  details.freeMemory = freeMemory;
  details.cpu = cpu;
  res.header("Access-Control-Allow-Origin", "*");
  res.send(details);
});

module.exports = router;
