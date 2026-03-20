// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');
// const PORT = 3500

// app.use(express.static(path.join(__dirname, "public")));

// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "form.html"));
// });

// app.use(express.urlencoded({ extended: true }));

// app.post('/register', (req, res) => {
//   const { name, branch } = req.body;
//   const newUser = { name, branch };

//   fs.readFile('data.json', 'utf8',  (err, data) => {
//     if (err) {
//       return res.send('Error reading user data');
//     }
//     let users = JSON.parse(data);

//     users.push(newUser);
//     fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         return res.send('Error saving user data');
//       }
//       console.log("saved", newUser);
//       res.send('User registered successfully');
//     });
//   });
// });
// app.listen(PORT, () => {
//   console.log(`Server running on localhost:${PORT}`);
// });
const express = require("express");
const studentRouters= require("../routes/studentsRoutes");
const app = express();
const PORT =3000;
const dotenv = require("dotenv");
const moongoose = require("mongoose")
dotenv.config();
app.use(express.json())

app.use('api/students/',studentRoutes)

moongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connect to MongoDB database"))
.catch(err=>console.error('Connection Failed', err));

app.listen(PORT,(err,res)=>{
  console.log(`Server is running on port${PORT}`);
})
