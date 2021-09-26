import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHomeAlt, BiShoppingBag, BiCalendarAlt, BiLineChart, BiUser } from 'react-icons/bi';

import './newNavBar-style.css';
import { useCookies } from 'react-cookie';

const NewNavBar = () => {
  let location = useLocation().pathname;

  const [cookies_user] = useCookies(['volunt3r_user']);

  let tipoUsuario = cookies_user.volunt3r_user.tipoUsuario;

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
          location === "/shop" ? "li-current": "" 
        }>
          <Link to="/shop" className="linkagem">
            <BiShoppingBag />
            <span>Loja</span>
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
          location === "/perfil" ? "li-current": "" 
        }>
          <Link to="/perfil" className="linkagem">
            <BiUser />
            <span>Perfil</span>
          </Link>
        </li>

        {
          tipoUsuario === "b3_social" ? <li> <Link to="/dashboard" className="linkagem"> <BiLineChart /> <span>Dashboard</span> </Link></li> : ""
        }
        
        
      </ul>
    </nav>
  );
}

export default NewNavBar;