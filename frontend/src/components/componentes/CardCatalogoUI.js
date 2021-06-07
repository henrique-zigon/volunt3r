import React from 'react';
import Botao from '../componentes/BotaoUI.js'
import "../css/card-style.css";

const Card = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} className="card-img-top"></img>
            </div>
            <div className="card-body text-dark">
                <div className="card-head">
                    <div className="card-title-subtitle">
                        <div className="card-title">{props.title}</div>
                        <div className="card-subtitle-time">
                            <div className="card-subtitle">{props.subtitle}</div>
                            <div className="card-time">
                                <div className="card-subtitle">{props.date}</div>
                                <div className="card-subtitle">-</div>
                                <div className="card-subtitle">{props.time}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-button">
                        <Botao onClick={() => { console.log("You Clicked on Me!"); }} type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium" children={props.action}></Botao>
                    </div>
                </div>
                <p className="card-text text-secondary">{props.texto}</p>
            </div>
        </div>
    );
}

export default Card;