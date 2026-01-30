const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const filePath = process.argv[3];
const data = process.argv[4];

// READ FILE
if (command === "read") {
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      console.log("Error reading file");
    } else {
      console.log("File Content:\n", content);
    }
  });
}

// WRITE FILE
else if (command === "write") {
  fs.writeFile(filePath, data || "", (err) => {
    if (err) {
      console.log("Error writing file");
    } else {
      console.log("File written successfully");
    }
  });
}
// COPY FILE
else if (command === "copy") {
  const destPath = process.argv[4];

  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      console.log("Error copying file");
    } else {
      console.log("File copied successfully");
    }
  });
}
// DELETE FILE
else if (command === "delete") {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file");
    } else {
      console.log("File deleted successfully");
    }
  });
}
// LIST DIRECTORY
else if (command === "list") {
  fs.readdir(filePath || ".", (err, files) => {
    if (err) {
      console.log("Error reading directory");
    } else {
      console.log("Directory Contents:");
      files.forEach(file => console.log(file));
    }
  });
}