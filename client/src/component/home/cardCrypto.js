import React , { useEffect, useState } from 'react';
import '../../assets/css/style.css';
import { MiniChart } from "react-ts-tradingview-widgets";

const CardCrypto = (props) => {
        const [pass, setPass] = useState('1');


let cryptoSymbol = 'BINANCE:' + props.crypto.replace('/', '')

  return (
    <>

        <div className='container_CardCrypto'>
          {/* <div class="click_test"  onClick={cryptoDetails} >
          </div> */}
          <div id="minichart">
            <MiniChart 
              symbol={cryptoSymbol}
              trendLineColor="rgba(0, 0, 0, 0.7)"
              isTransparent="black"
              underlineColor="rgba(41, 255, 255, 0.3)"
              underLineBottomColor="black"
              dateRange="1D"
               width="100%"></MiniChart>
                          
          </div>

      </div>
    </> 
  ); }


export default CardCrypto;