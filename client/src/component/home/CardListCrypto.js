import React , { useEffect } from 'react';
import '../../assets/css/style.css';

function CardListCrypto(props) {
 
  return (
    <div className='container_CardAdmin'>
      <h2> <u>{props.name}</u></h2>
    </div>
  )
}

export default CardListCrypto;