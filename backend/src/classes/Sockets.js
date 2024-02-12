const fs = require('fs');
const path = require('path');

class Sockets{

    constructor( Server ){
        this.io = Server.io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => {
            console.log('New Connection:', socket);

            socket.on('getAllSongs', () => {
                console.log(getAllFiles(path.resolve(__dirname, '../media')));
            });

        });
    }

}

module.exports = Sockets;

function getAllFiles(folder){
    return fs.readdirSync(folder)
        .map(nombreArchivo => {
            const rutaArchivo = path.join(folder, nombreArchivo);
            if (fs.statSync(rutaArchivo).isFile()) return folder + nombreArchivo;
        })
        .filter(nombreArchivo => nombreArchivo !== undefined);
}

function readFilesArray(array){
    
}