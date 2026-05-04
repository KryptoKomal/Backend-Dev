const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "user", password: "123", role: "user" }
];

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) return res.status(401).send("Invalid credentials");

    req.session.user = user;

    res.send("Login successful");
});

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send("Login required");
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.session.user.role !== "admin") {
        return res.status(403).send("Access denied (Admin only)");
    }
    next();
};

app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
    res.send("Welcome to Admin Panel");
});

app.get("/profile", isAuthenticated, (req, res) => {
    res.send(`Welcome ${req.session.user.username}`);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

app.listen(3000, () => {
    console.log("Server running ");
});