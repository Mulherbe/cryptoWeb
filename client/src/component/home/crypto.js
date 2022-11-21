import React , { useEffect } from 'react';
import '../../assets/css/style.css';
import CardCrypto from './cardCrypto'


const Crypto = () => {

  return (
    <>
        <div className='container_Crypto' >
            <CardCrypto />
            <CardCrypto />
            <CardCrypto />
            <CardCrypto />
            <CardCrypto />
            <CardCrypto />

      </div>
    </>
  ); }


export default Crypto;