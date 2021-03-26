const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));


io.on('connection',socket=>{
    // console.log('new connection');
    socket.on('message',msg=>{
        // console.log(msg);
        socket.broadcast.emit('message',msg);
    })
})
const port = process.env.PORT || 8000;

server.listen(port,()=>{
    console.log(`server listening at ${port}`);
})