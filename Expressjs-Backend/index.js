const express = require('express');
const app = express();

const PORT = 8000;

app.use(express.json());


const students = [
  { id: 1, name: "Anushka", branch: "CS" },
  { id: 2, name: "Komal", branch: "ECE" },
  { id: 3, name: "teesha", branch: "IT" }
];

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

// ✅ Get all students OR filter by branch
app.get("/students", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.json(students); // 
  }

  const foundStudents = students.filter(
    (s) => s.branch === branch
  );

  res.json(foundStudents);
});

// ✅ Get student by ID
app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const foundStudent = students.find(
    (s) => s.id == id
  );

  if (!foundStudent) {
    return res.status(404).send("Student not found");
  }

  res.json(foundStudent);
});


app.post("/students/register", (req, res) => {
  const data = req.body;

  if (!data || !data.name || !data.branch) {
    return res.status(400).send("Please provide student details");
  }

  students.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});


app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});