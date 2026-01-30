const express=require('express')
const app=express()
const PORT=8000;
const student=[ 
    { id: 1, name: "raj", branch: "cse" },
    { id: 2, name: "raju", branch: "ba" },
    { id: 3, name: "komal", branch: "bsc" },
    { id: 4, name: "divyanka", branch: "cs" }
];

app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

app.get("/student",(req,res)=>{
    res.json(student);
}
)

app.get("/student/:id",(req,res)=>{
    res.send(student);
}
)

app.get("students/search",(req,res)=>{
    const searchQuery=req.query;
    console.log(req.query);

})

app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})



