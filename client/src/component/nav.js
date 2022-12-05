import React , { useEffect } from 'react';
import './../assets/css/style.css';
import logo from './../assets/img/logo.png'; 
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { TickerTape } from "react-ts-tradingview-widgets";
// import Dark from '../component/home/dark.js';
  

const Nav = () => {


  return (
    <>
    <div>

    <TickerTape colorTheme="LIGHT" symbols={[    
            {
          "proName": "BINANCE:BTCUSD",
          "title": "BTC/USD"
        },
        {
          "proName": "BINANCE:ETHUSD",
          "title": "ETH/USD"
        },
        {
          "proName": "BINANCE:XRPUSD",
          "title": "XRP/USD"
        },
        {
          "proName": "BINANCE:BNBUSD",
          "title": "BNB/USD"
        },
        {
          "proName": "BINANCE:DOGEUSD",
          "title": "DOGE/USD"
        },
        {
          "proName": "BINANCE:ADAUSD",
          "title": "ADA/USD"
        },
        {
          "proName": "BINANCE:MATICUSD",
          "title": "MATIC/USD"
        },

        ]}></TickerTape>
    </div>

        <div className="nav_container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <div className="nav_link">
          <Link className="nav_item" to="/">Acceuil</Link>
          {/* <Link  className="nav_item"  to="/news">News</Link>  */}
          <Link   className="nav_item" to="/profil">Profil</Link> 
          <Link   className="nav_item" to="/admin">Admin</Link> 
          <Link   className="nav_item" to="/register">Register</Link> 
          <Link   className="nav_item" to="/login">Login</Link> 
          {/* <div className="nav_item"> <Dark></Dark> </div> */}
          {/* <Dark></Dark> */}

        </div>
      </div>
    
    </>
  ); }


export default Nav;

