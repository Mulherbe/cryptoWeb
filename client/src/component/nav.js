import React , { useEffect } from 'react';
import './../assets/css/style.css';
import logo from './../assets/img/logo.png'; 
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';


const Nav = () => {


  return (
    <>
        <div className="nav_container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <div className="nav_link">
          <Link className="nav_item" to="/">Acceuil</Link>
          <Link  className="nav_item"  to="/news">News</Link> 
          <Link   className="nav_item" to="/profil">Profil</Link> 
          <Link   className="nav_item" to="/admin">Admin</Link> 
        </div>
      </div>
    
    </>
  ); }


export default Nav;