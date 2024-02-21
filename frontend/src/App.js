import React, { useEffect, useRef, useState } from 'react';
import { socket } from './socket';
import Card from './Components/Card';
import Column from './Components/Column';
import Controls from './Components/Controls';


const App = () => {
    // Referencia
    const audioRef = useRef(null);

    // Variables de estado
    const [songsInfo, setSongsInfo] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [audioURL, setAudioURL] = useState('');
    const [duration, setDuration] = useState('0:00');
    const [currentDuration, setCurrentDuration] = useState('0:00');
    const [currentTime, setCurrentTime] = useState(0);
    const [songName, setSongName] = useState('');
    const [artist, setArtist] = useState('');
    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const [randomList, setRandomList] = useState([]);

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
    socket.on('server:sendSongsInfo', (metadata) => {
      setSongsInfo(metadata);
    });

    socket.on('server:sendBufferSong', (buffer) => {
      const blob = new Blob( [buffer], { type: 'audio/mp3' } );
      setAudioURL(URL.createObjectURL(blob));
    });

    // Functions
    function selectSong(songInfo, index){
      setCurrentIndex(index);
      setSongName(songInfo.common.title);
      setArtist(songInfo.common.artist);

      socket.emit('client:getBufferSong', songInfo.path);
    }

    function updateTime(){
      setCurrentDuration(convertirSegundosAFormato(audioRef.current.currentTime));
      setDuration(convertirSegundosAFormato(audioRef.current.duration));

      setCurrentTime(audioRef.current.currentTime);
    }

    const handleSeek = (event) => {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    function pause(){
      if(audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
    }

    function next(){     
      if(random){
        if(currentIndex+1 > randomList.length){
          setSongName(randomList[0].common.title);
          setArtist(randomList[0].common.artist);
          socket.emit('client:getBufferSong', randomList[0].path);
        }
        setSongName(randomList[currentIndex+1].common.title);
        setArtist(randomList[currentIndex+1].common.artist);
        socket.emit('client:getBufferSong', randomList[currentIndex+1].path);

        setCurrentIndex(currentIndex+1);
        return;
      }
      if(currentIndex+1 > songsInfo.length) return;
      setSongName(songsInfo[currentIndex+1].common.title);
      setArtist(songsInfo[currentIndex+1].common.artist);
      socket.emit('client:getBufferSong', songsInfo[currentIndex+1].path);

      setCurrentIndex(currentIndex+1);
    }

    function prev(){
      if(currentIndex == 0) return;
      setSongName(songsInfo[currentIndex-1].common.title);
      setArtist(songsInfo[currentIndex-1].common.artist);
      socket.emit('client:getBufferSong', songsInfo[currentIndex-1].path);

      setCurrentIndex(currentIndex-1);
    }

    function rand(){
      const randList = makeRandomList(songsInfo, currentIndex);
      setRandom(!random);
      setRandomList(randList);
    }

    function repetir(){
      setRepeat(!repeat);
    }

    function stop(){
      audioRef.current.src = '';
      setCurrentIndex(-1);
    }

    function restart(){
      audioRef.current.currentTime = 0;
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

    return (
      <div>
        <audio 
          ref={audioRef}
          id='audio' 
          src={''}
          onTimeUpdate={updateTime}
          onEnded={next}
        ></audio>

        <Column reverse={false}>
          {
            songsInfo.map((m, index) => {
              return currentIndex === index
              ? <Card 
                  paused={audioRef.current.src != '' ? audioRef.current.paused : false}
                  key={'card-'+index}
                  index={index+1}
                  songName={m.common.title}
                  artist={m.common.artist}
                  active={true}
                  onClick={() => selectSong(m, index)}
                />
              : <Card 
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
          (audioRef.current != null) && (audioRef.current.src != '') && (audioRef.current.src != window.location)
          ? <Controls
              isPaused={ audioRef.current ? audioRef.current.paused : false }
              songName={ songName }
              artist={ artist }
              completeDuration={duration}
              currentDuration={currentDuration}
              max={audioRef.current ? audioRef.current.duration : 0}
              rangeValue={currentTime}
              length={songsInfo.length}
              currentIndex={currentIndex}
              onChange={handleSeek}
              pause={pause}
              next={next}
              prev={prev}
              random={random}
              repeat={repeat}
              setRandom={rand}
              setRepeat={repetir}
              stop={stop}
              restart={restart}
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

  console.log(randomArray);
  return randomArray;
}