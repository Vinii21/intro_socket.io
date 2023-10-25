const path = require("path");
const express = require("express");
const SocketIO = require("socket.io");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, "public")))

// start the server
const server = app.listen(app.get("port"), ()=>{
    console.log("server on port", app.get("port"));
})


// websockets
//const io = SocketIO.listen(server);
const io = SocketIO(server);

io.on("connection", (socket)=> {
    console.log("New conncetion", socket.id)

    socket.on("chat:message", (data)=> {
        io.sockets.emit("chat:message:server", data)
    });

    socket.on("chat:typing", (data)=>{
        socket.broadcast.emit("chat:typing:server", data)
    })
})