import React , { useState } from 'react';
import './../assets/css/style.css';
// import bg from "../assets/img/bg.jpg"; 
import SearchBar from '../component/home/searchBar';
import {getUser} from '../service/call_api/user_service';

const Admin = () => {

  const [user , setUser] = useState({});
  
  const getUser = () => {
    getUser.then(response => setUser(response.data));
    console.log('users', setUser);
  }


  return (
    <>
      <div class="container_search">

      <div className='search'>
            <SearchBar/>
      </div>  
      <table>
        <colgroup span="4"></colgroup>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Is active</th>
        </tr>
          {user.map((user, index) => (
          <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>{user.isActive}</td>
          </tr>

          ))} 
      </table>
      </div>
  
    </>
  ); }


export default Admin;