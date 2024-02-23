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


const Controls = ({  }) => {
    return (
        <div className='controls'>
            <div className='controls-container'>

                <div className='song-info'>
                    <p className='song-name' style={{ marginTop: '10px' }}>{'songName'}</p>
                    <p>{'artist'}</p>
                </div>

                <div className='controles'>
                    <button onClick={()=>{}} className={'can-be-disable'}> <img src={randomIcon}/> </button>
                    <button onClick={()=>{}}> <img src={restartIcon}/> </button>

                    <button className={'inactive'} onClick={()=>{}}> <img src={prevIcon}/> </button>
                    <button onClick={()=>{}}> <img src={false ? playIcon : pauseIcon}/> </button>
                    <button className={'inactive'} onClick={()=>{}}> <img src={nextIcon}/> </button>
                    
                    <button onClick={()=>{}}> <img src={stopIcon}/> </button>
                    <button onClick={()=>{}} className={'can-be-disable'}> <img src={repeatIcon}/> </button>

                </div>
                
                <div className='time-container'>
                    <label>{ '0:00' }</label>
                    <input 
                        id="myRange" 
                        className="slider" 
                        value={50} 
                        max={100}
                        min="0" 
                        type="range"
                        step={1}
                        onChange={() => {}}
                    />
                    <label>{ "0:00" }</label>
                </div>

            </div>
        </div>
    )
}

export default Controls