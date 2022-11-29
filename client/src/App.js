import React, { useState } from "react";
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.css';
import Nav from './component/nav'
import Home from './component/home/home'
import News from './component/news'
import Profil from './component/profil'
import Admin from './component/admin'
import Login from './component/login'
import Register from './component/register'

function App() {

  return (
    <div >
       <Nav /> 
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="profil" element={<Profil />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

    </Routes>
    </div>
  );
}

export default App;
