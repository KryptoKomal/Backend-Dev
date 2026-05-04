const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/set-language/:lang", (req, res) => {
    const lang = req.params.lang;

    res.cookie("language", lang, { maxAge: 24 * 60 * 60 * 1000 }); 
    res.send(`Language set to ${lang}`);
});


app.get("/", (req, res) => {
    const lang = req.cookies.language || "en";

    let message;

    if (lang === "en") message = "Hello!";
    else if (lang === "fr") message = "Bonjour!";
    else message = "Hello!";

    res.send(`Language: ${lang} | Message: ${message}`);
});

app.listen(3000, () => {
    console.log("Server running ");
});