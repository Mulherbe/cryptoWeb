import React , { useEffect } from 'react';
import '../../assets/css/style.css';
import CardAdmin from './cardAdmin'

const AdminP = (props) => {

  return (
    <>
        <div className='container_Admin'>
          <CardAdmin name='Filtre : ' ></CardAdmin>
          <CardAdmin name='Flux : ' ></CardAdmin>
          <CardAdmin name='Liste crypto : '></CardAdmin>
          <CardAdmin name='Liste utilisateur : '></CardAdmin>
        </div>
    </>
  ); }


export default AdminP;