import React from 'react';
import "../css/menu-style.css";
import imgSetaAbre from '../../images/right-arrow.png';
import imgSetaFecha from '../../images/left-arrow.png';
import {BiUser, BiCalendarAlt, BiShoppingBag, BiAward, BiLineChart} from "react-icons/bi";


const Menu = props => {
    return (
        <div className="menu-principal">
            <div className="menu-header">
                <span id="title" className="hide"> Navegação</span>
                <div className="menu-button hide" id="fecha" onClick={() => {
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

                <div className="menu-button" id="abre" onClick={() => {
                    
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
               
                    {/* <a href="/profile"><div className="menu-icon" id="profile"><BiUser className="icone" id="profileImg" /></div></a> */}
                    <a href="/catalog"><div className="menu-icon" id="catalog"><BiCalendarAlt className="icone" id="catalogImg" /></div></a>
                    <a href="/achievements"><div className="menu-icon" id="achievement"><BiAward className="icone" id="achievementImg" /></div></a>
                    <a href="/shop"><div className="menu-icon" id="shop"><BiShoppingBag className="icone" id="shopImg" /></div></a>
                    <a href="/dashboard"><div className="menu-icon" id="shop"><BiLineChart className="icone" id="shopImg" /></div></a>
                                    
                </div>

                <div className="menu-labels hide">
                    {/* <a href="/profile"><div className="menu-label">Perfil</div></a> */}
                    <a href="/catalog"><div className="menu-label">Eventos</div></a>
                    <a href="/achievements"><div className="menu-label">Conquistas</div></a>
                    <a href="/shop"><div className="menu-label">Loja</div></a>
                    <a href="/dashboard"><div className="menu-label">Dashboard</div></a>
                </div>
            </div>
        </div>

    );
}

export default Menu;