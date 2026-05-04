const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    code: String,
    credits: Number,
    prerequisites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema);