const fs = require("fs");
const readline = require("readline");

let errorCount = 0;
let warnCount = 0;
let infoCount = 0;
let totalLines = 0;

const fileStream = fs.createReadStream("sample.log");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});
rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARN")) warnCount++;
  else if (line.includes("INFO")) infoCount++;
});
rl.on("close", () => {
  const report = `
LOG FILE ANALYSIS REPORT
Total Entries : ${totalLines}
ERROR Count   : ${errorCount}
WARN Count    : ${warnCount}
INFO Count    : ${infoCount}
`;
  fs.writeFile("report.txt", report, (err) => {
    if (err) {
      console.log("Error writing report");
    } else {
      console.log("Log analysis completed");
      console.log(report);
    }
  });
});