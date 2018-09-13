var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);    //require Socket.IO

app.get('/', function(req, res) {
    res.sendfile('hello.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');

    //Send a message adter a timeout of 4 seconds
    setTimeout(function(){
        socket.send('Sent a message 4 seconds after connection!');
    }, 4000);

    //Whenever somone disconnects this piece of code executed
    socket.on('disconnect', function(){
        console.log('A user disconnected');
    });
});

http.listen(3000, function(){
    console.log('Start server at http://localhost:3000/')
});