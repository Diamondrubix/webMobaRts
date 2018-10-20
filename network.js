


import "/socket.io/socket.io.js"
import "https://code.jquery.com/jquery-1.11.1.js"


class network {

    constructor(gameroom) {
        this.gameroom = gameroom;
        this.socket = io();
    }

    send() {
        socket.emit(gameroom, $('#m').val());
    }

    recive() {
        var message;
        socket.on(gameroom, function (msg) {
             message = msg;
        });
        return message;
    }

}