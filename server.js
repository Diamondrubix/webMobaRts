
var express = require('express');
var app = express();
var path = require('path');

//var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/game.html');
});

app.use(express.static(__dirname + '/'));



io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('gameroom1', function(msg){
        console.log('message: ' + msg);
        io.emit("gameroom1", msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});



http.listen(3001, function(){
    console.log('listening on *:3001');
});