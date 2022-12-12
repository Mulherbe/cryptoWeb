import React , { useEffect } from 'react';
import '../../assets/css/style.css';
// import News_admin from './news_actu';

function CardFlux(props) {
 
  return (
    <div className='container_CardAdmin'>
      <h2> <u>{props.name}</u></h2>
      <div className='container_button'>
        <button className="nav_button" to="/flux">{props.actu}</button>
        <button className="nav_button">
          {props.btc} 
        </button>
        <button className="nav_button">
          {props.eth} 
        </button>
        <button className="nav_button" to="/flux">{props.nft}</button>
      </div>
    </div>
  )
}

export default CardFlux;