import React , { useEffect } from 'react';
import './../assets/css/style.css';
import {getUser} from '../service/call_api/user_service';

const News = () => {

    const getNew = ()=> {
        
}
 useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getUser();
    console.log(getUser());
    console.log(1234)
  });

  return (
    <>
        <div className="container">
      

      </div>
  
    </>
  ); }


export default News;