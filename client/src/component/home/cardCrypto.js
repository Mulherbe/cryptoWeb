import React , { useEffect } from 'react';
import '../../assets/css/style.css';
import { MiniChart } from "react-ts-tradingview-widgets";


const CardCrypto = () => {

const cryptoDetails = () => {
console.log('toto')}

  return (
    <>

        <div className='container_CardCrypto'>
        <div class="click_test"  onClick={cryptoDetails} >

</div>
            <div>
            <MiniChart symbol="BINANCE:BTCUSD"
             colorTheme="light"  isTransparent="true" width="100%"></MiniChart>

              </div>
      </div>
    </>
  ); }


export default CardCrypto;