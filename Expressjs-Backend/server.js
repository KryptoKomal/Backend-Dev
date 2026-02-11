const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.static("public"))

app.use(express.urlencoded({extended : true}));
app.get("/",(req,res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/students/register",(req,res) => {
  console.log("form data",req.body);
  res.send("Registered sucessful");
})

app.listen(PORT,() => {
  console.log(`server is running at port on http://localhost:${PORT}`);
})