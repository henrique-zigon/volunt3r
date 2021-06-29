import React from 'react';
import { BiHomeAlt, BiShoppingBag, BiCalendarAlt, BiLineChart } from 'react-icons/bi';

import './newNavBar-style.css';

const NewNavBar = () => {
  return (
    <nav className="new-navbar">
      <ul>
        <li className="li-current">
          <BiHomeAlt />
          <span>feed</span>
        </li>
        <li>
          <BiShoppingBag />
          <span>loja</span>
        </li>
        <li>
          <BiCalendarAlt />
          <span>eventos</span>
        </li>
        <li>
          <BiLineChart />
          <span>dashboard</span>
        </li>
      </ul>
    </nav>
  );
}

export default NewNavBar;