
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";


let userOTP = "123456";


const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).send("Token required");

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).send("Invalid token");
    }
};


const verifyOTP = (req, res, next) => {
    const { otp } = req.body;

    if (otp !== userOTP) {
        return res.status(403).send("Invalid OTP");
    }

    next();
};


app.post("/login", (req, res) => {
    const { username } = req.body;

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.send({
        message: "Login successful",
        token: token,
        otp: userOTP   
    });
});

app.post("/secure-data", verifyToken, verifyOTP, (req, res) => {
    res.send("Access granted to sensitive data");
});

app.listen(3000, () => {
    console.log("Server running");
});