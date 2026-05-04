const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Ques2StudentModel");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// 1. GPA between 3.0 and 3.5
app.get("/students/gpa-range", async (req, res) => {
    const students = await Student.find({
        gpa: { $gte: 3.0, $lte: 3.5 }
    });
    res.send(students);
});

// 2. More than 5 courses
app.get("/students/more-courses", async (req, res) => {
    const students = await Student.find({
        $expr: { $gt: [{ $size: "$courses" }, 5] }
    });
    res.send(students);
});

// 3. Top 10 students
app.get("/students/top", async (req, res) => {
    const students = await Student.find()
        .sort({ gpa: -1 })
        .limit(10);
    res.send(students);
});

// 4. Count by city
app.get("/students/count-by-city", async (req, res) => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: "$city",
                totalStudents: { $sum: 1 }
            }
        }
    ]);
    res.send(result);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});