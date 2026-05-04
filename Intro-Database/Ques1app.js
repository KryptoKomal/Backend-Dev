const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Ques1StudentModel");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// 1. Add new student
app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

// 2. View all students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// 3. Find student by email
app.get("/students/:email", async (req, res) => {
    const student = await Student.findOne({ email: req.params.email });
    res.send(student);
});

// 4. Update student GPA
app.put("/students/:email", async (req, res) => {
    const student = await Student.findOneAndUpdate(
        { email: req.params.email },
        { gpa: req.body.gpa },
        { new: true }
    );
    res.send(student);
});

// 5. Delete student
app.delete("/students/:email", async (req, res) => {
    await Student.findOneAndDelete({ email: req.params.email });
    res.send("Student deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});