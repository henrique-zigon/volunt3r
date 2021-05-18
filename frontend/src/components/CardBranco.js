import React from 'react';
import "../styles/card-branco-style.css";

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