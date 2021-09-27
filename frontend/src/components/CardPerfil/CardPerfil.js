import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import api from '../../api';
import './card-perfil-style.css';
import Conquista from '../../components/Conquista/Conquista';
import CardConquistasIcones from '../../components/CardConquistasIcones/CardConquistasIcones';
import CardConquistasDetailed from '../../components/CardConquistasDetailed/CardConquistasDetailed';


const CardPerfil = (props) => {
    let location = useLocation().pathname;
    return (
        <div className="profile-card">
            <div className="profile-card-content">
                <div className="profile-general-info">
                    <div className="profile-cover">
                        <img src={props.cover}></img>
                    </div>
                    <div className="profile-header">
                        <div className="profile-info">
                            <div className="profile-image">
                                <img src={props.icone}></img>
                            </div>
                            <div className="profile-user-info">
                                <b><span>{props.nome}</span></b>
                                <span className="subtitle">{props.cargo}</span>
                            </div>
                        </div>
                        <button className="btn-edit-profile">
                            <div>
                                <span>
                                    Editar Perfil
                                </span>
                                <BiEdit size="15px" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    {
                        (() => {
                            if (location === "/perfil") {
                                return (
                                    <div className="profile-content-inside">
                                        <div className="profile-bio-area">
                                            <span>Sobre mim</span>
                                            <div className="profile-bio">
                                                <span>{props.bio}</span>
                                            </div>
                                        </div>
                                        <CardConquistasIcones />
                                    </div>
                                );
                            }

                            if (location === "/perfil-conquistas") {
                                return (
                                    <div className="profile-content-inside">
                                        <CardConquistasIcones />
                                        <CardConquistasDetailed />
                                    </div>
                                );
                            }
                        })()}
                </div>

            </div>
        </div>
    );
}




export default CardPerfil;