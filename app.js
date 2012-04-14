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
var i = 0;

io.sockets.on('connection', function(socket) {

    socket.on('sendchat', function(data) {
        var strippedmsg = data.replace(/(<([^>]+)>)/ig,"");
            strippedmsg = strippedmsg.replace(/(^|\W+)\@([\w\-]+)/gm,'$1<a href="http://twitter.com/$2" target="_blank">@$2</a>');
            strippedmsg = strippedmsg.replace(/\[(([^\]])*)\]/g,'<a href="http://geekli.st/$1" target="_blank">$1</a>');
        io.sockets.emit('updatechat', socket.username, strippedmsg);
    });

    socket.on('adduser', function(username) {
        var strippedmsg = username.replace(/(<([^>]+)>)/ig,"");
        socket.username = strippedmsg;
        if (strippedmsg === "SERVER")
            strippedmsg = "faker!";
        if(strippedmsg === username) {
            if (i != 0){
                strippedmsg += i;   
                socket.username = strippedmsg;
                i++;
            } else {            
                i++;
                socket.username = strippedmsg;
            }

            usernames[strippedmsg] = strippedmsg;
            socket.broadcast.emit('updatechat', 'SERVER', strippedmsg + ' has connected!');
        }
        io.sockets.emit('updateusers', usernames);
    });

    socket.on('disconnect', function() {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has left the building..');
    });
});