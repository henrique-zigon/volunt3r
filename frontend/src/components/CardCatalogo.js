import React, { Component, useState, useEffect } from 'react'
import Card from './componentes/CardCatalogoUI';
import img1 from "../images/imagem1.jpg";
import img2 from "../images/imagem2.jpg";
import img3 from "../images/imagem3.jpg";
import img4 from "../images/imagem4.jpg";
import api from "../api.js";

export default function Cards () {

    const [cards, setCards] = useState([]);

    useEffect(() => {

        async function getAllCards() {
            const resposta = await api.get("/eventos");
            console.log(resposta.data);
            setCards(resposta.data);
        }

        getAllCards();
    }, [])

    return (
        <div className="container-card">
          {
              cards.map((card) => (
                <Card imgsrc = {img3} title={card.titulo} onClick = "metodoVaiAqui()" subtitle="B3 Social" date={card.evento.dataFechamentoEvento} time="14h" action="Participar" texto={card.descricao} /> 
              ))
          }
        </div>
    );
}

      

