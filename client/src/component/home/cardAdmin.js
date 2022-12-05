import React , { useEffect } from 'react';
import '../../assets/css/style.css';
import { Link } from 'react-router-dom';
import News_admin from './news_actu';

function CardAdmin(props) {
 
  return (
    <div className='container_CardAdmin'>
      <h2> <u>{props.name}</u></h2>
      <div className='container_button'>
        <Link className="nav_button" to="/flux">{props.actu}</Link>
        <button className="nav_button">
          {props.btc} 
        </button>
        <button className="nav_button">
          {props.eth} 
        </button>
        <Link className="nav_button" to="/flux">{props.nft}</Link>
      </div>
    </div>
  )
}

export default CardAdmin;