import React from 'react';
import Botao from './Botao.js';
import "./publicacao-style.css";

const Publicacao = props => {
    return (
        <div className="publicacao text-center shadow">
            <div className="publicacao-info">
                <div className="info-publicacao">
                    <div className="user-img">
                        <img src={props.imgIconUser} className="user-img"></img></div>
                    <div className="publicacao-owner"> {props.userName} </div>
                    <div className="publicacao-time text-secondary"> {props.title} </div>
                    <div className="publicacao-actions">
                        <div className="publicacao-icons">
                            <img src={props.imgIconLike} className="publicacao-icon"></img>
                            <img src={props.imgIconComment} className="publicacao-icon"></img>
                        </div>
                        <div className="publicacao-icons">
                            <div className="publicacao-tags publicacao-statistic">{props.likes}</div>
                            <div className="publicacao-tags publicacao-statistic">{props.comments}</div>
                        </div>
                    </div>
                </div>
                <div className="publicacao-main">
                    <div className="overflow">
                        <img src={props.imgsrc} className="publicacao-img"></img>
                    </div>
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