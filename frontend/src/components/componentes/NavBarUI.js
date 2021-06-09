import React from 'react';
import "../css/navBar-style.css";
import imgLike from "../../images/heart.png";

import img1 from "../../images/imagem1.jpg";
import imgSearch from "../../images/search.png";
import imgLogo from "../../images/logo volunt3r.png";

import { BiMenu, BiX, BiBell } from "react-icons/bi";

const NavBar = props => {
    return (
        <header className="navbar">
            <nav className="navbar-navigation">
                <a href="/"><div className="volunter-info">
                    <div className="navbar-logo"> <img className="icone" src={imgLogo} /></div>
                    <div className="navbar-title"> Volunt3r</div>
                </div></a>
                <div className="navbar-navigation-items">
                    <ul>
                        <div className="navbar-navigation">
                            <li className="navbar-menu-icon" id="menu"><BiMenu size = {35} className="icons" onClick={() => {                            
                                document.querySelector('.navbar-navigation-menu').classList.add("active");
                                document.querySelector('.navbar-navigation-menu').classList.remove("deactive");

                                document.querySelector('#menu').classList.add("hide");
                                document.querySelector('#menu').classList.remove("show");

                                document.querySelector('#cancel').classList.add("show");
                                document.querySelector('#cancel').classList.remove("hide");
                            }}  /></li>
                            <li className="navbar-menu-icon cancel" id="cancel"><BiX size = {35} className="icons" onClick={() =>{
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
                        <div className="underline" />
                    </div>
                </div>

                <div className="separation">|</div>

                <div className="navbar-navigation-items">
                    
                        <div className="navbar-navigation-menu">
                            <div className="navbar-logos">
                                <li className="item"><a href="/profile">Perfil</a></li>
                                <li className="item"><a href="/">Feed</a></li>
                                <li className="item"><a href="/catalog">Eventos</a></li>
                                <li className="item"><a href="/achievements">Conquistas</a></li>
                                <li className="item"><a href="/shop">Loja</a></li>
                            </div>
                        
                    </div>
                </div>
                <div className="navbar-navigation-items">
                    <ul>
                        <div className="navbar-navigation">
                            <div className="navbar-logos">
                                <li className="navbar-logo"><a href="/" ><BiBell  className="icone" href="/" /></a></li>
                                <li className="user"><a href="/profile"> <img className="navbar-logo" src={img1} /></a></li>
                            </div>
                            <li className="navbar-user"><a href="/profile">Bom te ver, {props.username}</a></li>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;