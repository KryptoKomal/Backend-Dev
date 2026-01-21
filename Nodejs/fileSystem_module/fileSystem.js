// modules
const file= require("fs") // inbuild module for custom modules we use "./" eg- ./fs
const path= require("path")

const fs= require("http") 
// http.createServer(function(req,res){
    
// })

// 1 ) WRITE OPERTION

const fs=require("fs");
// fs.writeFileSync("./test.txt", "This is Sync file content")

// 2) READ OPERATION

// a) Sync

const file=fs.readFileSync("test.txt","utf-8") // utf-8 is one of the method which is use to decode the file content
console.log(file)


// b) Async
const asyncFile=fs.readFile("test.txt","utf-8", (err,data)=>{
    if(err){
        console.log("error in file reading", err);

    }
    else{
        console.log("file reading successfull", data)
    }
})
console.log(asyncFile)

//whenever we write file its content gets overrite so we use append to add content without deleting the old data



// 3) COPY FILE

//const fs = require("fs");

// a) FOR ASYNC

//callback for dest.txt

fs.copyFile("test.txt","dest.txt",(err) => {
    if(err) {
        console.log("Error while copied a file",err)
    }else {
        console.log("file is copied successfully")
    }
}) // callback run after file finish copy

// b) FOR SYNC

fs.copyFileSync("test.txt","dest1.txt")
console.log("file is copied")


// 4) DELETING FILE
// a) async
fs.unlink("dest.txt",(err) => {
    if(err) {
        console.log("Error while deleting file",err)
    }else {
        console.log("file is deleted")
    }
})

// 5) creating new directory

fs.mkdir("newDirectory", (err)=>{
    if(err) return;
    console.log("Directory created")
    
})
fs.mkdir("folders/folder1/folder2", { recursive: true},(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log("Directory is created");
})

// 6) READING FILES IN DIR

fs.readdir("newDirectory", (err, files)=>{
    if(err){
        console.log(err); return
    }
    console.log("files:",files)
})

// 7) DELETE EMPTY DIR

fs.rmdir("newDirectory", (err)=>{  
    if(err){
        console.log(err); return
    }
    console.log("directory is removed")
})


// 8) DELETE FILE IN DIR
fs.rm("newDirectory/index.js", (err)=>{ // is use to delete file in a dir
    if(err){
        console.log(err); return
    }
    console.log("directory is removed")
})