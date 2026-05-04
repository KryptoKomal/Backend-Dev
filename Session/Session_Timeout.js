const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 } 
}));

app.use((req, res, next) => {
    const now = Date.now();

    if (!req.session.lastActivity) {
        req.session.lastActivity = now;
    }

    const diff = now - req.session.lastActivity;

    if (diff > 8000 && diff < 10000) {
        console.log(" Session about to expire");
    }

    if (diff >= 10000) {
        req.session.destroy();
        return res.send("Session expired");
    }

    req.session.lastActivity = now;

    next();
});

app.get("/", (req, res) => {
    res.send("User active");
});

app.listen(3000, () => {
    console.log("Server running ");
});