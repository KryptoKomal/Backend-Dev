const express = require("express");
const fs = require("fs");

const app = express();


app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${end - start}ms\n`;

        fs.appendFile("logs.txt", log, (err) => {
            if (err) console.log(err);
        });
    });

    next();
});


app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(3000, () => {
    console.log("Server running ");
});