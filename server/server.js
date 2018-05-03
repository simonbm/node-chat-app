const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log  + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });

    next();
});

io.on('connection', (socket) => {
    console.log('New User connected');



    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the channel",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "A New user has joined the channel",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     })
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
});

server.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});