import React from 'react';

const Column = ({children, width = '100%', alignItems = 'center', justifyContent = 'center' , reverse = false,}) => {
    return (
        <div style={{
            display: 'flex',
            width: width || '100%',
            justifyContent: justifyContent || 'center',
            alignItems: alignItems || 'center',
            flexDirection: reverse ? 'column-reverse' : 'column'
        }}>{ children }</div>
    )
}

export default Column