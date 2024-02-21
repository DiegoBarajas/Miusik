import React from 'react';
import '../Styles/ListeningIcon.css';

const ListeningIcon = ({paused}) => {
    return (
        <div className={paused ? 'loader paused' : 'loader'}></div>
    )
}

export default ListeningIcon