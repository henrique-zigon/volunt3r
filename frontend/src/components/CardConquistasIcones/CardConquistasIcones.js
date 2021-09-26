import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import api from '../../api';
import './card-conquista-icones-style.css';
import Conquista from '../../components/Conquista/Conquista';

const URL = "http://voluntier.eastus.cloudapp.azure.com:81";


const CardConquistasIcones = (props) => {
    let location = useLocation().pathname;
return(
<div className="user-medals">
<span>Minhas medalhas</span>
<div className="user-medals-info">
    <div className={
    location==="/perfil" ? "user-medals-slots slots-preview" : "user-medals-slots"   
    }>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
        <Conquista show="icone"/>
    </div>
    <Link to="/perfil-conquistas">
    <span className={
    location==="/perfil-conquistas" ? "hide" : "linkagem"   
    }>Ver mais</span>
    </Link>
</div>
</div>
);
}

export default CardConquistasIcones;