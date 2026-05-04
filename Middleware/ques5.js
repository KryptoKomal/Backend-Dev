const express = require("express");

const app = express();
app.use(express.json());

const sanitizeInput = (req, res, next) => {
    const clean = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === "string") {
                obj[key] = obj[key]
                    .replace(g, "")       
                    .replace(g, "")      
                    .trim();
            }
        }
    };

    if (req.body) clean(req.body);
    if (req.query) clean(req.query);

    next();
};

app.use(sanitizeInput);


app.post("/data", (req, res) => {
    res.send({
        message: "Sanitized Data",
        data: req.body
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});