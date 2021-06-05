import React from 'react';
import "../css/navBar-style.css";
import imgLike from "../../images/heart.png";
import imgNotification from "../../images/notification.png";
import img1 from "../../images/imagem1.jpg";
import imgSearch from "../../images/search.png";
import imgMenu from '../../images/menu.png';

const NavBar = props => {
    return (
        <header className="navbar">
            <nav className="navbar-navigation">
                <div className="volunter-info">
                    <div> <img className="navbar-logo" src={imgLike}></img></div>
                    <div className="navbar-title"> Volunt3r</div>
                </div>
                <div className="navbar-navigation-items">
                    <ul>
                        <div className="navbar-navigation">
                            <li className="navbar-menu-icon"><img src={imgMenu} className="icons"></img></li>
                        </div>
                    </ul>
                </div>
                <div className="spacer">
                    <li className="search-icon">
                        <input type="search" placeholder="Pesquise por seu interesse"></input>
                        <img src={imgSearch} className="icons"></img>
                    </li>
                </div>

                <div className="navbar-navigation-items">
                    <ul>

                        <div className="navbar-navigation">
                            <div className="navbar-logos">
                                <li><a href="/" ><img className="navbar-logo" src={imgNotification} href="/"></img></a></li>
                                <li className="user"><a href="/perfil"> <img className="navbar-logo" src={img1}></img></a></li>
                            </div>
                            <li className="navbar-user"><a href="/perfil">Bom te ver, {props.username}</a></li>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;