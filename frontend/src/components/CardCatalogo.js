import React, { Component, useState, useEffect } from 'react'
import Card from './componentes/CardCatalogoUI';
import img1 from "../images/imagem1.jpg";
import img2 from "../images/imagem2.jpg";
import img3 from "../images/imagem3.jpg";
import img4 from "../images/imagem4.jpg";

export default function Cards(props) {

    let cards = props.info;

    return (
        <div className="container-card">
            {
                cards != null ?
                    props.isEvento ?

                        cards.map((card) => (
                            <Card
                                key={card.id}
                                imgsrc={img3}
                                title={card.titulo}
                                onClick="metodoVaiAqui()"
                                subtitle="B3 Social"
                                date={card.evento.dataFechamentoEvento}
                                time="14h"
                                action="Participar"
                                texto={card.descricao} 
                            />
                        ))
                    :
                        cards.map((card) => (
                            <Card
                                key={card.id}
                                imgsrc={img3}
                                title={card.titulo}
                                onClick="metodoVaiAqui()"
                                subtitle={card.categoria}
                                date={card.duracao+" Horas"}
                                time={card.preco+" Milhas"}
                                action="Colocar no carrinho"
                                texto={card.descricao} 
                            />
                        ))
                :
                <p>Não há itens</p>
            }
        </div>
    );
}



