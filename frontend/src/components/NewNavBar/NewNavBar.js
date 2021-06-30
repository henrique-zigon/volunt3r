import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHomeAlt, BiShoppingBag, BiCalendarAlt, BiLineChart } from 'react-icons/bi';

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
            <span>feed</span>
          </Link>
        </li>
        <li className={
          location === "/shop" ? "li-current": "" 
        }>
          <Link to="/shop" className="linkagem">
            <BiShoppingBag />
            <span>loja</span>
          </Link>
        </li>
        <li className={
          location === "/catalog" ? "li-current": "" 
        }>
          <Link to="/catalog" className="linkagem">
            <BiCalendarAlt />
            <span>eventos</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="linkagem">
            <BiLineChart />
            <span>dashboard</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NewNavBar;