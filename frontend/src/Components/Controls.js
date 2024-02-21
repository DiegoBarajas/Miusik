import React from 'react';
import '../Styles/Controls.css';
import playIcon from '../media/plei.png';
import pauseIcon from '../media/pausa.png';
import prevIcon from '../media/prev.png';
import nextIcon from '../media/next.png';
import stopIcon from '../media/parada.png'
import randomIcon from '../media/aleatorio.png'
import repeatIcon from '../media/repetir.png'
import restartIcon from '../media/reiniciar.png';


const Controls = ({ length, currentIndex, isPaused, currentDuration, completeDuration, rangeValue, songName, artist, max, onChange, pause, prev, next, random, repeat, setRandom, setRepeat, stop, restart }) => {
    return (
        <div className='controls'>
            <div className='controls-container'>

                <div className='song-info'>
                    <p className='song-name' style={{ marginTop: '10px' }}>{songName}</p>
                    <p>{artist}</p>
                </div>

                <div className='controles'>
                    <button onClick={setRandom} className={random ? '' : 'can-be-disable'}> <img src={randomIcon}/> </button>
                    <button onClick={restart}> <img src={restartIcon}/> </button>

                    <button className={currentIndex === 0 ? 'inactive' : ''} onClick={currentIndex === 0 ? () => {} : prev}> <img src={prevIcon}/> </button>
                    <button onClick={pause}> <img src={isPaused ? playIcon : pauseIcon}/> </button>
                    <button className={currentIndex+1 ===length ? 'inactive' : ''} onClick={currentIndex+1 ===length ? () => {} : next}> <img src={nextIcon}/> </button>
                    
                    <button onClick={stop}> <img src={stopIcon}/> </button>
                    <button onClick={setRepeat} className={repeat ? '' : 'can-be-disable'}> <img src={repeatIcon}/> </button>

                </div>
                
                <div className='time-container'>
                    <label>{ currentDuration }</label>
                    <input 
                        id="myRange" 
                        className="slider" 
                        value={rangeValue} 
                        max={max}
                        min="0" 
                        type="range"
                        step={1}
                        onChange={onChange}
                    />
                    <label>{ completeDuration }</label>
                </div>

            </div>
        </div>
    )
}

export default Controls