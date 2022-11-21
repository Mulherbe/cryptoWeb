import logo from './logo.svg';
import './App.css';
import Nav from './component/nav'
import Home from './component/home'
import News from './component/news'
import Profil from './component/profil'

import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div >
       <Nav /> 
      <Routes>
        
        <Route path="" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="profil" element={<Profil />} />
    </Routes>
    </div>
  );
}

export default App;
