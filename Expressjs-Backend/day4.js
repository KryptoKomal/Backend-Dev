// DAY4 PART1- USING METHODS ALONG WITH DATABSE(student.json) 

const express=require('express')
const app=express();
const fs=require("fs");
const PORT=8000;
app.use(express.json());
const student=[
 {id: 1, name:"annu the don", branch:"billu mafia da leader"},
 {id: 2, name:"annu da dhaba", branch:"billu mafia da karamchaari"},
 {id: 3, name:"annu di gaddi", branch:"billu mafia da billu badmosh"}]


//READING THE EXISTING INFO IN DB AND THEN OVERWRITING THE CHNAGES
// a) send the file first
const readStudentsFromFile=()=>{
    const read=fs.readFile("./student.json","utf-8",(err,data)=>{
        if(err) return res.status(500).send("could not read file");

        //parsing existing data or start with empty array
        const student=JSON.parse(data||"[]");
    });
  }

 //b)write the whole array back to the file (overwriting)
 const writeStudentsFromFile=()=>{
    const write=fs.writeFile("./student.json",JSON.stringify(student,null,2), (err)=>{
            if(err) return res.status(500).send("error in writing the file");

            //only send response inside the success callback
            return res
                .status(201)
                .json({message:"all updates done"});
    })
  }


//===================================================================================================================

//  1) GET METHOD
 // a)ROUTE TO HOMEPAGE
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})



//  b) ROUTE TO STUDENT PAGE WHERE ALL REGISTERED STUDENT DETAILS ARE PRESENT
app.get("/student",(req,res)=>{
  const student=readStudentsFromFile();
    const branch =req.query.branch;
    if(!branch){
        return res.json(student)
    }
    const foundStudents=student.filter(
        (s)=>s.branch===branch
    );
    res.json(foundStudents)
}
)

// c) STUDENTS CAN BE SEARCHED BY THEIR BRANCH
app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.status(400).send("please provide query parameter");
  }
  const foundStudents = student.filter((s) => s.branch == branch);
  return res.json(foundStudents);
});


// d) STUDENT CAN BE SEARCHED USING THEIR IDS
app.get("/student/:id",(req,res)=>{
    const student=readStudentsFromFile();
    const id=req.params.id;
    const foundStudent=student.find(
        (s)=>s.id==id
    );
    if(!foundStudent){
        return res.status(404).send("student not found");
    }
    res.json(foundStudent);
});



//---------------------------------------------------------------------------------------------



// 2) POST METHOD
// a) ADDING NEW STUDENT

app.post("/student/register", (req, res) => {
  const student=readStudentsFromFile();
  const data = req.body;

  if (!data || !data.name || !data.branch|| !data.id) {
    return res.status(400).send("Please provide student details");
  }
  

  const validID=student.find( student=>student.id===data.id)
  if(validID){
    return res.status(409).send("id already exists")
  }

 
  student.push(data);
  writeStudentsFromFile(student);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});



//----------------------------------------------------------------------------------------------------


// 3) PUT METHOD
// a) UPDATE STUDENT DETAILS
app.put("/student/update/:id",(req, res) =>{
  const student=readStudentsFromFile();
  const Id = Number(req.params.id);
  const index = student.findIndex(s => s.id === Id) // 1
  const user = student[index];
 
  if(!user) {
    res.status(404).json("User Not found");
    return;
  }

  student[index] = { ...student[index], ...req.body
  }
  writeStudentsFromFile(student);
  res.status(200).json({
    message:"User Updated Sucessfully",
    student: student[index]
  })
})



//---------------------------------------------------------------------------------------------




// 4) DELETE METHOD
// DELETING A STUDENT

app.delete("/students/:id", (req, res) => {
  const student=readStudentsFromFile();
  const id = parseInt(req.params.id);

  const foundIndex = student.findIndex((s) => s.id == id);
  if (foundIndex == -1) {
    return res.status(400).send("Student not found");
  }
  student.splice(foundIndex, 1);
  writeStudentsFromFile(student);
  return res.status(200).json({
    message: "Student deleted sucessfully",
    updatedStudents: student,
  });
});



//---------------------------------------------------------------------------------------------



app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})