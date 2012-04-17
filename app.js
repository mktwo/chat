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

express.get('/connect.mp3', function(req, res) {
    res.sendfile(__dirname + '/public/sound/connect.mp3');
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
            if (/\S/.test(strippedmsg)) {
                 // string is not empty and not just whitespace
                if (/(\/\w*)/g.test(strippedmsg)) {
                    strippedmsg = " tried to cheat.";
                    io.sockets.emit('updatechat','SERVER', socket.username+strippedmsg);
                } else {
                    strippedmsg = strippedmsg.replace(/(^|\W+)\@([\w\-]+)/gm,'$1<a href="http://twitter.com/$2" target="_blank">@$2</a>');
                    strippedmsg = strippedmsg.replace(/\[(([^\]])*)\]/g,'<a href="http://geekli.st/$1" target="_blank">$1</a>');
                    io.sockets.emit('updatechat', socket.username, strippedmsg);
                }
            } 
    });

    socket.on('adduser', function(username) {
        var strippedmsg = username.replace(/(<([^>]+)>)/ig,"");
        var finalmsg;
        if (/\S/.test(strippedmsg)) {
            if (usernames.hasOwnProperty(strippedmsg)) {
                i++;
            } else {
                i=0;
            }

            if(i == 0){
                finalmsg = strippedmsg;
                
            } else {
                finalmsg = strippedmsg+i;
            }
            
            socket.username = finalmsg;
            usernames[finalmsg] = finalmsg;
            socket.broadcast.emit('updatechat', 'SERVER', finalmsg + ' has connected!');                           
            io.sockets.emit('updateusers', usernames);
        }
    });


    socket.on('disconnect', function() {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has left the building..');
    });
});