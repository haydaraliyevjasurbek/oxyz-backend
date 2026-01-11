const path = require("path");
const fs = require("fs");
const os = require("os");

const loc = path.resolve();
const locDB = path.join(loc, "db");
const locDBFile = path.join(locDB, "osData.json");

function dbCreator() {
  if (!fs.existsSync(locDB) || !fs.existsSync(locDBFile)) {
    fs.mkdirSync(locDB, { recursive: false });
    const data = JSON.stringify([], null, 2);
    fs.writeFileSync(locDBFile, data, "utf-8");
    console.log("DB yoki osData.json yoq ekan. Yaratildi!");
  }
}
// dbCreator();

function getOSInfo() {
  return {
    username: os.userInfo().username,
    homedir: os.homedir(),
    platforma: os.platform(),
    OSName: os.type(),
    cpu: os.cpus()[0].model,
    ram: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
    time: new Date().toISOString(),
  };

}
// console.log(getOSInfo());

function saveData() {
  if (!fs.existsSync(locDBFile)) {
    dbCreator();
  } else {
    console.log("DB yoki osData.json bor ekan!");
  }

  const data = getOSInfo()
  fs.writeFileSync(locDBFile, JSON.stringify(data, null, 2), "utf-8");
  console.log("Ma'lumotlar saqlandi!");
}
saveData();