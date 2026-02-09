//DAY2- LEARNING FUNCTIONS: without dataase

const express=require('express')
const app=express()
const PORT=8000;
const student=[
 { id: 1, name: "raj", branch: "CSE" },
  { id: 2, name: "Ajay", branch: "ECE" },
  { id: 3, name: "Yash", branch: "IT" },
];
//  1) GET METHOD
 // a)ROUTE TO HOMEPAGE
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})



//  b) ROUTE TO STUDENT PAGE WHERE ALL REGISTERED STUDENT DETAILS ARE PRESENT
app.get("/student",(req,res)=>{
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
  const data = req.body;

  if (!data || !data.name || !data.branch|| !data.id) {
    return res.status(400).send("Please provide student details");
  }
  

  const validID=student.find( student=>student.id===data.id)
  if(validID){
    return res.status(409).send("id already exists")
  }

 
  student.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});


//---------------------------------------------------------------------------------------------



// 3) PUT METHOD
// a) UPDATE STUDENT DETAIL S
app.put("/student/update/:id",(req, res) =>{
  const Id = Number(req.params.id);
  const index = student.findIndex(s => s.id === Id) // 1
  const user = student[index];
 
  if(!user) {
    res.status(404).json("User Not found");
    return;
  }

  student[index] = { ...student[index], ...req.body
  }
  res.status(200).json({
    message:"User Updated Sucessfully",
    student: student[index]
  })
})



//---------------------------------------------------------------------------------------------




// 4) DELETE METHOD
// DELETING A STUDENT

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const foundIndex = student.findIndex((s) => s.id == id);
  if (foundIndex == -1) {
    return res.status(400).send("Student not found");
  }
  student.splice(foundIndex, 1);

  return res.status(200).json({
    message: "Student deleted sucessfully",
    updatedStudents: student,
  });
});

//---------------------------------------------------------------------------------------------



app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})