const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fileUpload = require("express-fileupload");
const colors = require('colors/safe');
const Sockets = require('./Sockets');
require('dotenv').config();

class Server {

    constructor(){
        this.port = process.env.PORT;
        this.app = express();
        this.server = http.createServer( this.app );
        this.io = socketIo(this.server, { 
            cors: {
                origin: "http://localhost:3000"
            } 
        });

        this.configureMiddlewares();
        this.configureRoutes();
        this.configureSockets();
    }

    configureMiddlewares(){
        this.app.use( express.json() );

        this.app.use( 
            fileUpload({
                useTempFiles: true,
                limits: { fileSize: 50 * 2024 * 1024 }
            })
        );
    }

    configureRoutes(){
        this.app.get('/', (req, res) => 
            res.send(' B A C K E N D ')
        );
    }

    configureSockets(){
        new Sockets( this );
    }

    launchServer(){
        this.server.listen(this.port, () => {
            console.clear();
            console.log( colors.cyan(`Servidor lanzado en el puerto: ${this.port}`) );
        });
    }
}

module.exports = Server;