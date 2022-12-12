import React, { useEffect, useState } from 'react';
import { getActu } from '../../service/call_api/rss_service';
import '../../assets/css/style.css';
import bing_qui_lin from '../../assets/img/ads/bing_qui_lin.png';
import cybers from '../../assets/img/ads/cybers.png';
import fleurs from '../../assets/img/ads/fleurs.png';
import poutres from '../../assets/img/ads/poutres.png';
import sacs from '../../assets/img/ads/sacs.png';

import ReactLoading from 'react-loading';

const getAdvertise = () =>
{
  const ads = [bing_qui_lin, cybers, fleurs, poutres, sacs];
  // get a random variable from the list ads
  return ads[Math.floor(Math.random() * ads.length)];
}

const News_home = () =>
{
  const [actuTab, setActuTab] = useState();
  const [advertise, setAdvertise] = useState(getAdvertise());
  const [lock, setLock] = useState(true);

  function createActu()
  {
    getActu().then(response => setActuTab(
      Object.keys(response.data).map((key, index) =>
      {
        const date = new Date(response.data[key].date);
        const formatted = date.toLocaleDateString("fr-FR")
        return (
          <div key={index} className="container_Card_News" id="style-1">
            <a href={response.data[key].link} rel="noreferrer" target="_blank" className="card_News_Link">{response.data[key].title}</a>
            <br></br>
            <div className="date_style">
              {formatted}
            </div>
            <hr />
          </div>
        );
      }))
    );

  }

  useEffect(() =>
  {
    createActu();
    setInterval(() =>
    {
      setAdvertise(getAdvertise());
      if (actuTab && lock) setLock(false);
    }, 7000);
  }, [actuTab, lock]);

  if (!actuTab && !advertise)
    return (
      <div className="container_loading">
        <ReactLoading type="spin" color='#92d1fd' className="size_load" height={500} />
      </div>
    );
  if (!actuTab || lock)
    return (
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <img src={advertise} alt="loading" className="loading_img" style={{ width: '100%', cursor: 'pointer' }} onClick={() =>
        {
          var doc = document.createElement('a');
          doc.href = advertise;
          doc.target = '_blank';
          doc.click();
        }} />
      </div>
    );
  return (
    <>
      <div>
        {actuTab}
      </div>
    </>
  );
}


export default News_home;