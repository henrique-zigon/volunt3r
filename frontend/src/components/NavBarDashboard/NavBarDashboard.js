import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { 
    BiLineChart, 
    BiCalendar, 
    BiChevronDown, 
    BiUser,
    BiAddToQueue,
    BiListOl,
    BiExit,
    BiLeftArrowAlt
} from 'react-icons/bi';
import './NavBarDashboard.css';
import avatarPadrao from '../../images/avatar_padrao.png';
import { useCookies } from 'react-cookie';


const NavBarDashboard = (props) => {

    let location = useLocation().pathname;
    const imageUser = props.userpic == null || props.userpic == " " ? avatarPadrao : props.userpic;
    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
    const history = useHistory();

    function sair() {
        removeCookie('volunt3r')
        removeCookie('volunt3r_user');
        setTimeout(() => {
          history.push("/");
        }, 1000)
      }

    return (

        <nav className="nav-bar-dashboard">
            <ul>
                <li>
                    <Link to="/dashboard" className={location === "/dashboard" ? "current" : ""}>
                        <BiLineChart size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link className={location === "/dashboard/eventos/" || location ==="/dashboard/eventos/criar-evento" ? "current" : ""}>
                        <BiCalendar size={20} />
                        <span>Eventos</span>
                        <BiChevronDown size={20} />
                        <ul className="nav-dropdown">

                            <li>
                                <Link to="/dashboard/eventos/criar-evento">
                                    <BiAddToQueue size={20} />
                                    <span>Criar Eventos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/eventos">
                                    <BiListOl size={20} />
                                    <span>Meus Eventos</span>
                                </Link>
                            </li>
                        </ul>
                    </Link>
                </li>

                <li>
                    <Link className={location === "/dashboard/gerencia-usuarios/criar-usuario" || location ==="/dashboard/gerencia-usuarios/usuarios" ? "current" : ""}>
                        <BiUser size={20} />
                        <span>Gerência dos Usuários</span>
                        <BiChevronDown size={20} />

                        <ul className="nav-dropdown">
                            <li>
                                <Link to="/dashboard/gerencia-usuarios/criar-usuario">
                                    <BiAddToQueue size={20} />
                                    <span>Criar Usuário</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/gerencia-usuarios/usuarios">
                                    <BiListOl size={20} />
                                    <span>Meus Usuários</span>
                                </Link>
                            </li>
                        </ul>
                    </Link>
                </li>
            </ul>

            <div className="user-logged">
                <img src={imageUser} alt={props.username} className="" />
                <ul className="dropdown-user-logged">
                    <li>
                        <Link to="/">
                            <BiLeftArrowAlt size={20} />
                            <span>Voltar ao feed</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={sair}>
                            <BiExit size={20} />
                            <span>Sair</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}


export default NavBarDashboard;
