const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
    name: String,
    email: String,
    departments: [String],
    experience: Number
});

module.exports = mongoose.model("Professor", professorSchema);