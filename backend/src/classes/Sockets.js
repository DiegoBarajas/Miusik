const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

class Sockets{

    constructor( Server ){
        this.io = Server.io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => {
            console.log('New Connection:', socket.id);

            socket.on('getAllSongs', () => {
                readFilesArray( getAllFiles(path.resolve(__dirname, '../media')) ).then(data => {
                    socket.emit('sendBinaries',  data);
                });
            });

        });
    }

}

module.exports = Sockets;

function getAllFiles(folder){
    return fs.readdirSync(folder)
        .map(nombreArchivo => {
            const rutaArchivo = path.join(folder, nombreArchivo);
            if (fs.statSync(rutaArchivo).isFile()) return folder + '/' + nombreArchivo;
        })
        .filter(nombreArchivo => nombreArchivo !== undefined);
}

async function readFilesArray(array) {
    const promises = array.map(async (element) => {
        const blob = fs.readFileSync(element);
        const metadata = await mm.parseBuffer(blob);

        return {
            blob,
            artist: metadata.common.artist,
            songName: metadata.common.title
        };
    });

    return Promise.all(promises);
}