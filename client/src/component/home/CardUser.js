import React , { useEffect } from 'react';
import '../../assets/css/style.css';

function CardUsers(props) {
 
  return (
    <div className='container_CardUsers'>
      <h2> <u>{props.name}</u></h2>
    </div>
  )
}

export default CardUsers;