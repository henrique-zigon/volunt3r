import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { BiLineChart, BiExit, BiDetail, BiCalendar } from 'react-icons/bi';
import avatarPadrao from '../../images/avatar_padrao.jpg';
import { Cookies } from 'react-cookie';

import './sidebar.css';
import { useCookies } from 'react-cookie';

const SideBar = props => {

  let location = useLocation().pathname;

  const imageUser = props.userpic == null ? avatarPadrao : props.userpic;
  const [cookies, setCookie, removeCookie]= useCookies(['volunt3r', 'volunt3r_user']);
  const history =  useHistory();

  function sair() {
    removeCookie('volunt3r')
    removeCookie('volunt3r_user');
    setTimeout(() => {
      history.push("/");
    }, 1000)
  }

  return (
    <div className="sidebar">

      <Link className="exit-icon" onClick={sair}>
        <BiExit size={ 25 } />
      </Link>

      <div className="userpic">
        <img
          src={imageUser}
          alt="Foto do usuário X"
        />
      </div>
      <span className="username">{props.username}</span>
      <span className="useremail">{props.useremail}</span>

      <div className="sidebar-itens">
        <Link to="/dashboard" className={
          location === "/dashboard" ? "item current": "item" 
        }>
          <BiLineChart className="icon" size={20} />
          <span>Dashboard</span>
        </Link>

        <Link to="/dashboard/relatorios" className={
          location === "/dashboard/relatorios" ? "item current": "item" 
        }>
          <BiDetail className="icon" size={20} />
          <span>Relatórios</span>
        </Link>

        {/* <Link to="/dashboard/criar-eventos" className={
          location === "/dashboard/criar-eventos" ? "item current": "item" 
        }>
          <BiCalendar className="icon" size={20} />
          <span>Criar Eventos</span>
        </Link> */}
      </div>
    </div>
  );
}

export default SideBar;