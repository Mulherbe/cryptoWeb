import React , { useEffect, useState } from 'react';
import {getActu} from '../../service/call_api/rss_service';
import '../../assets/css/style.css';


const News_home = () => {

  const [actuTab, setActuTab] = useState();
  
const  createActu  = () => {
    getActu().then(response=>setActuTab(
      Object.keys(response.data).map((key, index) => {
      return (
        <div key={index}>
          {console.log(response.data[key].title)}
         <a href={response.data[key].link} target="_blank">{response.data[key].title} 

          </a> 
          <hr />
        </div>
      );
    }))
  )
    
  }

  
  useEffect(() => {
    createActu()
  }, []);

  return (
    <>
        <div>
          {actuTab}
      </div>
    </>
  ); }


export default News_home;