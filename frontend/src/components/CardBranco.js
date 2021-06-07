import React from 'react';
import "../styles/card-branco-style.css";
import Conquista from '../components/Conquista';

function CardBranco(props) {
    return (
        <>
            <div className="fundoBranco">
                <div className="tituloFundoBranco">{props.titulo}</div>
                <div className="textoFundoBranco">{props.conteudo}</div>
                <Conquista titulo="Doação de Sangue" conteudo="Você completou mais de 30 eventos dessa categoria!" />
                <Conquista titulo="Doação de Sangue" conteudo="" />
                <Conquista titulo="Doação de Sangue" conteudo="sangue" />
            </div>
        </>
    );
}

export default CardBranco;