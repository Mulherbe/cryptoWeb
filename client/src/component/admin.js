import React , { useEffect} from 'react';
import './../assets/css/style.css';
import CardFlux from './home/CardFlux';
import CardCrpto2 from './home/CardListCrypto';
import SearchBar from './home/searchBar';
// import logo from '../../assets/img/logo.png';

const Admin = () => {
  return (
    <>
          <div className='search'>
            <SearchBar/>
          </div>        
          <div className='container_admin'>
              {/* <CardAdmin name='Liste Crypto : ' ></CardAdmin> */}
              <CardCrpto2 name='Liste Crypto'></CardCrpto2>
              <CardFlux name='Flux RSS : ' nft='ㅤNFT' btc='ㅤBTC' eth='ㅤETH' actu='ACTU'> </CardFlux>
          
          {/* <CardAdmin name="Utilisateur :" ></CardAdmin> */}
          {/* <CardAdmin ></CardAdmin> */}
          </div>
        
    </>
  ); }


export default Admin;