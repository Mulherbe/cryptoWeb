import React , { useState } from 'react';
import '../../assets/css/style.css';


import NewsActu from './news_Actu';
import NewsNFT from './news_NFT';
import NewsBTC from './news_BTC';
import NewsETH from './news_ETH';

const CardFlux = (props) => {

  const [actuActive, setActuActive] = useState(false); 
  const [nftActive, setnftActive] = useState(false);
  const [btcActive, setbtcActive] = useState(false); 
  const [ethActive, setethActive] = useState(false); 

  function printFlux() {
    setActuActive(!actuActive)
    setnftActive(!nftActive)
    setbtcActive(!btcActive)
    setethActive(!ethActive)
  }
    
  return (
    <div className='container_CardAdmin'>
      <h2><u>{props.name}</u></h2>
      <div className='container_button'>
        <button type="button" className="nav_button" onClick={() => printFlux()} >{props.actu}</button>
        <button type="button" className="nav_button" onClick={() => printFlux()} >{props.btc} </button>
        <button type="button" className="nav_button" onClick={() => printFlux()} >{props.eth}</button>
        <button type="button" className="nav_button" onClick={() => printFlux()} >{props.nft}</button>
      </div>
      <div className='container_tabFlux'>          
       <table>
        <tr>
          <th> 
            <div id="style-1">
              {actuActive && <td><NewsActu/></td>}
              {nftActive && <td><NewsNFT/> </td>}
              {btcActive && <td><NewsBTC/></td>}
              {ethActive && <td><NewsETH/></td>}
            </div>
          </th>
        </tr>
      </table> 
      </div> 
    </div>  
    );
  }

export default CardFlux;