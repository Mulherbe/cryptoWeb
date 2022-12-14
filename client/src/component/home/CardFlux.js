// import React , { useEffect } from 'react';
import '../../assets/css/style.css';

import News_home from './news_home';
import NewsNFT from './news_nft';
import NewsBTC from './news_BTC';
import NewsETH from './news_ETH';

function CardFlux(props) {
 
  return (
    <div className='container_CardAdmin'>
      <h2> <u>{props.name}</u></h2>
      <div className='container_button'>
        <button type="button" className="nav_button" >{props.actu}</button>
        <button type="button" className="nav_button">{props.btc}</button>
        <button type="button" className="nav_button">{props.eth}</button>
        <button type="button" className="nav_button">{props.nft}</button>
      </div>
      <div className='container_tabFlux'>          
      <table>
        <tr>
          <th> 
            <div class="container_news" id="style-1">
              <td><NewsETH/></td>
              {/* <NewsNFT/> */}


            </div>
          </th>
        </tr>
      </table>
      </div>
    </div>  
    )

}

export default CardFlux;