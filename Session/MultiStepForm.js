const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.post("/step1", (req, res) => {
    const { name } = req.body;
    req.session.name = name;

    res.send("Step 1 completed");
});

app.post("/step2", (req, res) => {
    const { email } = req.body;
    req.session.email = email;

    res.send("Step 2 completed");
});

app.post("/step3", (req, res) => {
    const { password } = req.body;
    req.session.password = password;

    res.send({
        message: "Registration complete",
        data: req.session
    });
});

app.listen(3000, () => {
    console.log("Server running ");
});