import React from 'react';
import Publicacao from './Publicacao.js';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import './style.css';
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