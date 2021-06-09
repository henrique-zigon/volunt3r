import React from 'react';
import Botao from '../componentes/BotaoUI.js';
import "../css/publicacao-style.css";

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
                            props.evento ? <Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--solid" children="DELETAR" onClick={props.onClick}></Botao> : ""
                        }
                    </div>
                    <div className="publicacao-actions">
                        <div className="publicacao-icons">
                            {/* <IconButton
                                icon="add-a-photo"
                                color={Colors.red500}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            /> */}
                            <img src={props.imgIconLike} className="publicacao-icon"></img>
                            <img src={props.imgIconComment} className="publicacao-icon"></img>
                        </div>
                        <div className="publicacao-icons">
                            <div className="publicacao-tags publicacao-statistic">{props.likes}</div>
                            <div className="publicacao-tags publicacao-statistic">{props.comments}</div>
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