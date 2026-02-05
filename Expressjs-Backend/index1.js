const express = require('express');
const fs = require("fs");
const app = express();
const PORT =8000;
app.use(express.json());

const student=[
   { id: 1, name: "raj", branch: "cse" },
    { id: 2, name: "raju", branch: "it" },
    { id: 3, name: "komal", branch: "ece" }]

    app.get("/",(req,res)=>{
        res.send("welcome to the jungle guyes");
    })
    app.get("/students",(req,res)=>{
        fs.readFile("./students.json",(err,data)=>{
            if(err){
                return res.status(500).send("Error occured");
            }
            return res.status(200).send(JSON.parse(data));
        });
        return res.json(students);
    })

    // app.get("/students/search",(req,res)=>{

    // })
    // app.get("/students/:id",(req,res)=>{
        
    // })

    
    app.post("/students/register",(req,res)=>{
        const{name,branch} =req.body;
        if(!name||branch) return res.status(500).send("Could not read file");

        //read the file first
        fs.readFile("./students.json","utf-8",(err,data)=>{
            if(err) return res.status(500).send("could not read file");

        //Parse existing data or start with empaty file

        const students = JSON.parse(data || "[]");
        //create and push new student
        const newStudent ={
            id: students.length >0? students[students.length -1].id +1:1,
            name,
            branch,
        };
        students.push(newStudent);
        //write the whole array back to the file (overwriting)

        fs.writeFile(
            "./students.json",
            JSON.stringify(students,null,2),
            (err)=>{
                if(err)return res.status(500).send("Error writing to file");
                    //only send response inside the success callback
                return res
                .status(201)
                .json({message: "Register!",student: newStudent});
            }
        )
    })
 })

app.listen(PORT,(req,res)=>{
    console.log(`Server successfully runing on the port:${PORT}`);
})