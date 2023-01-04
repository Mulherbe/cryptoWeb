import React , { useEffect,useState } from 'react';
import '../../assets/css/style.css';
import {getCryptoFav} from '../../service/call_api/crypto_service';
import { BiEdit, BiCheck} from "react-icons/bi";


const CardListCrypto = () => {
  const [cryptoList, setACryptoList] = useState();
  const [edit, setEdit] = useState(true);
  const [EditListCrypto, setEditListCrypto] = useState();
  const editCrypto = () => {
      setEdit(!edit)  
      console.log(edit)
  }
  
  function getCrypto() {
    getCryptoFav().then(response => setACryptoList(
      Object.keys(response.data).map((key, index) => {
        return (
          <div className="text_row_profil2"> {response.data[key].pair}</div>
        );
      })
      ) +
      setEditListCrypto(
        Object.keys(response.data).map((key, index) => {
          return (
            <input 
              value={response.data[key].pair}       
              type="text" 
              name="name"
              className='inputCrypto' />
          );
        })
        )
    )
  }
  
  useEffect(() => {
    getCrypto()
  }, []);
  return (
    <>
    <div className='container_CardAdmin2'>

        {edit  ? cryptoList :   
          EditListCrypto
        }
      {edit  ?         
        <button   onClick={editCrypto}>
          Edit
        </button> :   
          <button   onClick={editCrypto}>
            Valider
          </button>
        }
      </div>
    </>
  ); }


export default CardListCrypto;
