import React , { useEffect } from 'react';
import './../assets/css/style.css';
// import bg from "../assets/img/bg.jpg"; 
import SearchBar from '../component/home/searchBar';


const Admin = () => {


  return (
    <>
      <div class="container">

      <div className='search'>
            <SearchBar/>
      </div>  

      </div>
  
    </>
  ); }


export default Admin;