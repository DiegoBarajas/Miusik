import React from 'react';
import '../Styles/Card.css';

const Card = ({ active }) => {
    return (
        active 
        ? <div className="card-active card">
            <div className="card-active-info">
                <p className="title">Magic Card</p>
            </div>
        </div>  

        : <div className="card-inactive card">
            <div className="card-inactive-info">
                <p className="title">Magic Card</p>
            </div>
        </div>  
    )
}

export default Card