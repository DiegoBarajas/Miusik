import React from 'react';
import '../Styles/Loader.css';

const Loader = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <div class="loading">
                <div class="loading-square"></div>
                <div class="loading-square"></div>
                <div class="loading-square"></div>
                <div class="loading-square"></div>
                <div class="loading-square"></div>
                <div class="loading-square"></div>
                <div class="loading-square"></div>
            </div>

            <p style={{ color: 'white' }}><b>Obteniendo musica del servidor...</b></p>
        </div>
    )
}

export default Loader