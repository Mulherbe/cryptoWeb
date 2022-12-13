import './../assets/css/style.css';
import CardFlux from './home/CardFlux';
import CardCrpto2 from './home/CardListCrypto';
import CardUsers from './home/CardUser';
import SearchBar from './home/searchBar';

const Admin = () => {
  return (
    <>
      <div className='container_admin'>
          <div className='search'>
            <SearchBar/>
          </div>
          <div className='container_Card'>        
              <CardCrpto2 name='Liste Crypto : '></CardCrpto2>
              <CardFlux name='Flux RSS : ' nft='ㅤNFT' btc='ㅤBTC' eth='ㅤETH' actu='ACTU'> </CardFlux>
              <CardUsers name="Utilisateur :" ></CardUsers>
          </div>
      </div>
        
    </>
  ); }


export default Admin;