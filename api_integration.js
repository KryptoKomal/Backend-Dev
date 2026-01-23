const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();

    const parsedUrl = url.parse(req.url, true);
    const { name, email } = parsedUrl.query;

    const log = `User requested at: ${timestamp} for URL: ${req.url}`;
    fs.appendFile("log.txt", log + "\n", (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });

    switch (parsedUrl.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to home page ;)</h1>");
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>Hello, I am ${name} and my email is ${email}</h1>`);
            break;

        default:
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Page not found" }));
    }
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});