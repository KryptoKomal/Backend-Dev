
const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8000;

app.use(express.json());
const students = [
  { id: 1, name: "raj", branch: "CSE" },
  { id: 2, name: "Ajay", branch: "ECE" },
  { id: 3, name: "Yash", branch: "IT" },
];

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});


app.get("/students", (req, res) => {
  fs.readFile("./students.json", (err, data) => {
    if (err) {
      return res.status(500).send("Error occured");
    }
    return res.status(200).send(JSON.parse(data));
  });
});

app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.status(400).send("please provide query parameter");
  }
  const foundStudents = students.filter((s) => s.branch == branch);
  return res.json(foundStudents);
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const arrayIndex = students.findIndex((s) => s.id == id);
  if (arrayIndex == -1) {
    return res.status(404).send("Student not found");
  }

  const foundStudent = students[arrayIndex];
  res.json(foundStudent);
});

app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) return res.status(400).send("Details missing");

  //  Read the file first
  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Could not read file");

    // . Parse existing data or start with empty array
    const students = JSON.parse(data || "[]");

    //  Create and push new student
    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };
    students.push(newStudent);

    //  Write the WHOLE array back to the file (Overwriting)
    fs.writeFile(
      "./students.json",
      JSON.stringify(students, null, 2),
      (err) => {
        if (err) return res.status(500).send("Error writing to file");

        //  ONLY send response inside the success callback
        return res
          .status(201)
          .json({ message: "Registered!", student: newStudent });
      },
    );
  });
});

app.put("/students/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const foundIndex = students.findIndex((s) => s.id === userId);

  if (foundIndex == -1) {
    return res.status(404).send("Student  not found");
  }

  students[foundIndex] = { ...students[foundIndex], ...req.body };

  const result = { message: "updated sucessfully", students: students };
  return res.status(200).json(result);
});


app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const foundIndex = students.findIndex((s) => s.id == id);
  if (foundIndex == -1) {
    return res.status(400).send("Student not found");
  }
  students.splice(foundIndex, 1);

  return res.status(200).json({
    message: "Student deleted sucessfully",
    updatedStudents: students,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});