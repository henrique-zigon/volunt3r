import React from 'react';
import '../styles/medalha-perfil-style.css';

function MedalhaPerfil(props) {
    return (
        <>

            <div className="bordaMedalha2">

                <img className="texte" src={props.iconeMedalha} alt={props.descricaoImagem} />
                <span className="textoMedalha">Patamar: <b>{props.elo}</b></span>
            </div>

            
        </>
    );
}

export default MedalhaPerfil