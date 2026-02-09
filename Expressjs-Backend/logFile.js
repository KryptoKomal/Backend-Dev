// Middleware 
const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8000;

// -------- LogFile Middleware 1 --------
app.use(async (req, res, next) => {
  const log = `LogFile1: ${req.method} ${req.url} - ${new Date().toISOString()}\n`;
  await fs.appendFile("log.txt", log);
  console.log("I am Middleware 1");
  next();
});

// -------- LogFile Middleware 2 --------
app.use(async (req, res, next) => {
  const log = `LogFile2: ${req.method} ${req.url} - ${new Date().toISOString()}\n`;
  await fs.appendFile("log.txt", log);
  console.log("I am Middleware 2");
  next();
});

// -------- File Functions --------
const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

// -------- Route --------
app.get("/students", async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});

// -------- Server Start  --------
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});
