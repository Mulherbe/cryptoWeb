import React , { useEffect } from 'react';
import '../../assets/css/style.css';
import Crypto from './crypto'
import News_home from './news_home'

const Home = () => {

  return (
    <>
        <div class="container">
          <div class="container_home">
            <div class="container_crypto">
              <Crypto />
            </div>
            <div class="container_news">
              <News_home />
            </div>
          </div>
      </div>
    </>
  ); }


export default Home;