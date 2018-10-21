
express = require('express');
app = express();
path = require('path');

Drawable = require('./Drawable.js');
Player = require('./Player.js');
//var app = require('express')();

var http = require('http').Server(app);
//var io = require('socket.io')(http);
var io = require('socket.io').listen(http);

gameObjects = [];


app.get('/', function(req, res){
    res.sendFile(__dirname + '/game.html');
});

app.use(express.static(__dirname + '/'));


function handleCollisions(){
    for(var i=0; i<gameObjects[i].length; i++){
        if(gameObjects[i].classType == "Player"){
            console.log("fewfew");
        }
    } 
}

io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('gameroom1', function(msg){
        for (var i = 0; i < gameObjects.length; i++) {
            var obj = gameObjects[i];
            if (obj.id == msg.id) {
                gameObjects[i].x = msg.x;
                gameObjects[i].y = msg.y;


                handleCollisions();
                io.emit("gameroom1", msg);

                return;
            }
        }
        x = null; 

        if(msg.classType == "Drawable"){
            x = new Drawable(msg.x, msg.y, msg.width, msg.height, msg.color);
        }else if (msg.classType == "Player"){
            x = new Player(msg.x, msg.y);
        }

        x.id = msg.id;
        x.moveable = msg.moveable;
        gameObjects.push(x);
        
        handleCollisions();
        io.emit("gameroom1", msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});






http.listen(3001, function(){
    console.log('listening on *:3001');
});