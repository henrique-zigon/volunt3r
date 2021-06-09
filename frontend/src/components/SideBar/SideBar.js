import React from 'react';
import { Link } from 'react-router-dom';
import { BiLineChart, BiExit  } from 'react-icons/bi';

import './sidebar.css';

const SideBar = props => {
  return (
    <div className="sidebar">

      <Link className="exit-icon">
        <BiExit size={ 25 } />
      </Link>

      <div className="userpic">
        <img
          src={props.userpic}
          alt="Foto do usuário X"
        />
      </div>
      <span className="username">{props.username}</span>
      <span className="useremail">{props.useremail}</span>

      <div className="sidebar-itens">
        <Link to="/dashboard" className="item current">
          <BiLineChart className="icon" size={20} />
          <span>Dashboard</span>
        </Link>

        <Link className="item">
          <BiLineChart className="icon" size={20} />
          <span>Relatórios</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;