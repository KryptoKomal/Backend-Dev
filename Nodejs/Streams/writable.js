const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname,"input.txt");// basename sirf filename niklta hai
const outputFilePath = path.join(__dirname,"output.txt");

const inputStream=fs.createReadStream(inputFilePath,'utf8')

inputStream.on("data",(chunk)=>{
    console.log("Data is reading in chunks",chunk);
})
// const writeStream =fs.createReadStream(inputStream);
// writeStream.pipe(outputStream);    // connect input output 