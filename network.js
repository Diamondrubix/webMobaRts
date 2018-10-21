



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