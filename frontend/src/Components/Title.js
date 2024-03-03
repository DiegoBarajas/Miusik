import React from 'react';
import '../Styles/Title.css';
import CircleButton from './CircleButton';
import RandomImg from '../media/aleatorio.png';
import PlayImg from '../media/play.png';

const Title = () => {
    return (
        <div>
            <div className="background">
                <div className='background-container'>
                    <h1>Miusik</h1>
                    <p><b>Created by:</b> Diego Barajas</p>
                </div>
            </div>

            <div className='circle-buttons-container'>
                <CircleButton height='60%' width='60%' img={PlayImg} main={true}>Empezar reproducción</CircleButton>
                <CircleButton img={RandomImg}>Activar modo aleatorio</CircleButton>
            </div>

        </div>
    )
}

export default Title