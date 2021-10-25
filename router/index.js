const FastSpeedtest = require("fast-speedtest-api");
const express = require("express");
const router = express.Router();
const os = require("os");
const myPromise = fastnetApi();
myPromise.then((res) => {
  console.log("it returned:", res);
  return res;
});

function fastnetApi() {
  let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", //**** required
    verbose: false, // default: false
    timeout: 5000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  });

  return speedtest
    .getSpeed()
    .then((s) => {
      console.log(`Speed: ${s} Mbps`);
      console.log(typeof s);
      return s;
    })
    .catch((e) => {
      console.error(e.message);
    });
}
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
  details.speed = fastnetApi();
  console.log(details);
  const jsonData = JSON.stringify(details);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(jsonData);
});

module.exports = router;
