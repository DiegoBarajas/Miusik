import React, { useEffect, useRef, useState } from 'react';
import { socket } from './socket';
import Title from './Components/Title';

const App = () => {
    // Referencia
    const audioRef = useRef(null);

    // Variables de estado
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [connectedCardActive, setConnectedCardActive] = useState(-1);

    // useEffect
    useEffect(() => {

    }, []);

    // Sockets events
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Functions
    function onConnect() {
      setIsConnected(1);
      setTimeout(()=>setConnectedCardActive(0), 2000);
    }

    function onDisconnect() {
      setIsConnected(false);
      setConnectedCardActive(0);
    }

    return (
      <div>
        <Title/>
        <div>
          
        </div>
      </div>
    )
}

export default App

function convertirSegundosAFormato(audioRef, s) {
  if(audioRef.current == null) return '0:00';    
  const segundos = parseInt(s);
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
  const segundosFormateados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
  if( isNaN(minutosFormateados) ) return '0:00'
  return `${minutosFormateados}:${segundosFormateados}`;
}

function makeRandomList(array, index){
  const compararAleatoriamente = () => Math.random() - 0.5;
  const randomArray = [...array].sort(compararAleatoriamente);

  const indexTmp = randomArray.indexOf(array[index]);

  const aux = randomArray[0];
  randomArray[0] = array[index];
  randomArray[indexTmp] = aux;

  return randomArray;
}