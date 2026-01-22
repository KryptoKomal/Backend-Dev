// Exercise 1: File Operations
// Create a Node.js program that reads a text file, counts the number of words, and writes the
// count to a new file.

const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }

  const words = data.trim().split(/\s+/).length;
  const result = `Word Count: ${words}`;

  fs.writeFile("output.txt", result, (err) => {
    if (err) {
      console.log("Error writing file");
      return;
    }
    console.log("Word count written to output.txt");
  });
});