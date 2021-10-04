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
                    <Conquista show="all" progressoAtingido={5} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={3} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={10} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={18} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={4} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={5} progressoMaximo={20}/>
                </div>
            </div>
    );
}

export default CardConquistasDetailed;

