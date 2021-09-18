import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';

import api from '../../api';
import './card-perfil-style.css';

const URL = "http://voluntier.eastus.cloudapp.azure.com:81";


const CardPerfil = (props) => {
return(
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
                            <span>{props.cargo}</span>
                        </div>
                    </div>
                    <button className="btn-edit-profile">
                        <div>
                            <span> 
                                Editar Perfil
                            </span>
                            <BiEdit size="15px"/>
                        </div>
                    </button>
                </div>
            </div>

            <div className="profile-content">
                <span>TBD</span>
            </div>
        </div>
    </div>
);
}




export default CardPerfil;