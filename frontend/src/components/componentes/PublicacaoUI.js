import React, { Component, useState, useEffect } from 'react'
import Botao from '../componentes/BotaoUI.js';
import "../css/publicacao-style.css";
import {BiComment, BiHeart} from "react-icons/bi";

const Publicacao = props => {

    return (
        <div className="publicacao text-center shadow">
            <div className="publicacao-main">
                <div className="publicacao-info">
                    <div className="user-img">
                        <img src={props.imgIconUser} className="user-img"></img></div>
                    <div className="publicacao-owner"> {props.userName} </div>
                    <div className="publicacao-time text-secondary"> {props.time} </div>
                    <div className="publicacao-button">
                        {
                            props.evento ? <Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--solid" children="Participar" onClick={props.onClick} /> : ""
                        }
                            <Botao type="button" buttonSize="btn--small" buttonStyle="btn--primary--outline" children="Ver mais" />
                    </div>
                    <div className="publicacao-actions">
                        <div className="publicacao-icons">
                        
                            <BiHeart size={30} className="publicacao-icon" />
                            {
                            !props.comentario ? <BiComment size={30} className="publicacao-icon" /> : ""
                            }

                            
                        </div>
                        <div className="publicacao-icons">
                            <div className="publicacao-tags publicacao-statistic">{props.likes}</div>
                            {
                            !props.comentario ? <div className="publicacao-tags publicacao-statistic">{props.comments}</div> : ""
                            }
                                                    </div>
                    </div>
                </div>
                <div className="publicacao-content">
                    <img src={props.imgsrc} className="publicacao-img"></img>
                    <div className="publicacao-text text-secondary">
                        <div className="publicacao-desc">{props.desc}</div>
                        <div className="publicacao-tags">{props.tags}</div>
                    </div>

                </div>
            </div>
        </div>
    );
}



export default Publicacao;