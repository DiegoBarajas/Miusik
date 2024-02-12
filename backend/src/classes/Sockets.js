class Sockets{

    constructor( Server ){
        this.io = Server.io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => {
            console.log('New Connection:', socket);
        });
    }

}

module.exports = Sockets;