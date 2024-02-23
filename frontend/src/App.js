import React, { useEffect, useRef, useState } from 'react';
import { socket } from './socket';
import Card from './Components/Card';
import Column from './Components/Column';
import Controls from './Components/Controls';
import ConnectedCard from './Components/ConnectedCard';
import Loader from './Components/Loader';
import Title from './Components/Title';

const App = () => {
    // Referencia
    const audioRef = useRef(null);

    // Variables de estado

    const [connectedCardActive, setConnectedCardActive] = useState(-1);

    const [songsInfo, setSongsInfo] = useState([]);
    const [currentSongsInfo, setCurrentSongsInfo] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [originalIndex, setOriginalIndex] = useState(-1);
    const [audioURL, setAudioURL] = useState('');
    const [duration, setDuration] = useState('0:00');
    const [currentDuration, setCurrentDuration] = useState('0:00');
    const [currentTime, setCurrentTime] = useState(0);
    const [songName, setSongName] = useState('');
    const [artist, setArtist] = useState('');
    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const [isConnected, setIsConnected] = useState(socket.connected);


    // useEffect
    useEffect(() => {
      socket.emit('client:getSongsInfo');
    }, []);

    useEffect(() => {
        if(audioURL != '') { 
          audioRef.current.src = audioURL;
          audioRef.current.play();
        };
    }, [audioURL]);

    // Sockets events
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('server:sendSongsInfo', (metadata) => {
      setSongsInfo(metadata);
      setCurrentSongsInfo(metadata);
    });

    socket.on('server:sendBufferSong', (buffer) => {
      const blob = new Blob( [buffer], { type: 'audio/mp3' } );
      setAudioURL(URL.createObjectURL(blob));
    });

    // Functions
    function onConnect() {
      setIsConnected(1);
      setTimeout(()=>setConnectedCardActive(0), 2000);
    }

    function onDisconnect() {
      setIsConnected(false);
      setConnectedCardActive(0);
    }

    function selectSong(){
      
    }

    function updateTime(){
      setCurrentDuration(convertirSegundosAFormato(audioRef.current.currentTime));

    }

    const handleSeek = (event) => {
    };

    function pause(){
      
    }

    function next(){
      if(currentIndex+1 > currentSongsInfo.length) return;
      document.querySelector('#card-'+currentSongsInfo[currentIndex+1].originalIndex).scrollIntoView();
      setSongName(songsInfo[currentSongsInfo[currentIndex+1].originalIndex].common.title);
      setArtist(songsInfo[currentSongsInfo[currentIndex+1].originalIndex].common.artist);
      socket.emit('client:getBufferSong', currentSongsInfo[currentIndex+1].path);

      setCurrentIndex(currentIndex+1);
      setOriginalIndex(currentSongsInfo[currentIndex+1].originalIndex);

      console.log(currentSongsInfo[currentIndex+1].originalIndex);


    }

    function prev(){
    }

    function rand(){
    }

    function repetir(){
    }

    function stop(){
    }

    function restart(){
    }

    function convertirSegundosAFormato(s) {
      if(audioRef.current == null) return '0:00';    
      const segundos = parseInt(s);
      const minutos = Math.floor(segundos / 60);
      const segundosRestantes = segundos % 60;
      const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
      const segundosFormateados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
      if( isNaN(minutosFormateados) ) return '0:00'
      return `${minutosFormateados}:${segundosFormateados}`;
    }

    return songsInfo.length == 0 
    ? <div>
        <Loader/>
        {
            !isConnected 
              ? <ConnectedCard>
                  El servidor no esta conectado :(<br/>Compruebe su conexión a internet
                </ConnectedCard> 
              : <ConnectedCard green active={connectedCardActive}>
                  Conexión reestablecida :)
                </ConnectedCard>
          }    
    </div> 
    : (
      <div>
        {
          !isConnected 
            ? <ConnectedCard>
                El servidor no esta conectado :(<br/>Compruebe su conexión a internet
              </ConnectedCard> 
            : <ConnectedCard green active={connectedCardActive}>
                Conexión reestablecida :)
              </ConnectedCard>
        }      

        <audio 
          ref={audioRef}
          id='audio' 
          src={''}
          onTimeUpdate={updateTime}
          onEnded={next}
        ></audio>


        

        <Title/>

        <Column reverse={false}>
          {
            songsInfo.map((m, index) => {
              return originalIndex === index
              ? <Card 
                  id={"card-"+m.originalIndex}
                  paused={audioRef.current.src != '' ? audioRef.current.paused : false}
                  key={'card-'+index}
                  index={index+1}
                  songName={m.common.title}
                  artist={m.common.artist}
                  active={true}
                  onClick={() => selectSong(m, index)}
                />
              : <Card 
              id={"card-"+m.originalIndex}
                  paused={false}
                  key={'card-'+index}
                  index={index+1}
                  songName={m.common.title}
                  artist={m.common.artist}
                  active={false}
                  onClick={() => selectSong(m, index)}
                />
            }
              
            )
          }

        </Column>

        {
          (audioRef.current != null) && (audioRef.current.src != '') && (audioRef.current.src != window.location) || true
          ? <Controls
              
            />
        : <></>
        }

        <div 
          style={{
            content: '',
            width: '100%',
            height: '150px'
          }}
        ></div>

      </div>
    )
}

export default App

function makeRandomList(array, index){
  const compararAleatoriamente = () => Math.random() - 0.5;
  const randomArray = [...array].sort(compararAleatoriamente);

  const indexTmp = randomArray.indexOf(array[index]);

  const aux = randomArray[0];
  randomArray[0] = array[index];
  randomArray[indexTmp] = aux;

  return randomArray;
}