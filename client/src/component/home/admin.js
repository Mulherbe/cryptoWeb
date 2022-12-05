import React , { useEffect} from 'react';
import '../../assets/css/style.css';
import CardAdmin from './cardAdmin';
import SearchBar from './searchBar';
// import logo from '../../assets/img/logo.png';
import Dark from './dark.js';


const Admin = () => {
  return (
    <>
          <Dark></Dark>
          <div className='search'>
            <SearchBar/>
          </div>        
          <CardAdmin name='Liste Crypto : ' ></CardAdmin>
          <div className='container_flux'>
              <CardAdmin name='Flux RSS : ' nft='NFT' btc='BTC' eth='ETH' actu='ACTU'> </CardAdmin>
          </div>
          <CardAdmin name="Utilisateur :" ></CardAdmin>
          {/* <CardAdmin ></CardAdmin> */}
        
    </>
  ); }


export default Admin;