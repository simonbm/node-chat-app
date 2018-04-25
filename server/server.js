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

    // socket.emit('newEmail', {
    //     from: 'nick@postman.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: 123
    // });

    socket.emit('newMessage', {
        from: 'nick',
        text: 'Hey. What is going on.',
        createdAt: 12345647586

    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
});

server.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});