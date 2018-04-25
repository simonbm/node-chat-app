var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to: 'liz@home.com',
    //     text: 'what is going on son'
    // });

    socket.emit('createMessage', {
        to: 'liz',
        text: 'what is going on son'
    });

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function(email) {
    console.log('New Message', email);
});
