import React from 'react';
import "../css/navBar-style.css";
import imgLike from "../../images/heart.png";
import imgNotification from "../../images/notification.png";
import img1 from "../../images/imagem1.jpg";
import imgSearch from "../../images/search.png";
import imgMenu from '../../images/menu.png';
import imgCancel from '../../images/cancel.png';

const NavBar = props => {
    return (
        <header className="navbar">
            <nav className="navbar-navigation">
                <div className="volunter-info">
                    <div> <img className="navbar-logo" src={imgLike} /></div>
                    <div className="navbar-title"> Volunt3r</div>
                </div>
                <div className="navbar-navigation-items">
                    <ul>
                        <div className="navbar-navigation">
                            <li className="navbar-menu-icon" id="menu"><img src={imgMenu} className="icons" onClick={() => {                           
                                document.querySelector('.navbar-navigation-menu').classList.add("active");
                                document.querySelector('.navbar-navigation-menu').classList.remove("deactive");

                                document.querySelector('#menu').classList.add("hide");
                                document.querySelector('#menu').classList.remove("show");

                                document.querySelector('#cancel').classList.add("show");
                                document.querySelector('#cancel').classList.remove("hide");
                            }} /></li>
                            <li className="navbar-menu-icon cancel" id="cancel"><img src={imgCancel} className="icons" onClick={() =>{
                                document.querySelector('.navbar-navigation-menu').classList.add("deactive");
                                document.querySelector('.navbar-navigation-menu').classList.remove("active");

                                document.querySelector('#menu').classList.add("show");
                                document.querySelector('#menu').classList.remove("hide");

                                document.querySelector('#cancel').classList.add("hide");
                                document.querySelector('#cancel').classList.remove("show");
                            }} /></li>
                        </div>
                    </ul>
                </div>
                <div className="spacer">
                    <div className="search-icon">
                        <input type="search" placeholder="Pesquise por seu interesse" />
                        <img src={imgSearch} className="icons" />
                    </div>
                </div>

                <div className="separation">|</div>

                <div className="navbar-navigation-items">
                    
                        <div className="navbar-navigation-menu">
                            <div className="navbar-logos">
                                <li className="item"><a href="#">Perfil</a></li>
                                <li className="item"><a href="#">Eventos</a></li>
                                <li className="item"><a href="#">Conquistas</a></li>
                                <li className="item"><a href="#">Loja</a></li>
                            </div>
                        
                    </div>
                </div>
                <div className="navbar-navigation-items">
                    <ul>
                        <div className="navbar-navigation">
                            <div className="navbar-logos">
                                <li><a href="/" ><img className="navbar-logo" src={imgNotification} href="/" /></a></li>
                                <li className="user"><a href="/perfil"> <img className="navbar-logo" src={img1} /></a></li>
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