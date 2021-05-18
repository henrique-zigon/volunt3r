import React, { Component } from 'react'
import Card from "../components/CardCatalogoUI";
import "../styles/card-style.css";
import img1 from "../images/imagem1.jpg";
import img2 from "../images/imagem2.jpg";
import img3 from "../images/imagem3.jpg";
import img4 from "../images/imagem4.jpg";

export default class Cards extends Component {
    render() {
        return (
            <div className="container-card">
                <Card imgsrc={img1} title="Doação de cachorro" onClick = "metodoVaiAqui()" subtitle="Amicão" date="14/03" time="14h" action="Participar" texto="Mollit occaecat ad esse laboris sunt. Reprehenderit amet sit sint aliqua esse do aliquip occaecat nisi. Nostrud mollit Lorem aliquip laborum qui incididunt reprehenderit cillum consequat id pariatur ex nulla.Do ullamco veniam non amet sit nisi." />
                <Card imgsrc={img2} title="Curso de fotografia" onClick = "metodoVaiAqui()" subtitle="Tuco anjo na terra" date="14/03" time="14h" action="Comprar" texto="Mollit occaecat ad esse laboris sunt. Reprehenderit amet sit sint aliqua esse do aliquip occaecat nisi. Nostrud mollit Lorem aliquip laborum qui incididunt reprehenderit cillum consequat id pariatur ex nulla.Do ullamco veniam non amet sit nisi." />
                <Card imgsrc={img3} title="Doação de cachorro" onClick = "metodoVaiAqui()" subtitle="B3 Social" date="14/03" time="14h" action="Participar" texto="Mollit occaecat ad esse laboris sunt. Reprehenderit amet sit sint aliqua esse do aliquip occaecat nisi. Nostrud mollit Lorem aliquip laborum qui incididunt reprehenderit cillum consequat id pariatur ex nulla.Do ullamco veniam non amet sit nisi." />
                <Card imgsrc={img3} title="Doação de cachorro" onClick = "metodoVaiAqui()" subtitle="B3 Social" date="14/03" time="14h" action="Participar" texto="Mollit occaecat ad esse laboris sunt. Reprehenderit amet sit sint aliqua esse do aliquip occaecat nisi. Nostrud mollit Lorem aliquip laborum qui incididunt reprehenderit cillum consequat id pariatur ex nulla.Do ullamco veniam non amet sit nisi." />       
            </div>
        );
    }
}

