import React , { useEffect, useState } from 'react';
import {getActu} from '../../service/call_api/rss_service';
import '../../assets/css/style.css';


const News_home = () => {

  const [actuTab, setActuTab] = useState();
  const [dateFr, setDateFr] = useState();

  function createActu() {
    getActu().then(response => setActuTab(
      Object.keys(response.data).map((key, index) => {
        console.log(response.data[key].date.toString())
        return (
          <div key={index}>
            <a href={response.data[key].link} target="_blank">{response.data[key].title}
            </a>
            {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(response.data[key].date)}
            <hr />
          </div>
        );
      }))
    );

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