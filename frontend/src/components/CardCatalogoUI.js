import React from 'react';
import Botao from './Botao.js';
import "./css/card-style.css";

const Card = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt = {props.title} className="card-img-top"></img>
            </div>
            <div className="card-body text-dark">
                <div className="card-head">
                    <div className="card-title-subtitle">
                        <h4 className="card-title">{props.title}</h4>
                        <div className="card-subtitle-time">
                            <h7 className="card-subtitle">{props.subtitle}</h7>
                            <div className="card-time">
                                <h7 className="card-subtitle">{props.date}</h7>
                                <h7 className="card-subtitle">-</h7>
                                <h7 className="card-subtitle">{props.time}</h7>
                            </div>
                        </div>
                    </div>
                    <div className="card-button">
                        <Botao onClick={() => {console.log("You Clicked on Me!");}} type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium"> {props.action}</Botao>            
                    </div>
                </div>
                <p className="card-text text-secondary">{props.texto}</p>
            </div>
        </div>
    );
}

export default Card;