const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    gpa: Number,
    city: String,
    courses: [String]
});

module.exports = mongoose.model("Student", studentSchema);