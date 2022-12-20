import React , { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/style.css';
import {getUser} from '../../service/call_api/user_service';


function CardUsers(props) {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    getUser()
      .then((resp) => {
        if (resp.data) {
          this.setState({ data: resp.data});
          console.log(resp.data);
        }
      })
    });

  return (
    <div className='container_CardUsers'>
      <h2> <u>{props.name}</u></h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>

    </div>
  )
}

export default CardUsers;