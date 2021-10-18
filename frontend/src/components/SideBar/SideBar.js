import React, { useState } from 'react';
import avatarPadrao from '../../images/avatar_padrao.png';
import { Link, useLocation, useHistory } from 'react-router-dom';

import './sidebar.css';
import { useCookies } from 'react-cookie';
// import ItemSideBar from './ItemSideBar';

import {
  BiLineChart,
  BiExit,
  BiDetail,
  BiChevronDown,
  BiAddToQueue,
  BiUser,
  BiListUl
} from 'react-icons/bi';

const SideBar = props => {

  let location = useLocation().pathname;

  const imageUser = props.userpic == null ? avatarPadrao : props.userpic;
  const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
  const history = useHistory();


  const [openSubItem, setOpenSubItem] = useState("");

  function openSubItemSideBar() {
    if (openSubItem === "") {
      setOpenSubItem("open")
    } else {
      setOpenSubItem("")
    }

  }

  function sair() {
    removeCookie('volunt3r')
    removeCookie('volunt3r_user');
    setTimeout(() => {
      history.push("/");
    }, 1000)
  }

  return (
    <div className="sidebar">
      <header>

        <div className="userpic">
          <img
            src={imageUser}
            alt="Foto do usuário X"
          />
        </div>
        <Link className="exit-icon" onClick={sair}>
          <BiExit size={25} />
        </Link>
      </header>

      {/*       
      <span className="username">{props.username}</span>
      <span className="useremail">{props.useremail}</span> */}

      <div className="sidebar-itens">

        {/* <ItemSideBar title="Dashboard" currentLocation={location}/> */}


        <Link to="/dashboard" className="item">
          <div className="container-item">
            <div className="" className={location === "/dashboard" ? "principal-item current" : "principal-item"}>
              <div className="group">
                <BiLineChart className="icon" size={20} />
                <span>Dashboard</span>
              </div>
            </div>
          </div>
        </Link>

        <Link className="item">
          <div className="container-item">
            <div className="principal-item" onMouseEnter={openSubItemSideBar}>
              <div className="group">
                <BiUser className="icon" size={20} />
                <span>Gerência dos Usuários</span>
              </div>
              <BiChevronDown className="icon icon-left" size={20} />
            </div>
            <div className={`sub-itens ${openSubItem} `} >
              <Link to="/dashboard/gerencia-usuarios/criar-usuario" className="sub-item">
                <BiAddToQueue className="icon" size={20} />
                <span>Criar Usuário</span>
              </Link>

              <Link to="/dashboard/gerencia-usuarios/usuarios" className="sub-item">
                <BiListUl className="icon" size={20} />
                <span>Meus Usuários</span>
              </Link>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/relatorios" className="item">
          <div className="container-item">
            <div className="" className={location === "/dashboard/relatorios" ? "principal-item current" : "principal-item"}>
              <div className="group">
                <BiDetail className="icon" size={20} />
                <span>Relatórios</span>
              </div>
            </div>
          </div>
        </Link>



        {/* <Link to="/dashboard/relatorios" className={ location === "/dashboard/relatorios" ? "item current": "item" }>
          <div className="principal">
            <BiDetail className="icon" size={20} />
            <span>Relatórios</span>
          </div>
        </Link>
 */}


        {/* <Link to="/dashboard/relatorios" className={
          location === "/dashboard/relatorios" ? "item current": "item" 
        }>
          <BiDetail className="icon" size={20} />
          <span>Relatórios</span>
        </Link> */}

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
