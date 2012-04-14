var express = require('express').createServer();
var io = require('socket.io').listen(express);

express.listen(8080);

express.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

express.get('/style.css', function(req, res) {
    res.sendfile(__dirname + '/public/style.css');
});

express.get('/bg.jpg', function(req, res) {
    res.sendfile(__dirname + '/public/img/bg.jpg');
});

express.get('/chat.jpg', function(req, res) {
    res.sendfile(__dirname + '/public/img/chat.jpg');
});

express.get('/PictoFree.ttf', function(req, res) {
    res.sendfile(__dirname + '/public/font/PictoFree.ttf');
});


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 5); 
});

var usernames = {};

io.sockets.on('connection', function(socket) {

    socket.on('sendchat', function(data) {
        io.sockets.emit('updatechat', socket.username, data);
    });

    socket.on('adduser', function(username) {
        socket.username = username;
        usernames[username] = username;
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected!');
        io.sockets.emit('updateusers', usernames);
    });

    socket.on('disconnect', function() {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has left the building..');
    });
});