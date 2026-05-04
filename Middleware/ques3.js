const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userActivityDB");

const userSchema = new mongoose.Schema({
    username: String,
    loginTime: Date,
    logoutTime: Date,
    lastActive: Date
});

userSchema.pre("save", function(next) {
    if (!this.loginTime) {
        this.loginTime = new Date();
    }
    this.lastActive = new Date();
    next();
});

userSchema.pre("findOneAndUpdate", function(next) {
    this.set({ lastActive: new Date() });
    next();
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { username } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
        user = new User({ username });
    }

    user.loginTime = new Date();
    await user.save();

    res.send("User logged in");
});

app.post("/logout", async (req, res) => {
    const { username } = req.body;

    await User.findOneAndUpdate(
        { username },
        { logoutTime: new Date() }
    );

    res.send("User logged out");
});

app.post("/activity", async (req, res) => {
    const { username } = req.body;

    await User.findOneAndUpdate(
        { username },
        {}
    );

    res.send("Activity updated");
});

app.listen(3000, () => {
    console.log("Server running ");
});