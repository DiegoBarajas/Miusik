import React from 'react';
import '../Styles/Controls.css';
import playIcon from '../media/plei.png';
import pauseIcon from '../media/pausa.png';
import prevIcon from '../media/prev.png';
import nextIcon from '../media/next.png';

const Controls = ({ length, currentIndex, isPaused, currentDuration, completeDuration, rangeValue, songName, artist, max, onChange, pause, prev, next }) => {
    return (
        <div className='controls'>
            <div className='controls-container'>

                <div className='song-info'>
                    <p className='song-name'>{songName}</p>
                    <p>{artist}</p>
                </div>

                <div className='controles'>
                    <button className={currentIndex === 0 ? 'inactive' : ''} onClick={currentIndex === 0 ? () => {} : prev}> <img src={prevIcon}/> </button>
                    <button onClick={pause}> <img src={isPaused ? playIcon : pauseIcon}/> </button>
                    <button className={currentIndex+1 ===length ? 'inactive' : ''} onClick={currentIndex+1 ===length ? () => {} : next}> <img src={nextIcon}/> </button>

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