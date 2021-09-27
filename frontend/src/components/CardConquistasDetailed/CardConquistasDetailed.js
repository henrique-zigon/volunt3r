import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import api from '../../api';
import './card-conquista-detailed-style.css';
import Conquista from '../../components/Conquista/Conquista';


const CardConquistasDetailed = (props) => {
    let location = useLocation().pathname;
    return(
            <div className="user-medals-detailed">
                <span>Meu progresso</span>
                <div className="medals-detailed-scroll">
                    <Conquista show="all"/>
                    <Conquista show="all"/>
                    <Conquista show="all"/>
                    <Conquista show="all"/>
                    <Conquista show="all"/>
                    <Conquista show="all"/>
                </div>
            </div>
    );
}

export default CardConquistasDetailed;

