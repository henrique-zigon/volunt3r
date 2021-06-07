import React from 'react';
import '../styles/medalha-style.css';

function Medalha(props) {
    return (
        <>
            <div className="bordaMedalha">

                <img className="texte" src={props.iconeMedalha} alt={props.descricaoImagem} /><br />
            </div>

            <span className="textoMedalha">Patamar: <b>{props.elo}</b></span>
        </>
    );
}

export default Medalha