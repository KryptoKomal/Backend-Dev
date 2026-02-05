const express=require('express')
const app=express()
const PORT=8000;
app.use(express.json());
const student=[
   { id: 1, name: "raj", branch: "cse" },
    { id: 2, name: "raju", branch: "it" },
    { id: 3, name: "komal", branch: "ece" }]
// { id: 4, name: "divyanka", branch: "aiml}]" 

 //ROUTE TO HOMEPAGE
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

//ROUTE TO STUDENT PAGE WHERE STUDENT CAN BE SEARCHED USING THEIR BRANCH
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

// STUDENT CAN BE SEARCHED USING THEIR IDS
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

app.get("student/search",(req,res)=>{
    const searchQuery=req.query;
    console.log(req.query);

})

// ADDING NEW USER
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

app.put("/student/:id", (req, res) => { //put use for upadate
    const id = parseInt(req.params.id);
    const { name, branch } = req.body;
        const index = student.findIndex((s) => s.id === id);
    if (index === -1) {
        return res.status(404).send("Student not found");
    }
    if (name) {
        student[index].name = name;
    }
    if (branch) {
        student[index].branch = branch;
    }
    res.json({
        message: "Student updated successfully",
        student: student[index]
    });
});

app.delete("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = student.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).send("Student not found");
  }

  student.splice(index, 1);
  res.json({ message: `Student with ID ${id} deleted` });
});


app.listen(PORT,()=>{
    console.log(`Server is listening on port:${PORT}`);
});
