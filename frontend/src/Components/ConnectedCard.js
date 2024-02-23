import React from 'react';
import '../Styles/ConnectedCard.css';

const ConnectedCard = ({children, green=false, active=1}) => {
    if(active == 1) 
      return  <div class={`connected-card ${green ? 'green' : ''}`}>
                  <span></span>
                  <div class="connected-content">{children}</div>
              </div> 

    else return <></>
}

export default ConnectedCard