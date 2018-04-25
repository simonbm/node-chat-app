const express = require('express');
const path = require('path');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

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

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});