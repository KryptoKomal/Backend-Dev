// Exercise 4: Simple API
// Build a simple TODO API with endpoints for creating, reading, updating, and deleting tasks.
// Store tasks in memory.


const http = require("http");
const url = require("url");

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  if (path === "/todos" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
    return;
  }

  if (path === "/todos" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { task } = JSON.parse(body);
      const newTodo = { id: idCounter++, task, completed: false };
      todos.push(newTodo);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTodo));
    });
    return;
  }

  if (path.startsWith("/todos/") && method === "PUT") {
    const id = Number(path.split("/")[2]);
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { task, completed } = JSON.parse(body);
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
        return;
      }
      if (task !== undefined) todo.task = task;
      if (completed !== undefined) todo.completed = completed;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    });
    return;
  }

  if (path.startsWith("/todos/") && method === "DELETE") {
    const id = Number(path.split("/")[2]);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
      return;
    }
    const removed = todos.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(removed[0]));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route Not Found" }));
});

server.listen(8000, () => {
  console.log("TODO API running on http://localhost:8000");
});