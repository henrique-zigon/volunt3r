import React from 'react';
import Botao from './Botao.js';
import "./card-style.css";

const Card = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} className="card-img-top"></img>
            </div>

            <div className="card-body text-dark">
                <div className="card-head">
                    <div className="card-title-subtitle">
                        <h1 className="card-title">{props.title}</h1>
                        <div className="card-subtitle-time">
                            <h3 className="card-subtitle">{props.subtitle}</h3>
                            <h3 className="card-subtitle">{props.time}</h3>
                        </div>
                    </div>
                    <div className="card-button">
                        <Botao action = {props.action}></Botao>
                    </div>
                </div>

                <p className="card-text text-secondary">{props.texto}</p>
            </div>
        </div>
    );
}

export default Card;