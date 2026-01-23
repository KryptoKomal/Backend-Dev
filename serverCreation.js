const http = require("http");

//SERVER CREATION

const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type": "text/html"});
    res.end("Response is closed")
})


const server1=http.createServer((req,res)=>{

    const user={
        id:1,
        name:"annu the badmosh",
        role:"mafia don"

    };

    res.writeHead(200,{"Content-Type": "application/JSON"});
    res.end(JSON.stringify(user));
});

server1.listen(8000, ()=>{
    console.log("server is running on port 8000");
})




const server2=http.createServer((req,res)=>{
    switch(req.url){
        case "/":
            res.writeHead(200,{"content-Type": "text/html"});
            res.end("<h1> Welcome to my page</h1>")
            break;

        case "/about":
            res.writeHead(200,{"content-Type": "text/html"});
            res.end("<h1>Welcome to my about page</h1>")
            break;

        default:
            res.writeHead(404,{"content-Type": "text/html"});
            res.end("page not found")
    }

})

    server2.listen(8000, ()=>{
    console.log("server is running on port 8000");
    })



const server3=http.createServer((req,res)=>{
    switch(req.url){
        case "/":
            res.writeHead(200,{"content-Type": "text/html"});
            res.end("<h1> Welcome to my page</h1>")
            break;

        case "/about":
            res.writeHead(200,{"content-Type": "text/html"});
            res.end("<h1>Welcome to my about page</h1>")
            break;

        default:
            res.writeHead(404,{"content-Type": "application/json"});
            res.end({username:"", phone:""});
    }

})

    server3.listen(8000, ()=>{
    console.log("server is running on port 8000");
    })