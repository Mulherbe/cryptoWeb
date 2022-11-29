import React , { useEffect, useState } from 'react';
import '../../assets/css/style.css';
import { MiniChart } from "react-ts-tradingview-widgets";


const CardCrypto = (props) => {
        const [pass, setPass] = useState('1');

const cryptoDetails = () => {
  var iframevar = document.getElementById('minichart');
  var child = iframevar.getElementsByTagName( 'div' )[0];
  var child2 = child.getElementsByTagName( 'div' )[0];
  var child3 = child2.getElementsByTagName( 'div' )[0];
  var child4 = child3.getElementsByTagName( 'iframe' )[0];
   var elmnt = child4.contentWindow.document.getElementById("mini-symbol-overview");

  console.log(elmnt)
}

let cryptoSymbol = 'BINANCE:' + props.crypto.replace('/', '')

  return (
    <>

        <div className='container_CardCrypto'>
          <div class="click_test"  onClick={cryptoDetails} >
          </div>
          <div id="minichart">
            <MiniChart symbol={cryptoSymbol}
             colorTheme="light"  isTransparent="true" width="100%"></MiniChart>
          </div>
          <div   onClick={cryptoDetails} >
            test
          </div>
      </div>
    </>
  ); }


export default CardCrypto;