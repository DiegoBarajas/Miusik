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
            
            // Obtiene la metadata y path de todas las canciones
            socket.on('client:getSongsInfo', async() => {

                const PATH = path.resolve(__dirname, '../media');
                const metadataArray = [];

                fs.readdir(PATH, async (err, files) => {
                    if (err) {
                        console.error('Error al leer la carpeta:', err);
                        return;
                    }
                
                    for (const file of files) {
                        const filePath = path.join(PATH, file);
                
                        try {
                            const metadata = await mm.parseFile(filePath);
                            metadataArray.push({ ...metadata, path: filePath, originalIndex: metadataArray.length });
                        } catch (error) {
                            console.error('Error al obtener la metadata de la canción', file, ':', error.message);
                        }
                    }

                    socket.emit('server:sendSongsInfo', metadataArray);
                });     

            });

            // Obtiene el buffer o blob de la cancion
            socket.on('client:getBufferSong', (path) => {
                const buffer = fs.readFileSync(path);
                socket.emit('server:sendBufferSong', buffer);
            })



        });
    }

}

module.exports = Sockets;