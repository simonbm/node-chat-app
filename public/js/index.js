var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to: 'liz@home.com',
    //     text: 'what is going on son'
    // });

    // socket.emit('createMessage', {
    //     to: 'liz',
    //     text: 'what is going on son'
    // });

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

 socket.on('newMessage', function(message) {
     console.log('New Message', message);

     var li = jQuery('<li></li>');
     li.text(`${message.from}: ${message.text}`);

     jQuery('#messages').append(li);

 });



// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Did you see Avengers?'
// }, function (data)  {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();


    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function ()  {

    });

});