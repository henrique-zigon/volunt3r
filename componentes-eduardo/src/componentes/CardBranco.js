import React from 'react';
import '../css/CssTeste.css';

function CardBranco(props) {
    return (
        <>
            <div className="fundoBranco">
                <div className="tituloFundoBranco">{props.titulo}</div>
                <div className="textoFundoBranco">{props.conteudo}</div>
            </div>
        </>
    );
}

export default CardBranco;