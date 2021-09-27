import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHomeAlt, BiShoppingBag, BiCalendarAlt, BiLineChart, BiUser } from 'react-icons/bi';

import './newNavBar-style.css';

const NewNavBar = () => {
  let location = useLocation().pathname;

  return (
    <nav className="new-navbar">
      <ul>
        <li className={
          location === "/" ? "li-current": "" 
        }>
          <Link to="/" className="linkagem">
            <BiHomeAlt />
            <span>Feed</span>
          </Link>
        </li>
        
        <li className={
          location === "/catalog" ? "li-current": "" 
        }>
          <Link to="/catalog" className="linkagem">
            <BiCalendarAlt />
            <span>Eventos</span>
          </Link>
        </li>

        <li className={
          location === "/shop" ? "li-current": "" 
        }>
          <Link to="/shop" className="linkagem">
            <BiShoppingBag />
            <span>Loja</span>
          </Link>
        </li>
        
        <li className={
          location === "/perfil" || location === "/perfil-conquistas" ? "li-current": "" 
        }>
          <Link to="/perfil" className="linkagem">
            <BiUser />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="linkagem">
            <BiLineChart />
            <span>Dashboard</span>
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default NewNavBar;