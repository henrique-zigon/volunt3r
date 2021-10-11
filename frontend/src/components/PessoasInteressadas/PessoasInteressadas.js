import React, { useEffect } from 'react';
import avatarPadrao from '../../images/avatar_padrao.png';
import { BiPlus } from 'react-icons/bi';
import './pessoasinteressadas-style.scss';

const PessoasInteressadas = (props) => {
return (
    <div className="user-interested">
        <img 
            src={avatarPadrao}
            alt={props.nameUserPosted}
        /> 
        <img 
            src={avatarPadrao}
            alt={props.nameUserPosted}
        /> 
        <img 
            src={avatarPadrao}
            alt={props.nameUserPosted}
        /> 
        <div className="seeMore">
            <BiPlus size={20}/>
        </div>
    </div>

);
}




export default PessoasInteressadas;