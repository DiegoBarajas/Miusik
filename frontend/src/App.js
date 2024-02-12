import React, { useState } from 'react';
import { socket } from './socket';
import Card from './Components/Card';


const App = () => {
    // Variables de estado
    const [isConnected, setIsConnected] = useState(socket.connected);
    
    // Eventos de sockets
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);


    // Funciones
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    return (
      <div>
        App: {isConnected ? 'Conectado' : 'Desconectado' }

        <Card active={true}/>
        <Card active={false}/>

      </div>
    )
}

export default App