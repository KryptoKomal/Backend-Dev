const path = require('path');
const express = require('express');
const fs =require('fs');
const app = express();

app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname,'index.html'));
});


const PORT =3000;
app.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`)
});
