import React, { Component, useState, useEffect } from 'react'
import Publicacao from './Publicacao.js';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import './style.css';
import imagem15 from '../../images/Group 15.png';
import imagem16 from '../../images/Group 16.png';
import ModalCriacao from '../../components/ModalCriacao.js';

function Feed(props){
    const [abrirModalCriacao, setModalCriacao] = useState(false);

    function abrirModalCriacaoF() {
        setModalCriacao(true);
    }

    

    return(
        <>
        
        <div className = "feed">
        <NavBar username = "Jon" />
        <ModalCriacao exibeModal={abrirModalCriacao} funcao={setModalCriacao} />
        <Menu />
        <div className="createPublicacao"  onClick={() => {abrirModalCriacaoF()}}>
            <img className="iconeClipe" src={imagem15} />
            <textarea className="textAreaCreate" placeholder="Compartilhe uma experiência... =)"/>
            <img className="iconeEnviar" src={imagem16} />
        </div>
        <Publicacao />
        
        </div>
        </>
    );
}

export default Feed;