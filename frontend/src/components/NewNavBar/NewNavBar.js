import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { 
    BiHomeAlt, 
    BiLineChart, 
    BiShoppingBag, 
    BiCalendar,
    BiLeftArrowAlt,
    BiExit,
    BiUser
} from 'react-icons/bi';

import './NewNavBar.css';
import avatarPadrao from '../../images/avatar_padrao.png';
import { useCookies } from 'react-cookie';


const NewNavBar = (props) => {

    let location = useLocation().pathname;

    const imageUser = props.userpic == null || props.userpic == " " ? avatarPadrao : props.userpic;
    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
    const history = useHistory();
    let tipoUsuario = cookies.volunt3r_user.tipoUsuario;


    function sair() {
        removeCookie('volunt3r')
        removeCookie('volunt3r_user');
        setTimeout(() => {
          history.push("/");
        }, 1000)
      }

    return (

        <nav className="nav-bar-feed">
            <ul>
                <li>
                    <Link to="/" className={location === "/" ? "current" : ""}>
                        <BiHomeAlt size={20} />
                        <span>Feed</span>
                    </Link>
                </li>

                <li>
                    <Link to="/eventos" className={
                        location === "/eventos" ? "current": "" 
                    }>
                        <BiCalendar size={20} />
                        <span>Eventos</span>          
                    </Link>
                </li>

                <li>
                    <Link to="/shop" className={
                        location === "/shop" ? "current": "" 
                    }>
                        <BiShoppingBag size={20} />
                        <span>Loja</span>
                    </Link>
                </li>
                {
                 tipoUsuario === "b3_social" ?

                    <li>
                        <Link to="/dashboard" className={
                            location === "/dashboard" ? "current": "" 
                        }>
                            <BiLineChart size={20} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    : ""
                }
               
            </ul>
            <div className="user-logged">
                <img src={imageUser} alt={props.username} className="" />
                <ul className="dropdown-user-logged">
                    <li>
                        <Link to="/perfil">
                            <BiUser size={20} />
                            <span>Meu Perfil</span>
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


export default NewNavBar;
