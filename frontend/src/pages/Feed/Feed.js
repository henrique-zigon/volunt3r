import React from 'react';
import Publicacao from './Publicacao.js';
import NavBar from '../../components/componentes/NavBarUI.js';

function Feed(){
    return(
        <div>
        <NavBar username = "Jon"></NavBar>
        <Publicacao></Publicacao>
        </div>
    );
}

export default Feed;