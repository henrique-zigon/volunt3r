import React from 'react';
import "../css/menu-style.css";
import imgUser from '../../images/user.png'
import imgEvent from '../../images/calendar.png'
import imgConquista from '../../images/badge.png'
import imgShop from '../../images/bag.png'
import imgUserAzul from '../../images/user_azul.png'
import imgEventAzul from '../../images/calendar_azul.png'
import imgConquistaAzul from '../../images/badge_azul.png'
import imgShopAzul from '../../images/bag_azul.png'
import imgSetaAbre from '../../images/right-arrow.png';
import imgSetaFecha from '../../images/left-arrow.png';
import { Route, Switch } from 'react-router';

const Menu = props => {
    return (
        <div className="menu-principal">
            <div className="menu-header ">
                <span id="title"> Navegação</span>
                <div className="menu-button" id="fecha" onClick={() => {
                    document.querySelector('.menu-labels').classList.add("hide");
             

                    document.querySelector('#title').classList.add("hide");
                    document.querySelector('#title').classList.remove("show");

                    document.querySelector('#fecha').classList.add("hide");
                    document.querySelector('#fecha').classList.remove("show");

                    document.querySelector('#abre').classList.add("show");
                    document.querySelector('#abre').classList.remove("hide");
                }}>
                    <img className="icone-button" src={imgSetaFecha} ></img>
                </div>

                <div className="menu-button hide" id="abre" onClick={() => {
                    
                    document.querySelector('.menu-labels').classList.remove("hide");

                    document.querySelector('#title').classList.add("show");
                    document.querySelector('#title').classList.remove("hide");

                    document.querySelector('#fecha').classList.add("show");
                    document.querySelector('#fecha').classList.remove("hide");

                    document.querySelector('#abre').classList.add("hide");
                    document.querySelector('#abre').classList.remove("show");
                }}>
                    <img className="icone-button" src={imgSetaAbre}></img>
                </div>
            </div>
            <div className="menu-content">
                <div className="menu-icons">
               
                    <a href="/profile"><div className="menu-icon" id="profile"><img className="icone" id="profileImg" src={imgUserAzul}></img></div></a>
                    <a href="/catalog"><div className="menu-icon" id="catalog"><img className="icone" id="catalogImg" src={imgEventAzul}></img></div></a>
                    <a href="/achievements"><div className="menu-icon" id="achievement"><img className="icone" id="achievementImg" src={imgConquistaAzul}></img></div></a>
                    <a href="/shop"><div className="menu-icon" id="shop"><img className="icone" id="shopImg" src={imgShopAzul}></img></div></a>
                                    
                </div>

                <div className="menu-labels">
                    <a href="/profile"><div className="menu-label">Perfil</div></a>
                    <a href="/catalog"><div className="menu-label">Eventos</div></a>
                    <a href="/achievements"><div className="menu-label">Conquistas</div></a>
                    <a href="/shop"><div className="menu-label">Loja</div></a>
                </div>
            </div>
        </div>

    );
}

export default Menu;