import React , { useState } from 'react';
import { render } from 'react-dom';
import '../../assets/css/style.css';


import News_home from './news_home';
import NewsNFT from './news_nft';
import NewsBTC from './news_BTC';
import NewsETH from './news_ETH';

function CardFlux(props) {
  render() 
    const [showCard, setShowCard] = useState(false); 
    
  return (
    <div className='container_CardAdmin'>
      <h2> <u>{props.name}</u></h2>
      <div className='container_button'>
        <button type="button" className="nav_button" onClick={() => setShowCard(true)} >{props.actu}</button>
        {showCard && <News_home />}
        <button type="button" className="nav_button">{props.btc}</button>
        <button type="button" className="nav_button">{props.eth}</button>
        <button type="button" className="nav_button">{props.nft}</button>
      </div>
      {/* <div className='container_tabFlux'>          
       {/* <table>
        <tr>
          <th> 
            <div class="container_news" id="style-1">

              <td><News_home/></td>
              {/* 
                <NewsNFT/> 
                <NewsBTC/>
                <NewsETH/>              
              


            </div>
          </th>
        </tr>
      </table> 
      </div> */}
    </div>  
    );
  }

export default CardFlux;