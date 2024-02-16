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

    // useEffect
    useEffect(() => {
      socket.emit('client:getSongsInfo')
    }, []);

    useEffect(() => {
        if(audioURL != '') { 
          audioRef.current.src = audioURL;
          audioRef.current.play() 
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
    function selectSong(songInfo){
      socket.emit('client:getBufferSong', songInfo.path);
    }

    function updateTime(){
      //console.log(audioRef.current.currentTime);
    }

    function pause(){
    }

    function next(){
    }

    function prev(){
    }

    return (
      <div>
        <audio 
          ref={audioRef}
          id='audio' 
          src={''}
          onTimeUpdate={updateTime}
        ></audio>

        <Column reverse={false}>
          {
            songsInfo.map((m, index) => {
              return currentIndex === index
              ? <Card 
                  key={'card-'+index}
                  index={index+1}
                  songName={m.common.title}
                  artist={m.common.artist}
                  active={true}
                  onClick={() => selectSong(m)}
                />
              : <Card 
                  key={'card-'+index}
                  index={index+1}
                  songName={m.common.title}
                  artist={m.common.artist}
                  active={false}
                  onClick={() => selectSong(m)}
                />
            }
              
            )
          }

        </Column>

        <Controls
          isPaused={true}
          songName={''}
          artist={''}
          completeDuration={convertirSegundosAFormato(audioRef.current, 'duration')}
          currentDuration={convertirSegundosAFormato(audioRef.current, 'currentTime')}
          max={''}
          rangeValue={''}
          length={''}
          currentIndex={0}
          onChange={() => {}}
          pause={pause}
          next={next}
          prev={prev}
        />

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

function convertirSegundosAFormato(audio, key) {
  if(audio === null) return '0:00';
  const s = audio[key];
  console.log(s);
  const segundos = parseInt(s);
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
  const segundosFormateados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
  return `${minutosFormateados}:${segundosFormateados}`;
}