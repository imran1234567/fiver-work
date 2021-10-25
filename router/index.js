const NetworkSpeed = require("network-speed"); // ES5
const express = require("express");
const router = express.Router();
const os = require("os");
const testNetworkSpeed = new NetworkSpeed();

router.get("/", (req, res) => {
  let details = {};
  var totalMemory = os.totalmem();
  var freeMemory = os.freemem();
  var memory = Math.round((freeMemory * 100) / totalMemory) + "%";
  const usage = process.cpuUsage();
  const cpus = os.cpus();
  const cpu = cpus[0];
  const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
  const currentCPUUsage = (usage.user + usage.system) * 1000;
  details.memory = memory;
  const perc = (currentCPUUsage / total) * 100;
  details.cpu = `${perc}%`;
  const options = {
    hostname: "www.google.com",
    port: 80,
    path: "/catchers/544b09b4599c1d0200000289",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fileSizeInBytes = 2000000;
  let speed = testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
  details.speed = speed;
  const jsonData = JSON.stringify(details);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(jsonData);
});

module.exports = router;
