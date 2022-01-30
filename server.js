const http = require('http');
const express = require("express");
const path = require('path');
const app = express();




app.use(express.static(path.join(__dirname, 'public')))
const PORT = 3000 || process.env.PORT;


const server = http.createServer(app)



const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    // CUrrent user
    socket.emit('message', 'Welcome to procord');

    //Broadcast when an user connects
    socket.broadcast.emit('message', 'A User has joined the chat');
    // io.emit();

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})