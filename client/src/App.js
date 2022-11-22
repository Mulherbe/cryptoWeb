import logo from './logo.svg';
import './App.css';
import Nav from './component/nav'
import Home from './component/home/home'
import News from './component/home/news'
import Profil from './component/profil'
import Admin from './component/admin'


import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div >
       <Nav /> 
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="profil" element={<Profil />} />
        <Route path="admin" element={<Admin />} />
    </Routes>
    </div>
  );
}

export default App;
