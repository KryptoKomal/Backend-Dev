const fs = require('fs');
const path = require('path');
const {Transform} = require("stream");

const inputFilePath = path.join(__dirname,"input.txt");
const transformoutputFilePath = path.join(__dirname,"transformoutput.txt")
const readStream = fs.createReadStream(inputFilePath,{encoding:"utf-8"})
const writeStream = fs.createWriteStream(transformoutputFilePath)

const upperCaseTransform = new Transform({
  transform(chunk,encoding,callback) {
    const transformData = chunk.toString().toUpperCase();
    this.push(transformData)
   
    callback()
  }
})

readStream.pipe(upperCaseTransform).pipe(writeStream)