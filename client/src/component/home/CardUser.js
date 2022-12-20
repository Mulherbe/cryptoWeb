import React , { useEffect, useState } from 'react';
import '../../assets/css/style.css';
import {getUser} from '../../service/call_api/user_service';


function CardUsers(props) {
  
  const [data, setData] = useState([]);
    useEffect(() => {
      getUser()
        .then((resp) => {
          if (data.length == 0) {
            setData(resp.data);
            console.log(resp.data);
          }
         
        })
      });

  return (
    <div className='container_CardUsers'>
      <h2> <u>{props.name}</u></h2>
    <table>
      <div className='container_Username-Email'>  
      <thead>
        <td>
          <div className='username-email' id="style-1">
          <h4>Username</h4>
            {data.map(item => (
              <li key={item.id}>{item.username}</li>
            ))}

          <h4>Email</h4>
            {data.map(item => (
              <li key={item.id}>{item.email}</li>
            ))}
          </div>
        </td>
      </thead>
      </div>
    </table>

    </div>
  )
}

export default CardUsers;