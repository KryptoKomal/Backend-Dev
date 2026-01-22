// Exercise 3: System Information Logger
// Create an application that logs system information (CPU, memory, platform) to a file every 5
// seconds using the os and fs modules.

const os = require("os");
const fs = require("fs");

function logSystemInfo() {
  const info = `
Time: ${new Date().toISOString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB
`;

  fs.appendFile("system_log.txt", info, () => {});
}

setInterval(logSystemInfo, 5000);