import React from 'react';
import '../Styles/Card.css';
import ListeningIcon from './ListeningIcon';
import playImg from '../media/play.png'

const Card = ({ active, songName, artist, index, onClick, paused }) => {
    return (
        active 
        ? <div className="card-active card" onClick={onClick}>
            <div className="card-info">
                <div style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ListeningIcon paused={paused}/>
                </div>

                <div style={{ width: '90%', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column' }}>
                    <p className="song-name">{index}. {songName}</p>
                    <p className="text">{artist}</p>
                </div>
                
            </div>
        </div>  

        : <div className="card-inactive card" onClick={onClick}>
            <div className="card-info">
                <div style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={playImg} className='play-img'/>
                </div>

                <div style={{ width: '95%', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column' }}>
                    <p className="song-name">{index}. {songName}</p>
                    <p className="text">{artist}</p>
                </div>
            </div>
        </div>  
    )
}

export default Card