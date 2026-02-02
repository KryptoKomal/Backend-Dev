const os=require("os");
const fs=require("fs");
const totalMemory=os.totalmem()/(1024*1024*1024);
const freeMemory=os.freemem()/(1024*1024*1024);
// console.log(totalMemory);

const platform=os.platform();
const cpu= os.cpus()[0].model

// console.log(cpu)
// console.log(os.uptime())
// console.log(os.userInfo())

//------------------------------------------------------------------------------------------------

// question - create a log file containig timestamp when the user logged in and how much
//             the free memory is there at that time, store that info in txt file and 
//            print the info at every 5 sec.

const timestamp= new Date().toLocaleString()

const log= `
time: ${timestamp}
free memory: ${freeMemory}

`

setInterval(()=>{
    fs.appendFile("./system_info.txt", log,(err)=>{
        if(err){
            console.log(err)
        }
    })
}, 5000)