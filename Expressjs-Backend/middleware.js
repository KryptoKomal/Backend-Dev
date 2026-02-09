// Middleware
const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8000;

// Middleware 1
app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log("I am middleware 2");
  next();
});
app.use((req , res,next)=>{
  console.log=`${new Date(). toLocaleString()}`
  fs.appendFile("log.txt",log, (err)=>{

  })
})

const fileMiddleware=(req,res,next)=>{
  console.log("I am checking file access");
  return res.send("auth file");
}

app.use((req,res,next)=>{
  const token = req.header["authorization"];
});

const authMiddleware =(req,res,next)=>{
  const token = req.header["authorization"];
  if(!token) return res.status().send ("please provide Auth token");
  if(token =="secrettoken"){
    next();
  }
  else{
    return res.status(400).send("UnAuthorized");
  }
}

// File functions
const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

// Route
app.get("/students",fileMiddleware, async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});

// Server start (only once)
app.listen(PORT, () => {
  console.log("Server is listening on port: 8000");
});
