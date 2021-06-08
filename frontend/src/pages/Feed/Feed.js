import React from 'react';
import Publicacao from './Publicacao.js';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import './style.css';
import imagem15 from '../../images/Group 15.png';
import imagem16 from '../../images/Group 16.png';

function Feed(){

    return(
        <div className = "feed">
        <NavBar username = "Jon" />
        <Menu />
        <Publicacao />
        </div>
        
    );
}

export default Feed;