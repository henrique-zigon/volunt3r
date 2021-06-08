import React, { Component, useState, useEffect } from 'react'
import api from "../../api";
import './style.css';
import CardCatalogo from '../../components/CardCatalogo';
import Combobox from '../../components/Combobox';
import Menu from '../../components/componentes/MenuUI.js';
import '../../styles/combo-box-style.css';
import NavBar from '../../components/componentes/NavBarUI';

function EventCatalog() {
    const [cards, setCards] = useState([]);

    useEffect(() => {

        async function getAllCards() {
            const resposta = await api.get("/eventos");
            setCards(resposta.data);
        }

        getAllCards();
    }, [])

    return (

        <>
            <NavBar username="Jon"></NavBar>
            <Menu />

            <div className="pagina">
                <div className="paginaCentro">
                    <h2 className="titulo">Catálogo de Eventos</h2>
                    <h4 className="subtitulo">Encontre o evento <span className="textoAzul">perfeito</span> para você!</h4>

                    <div className="filtros">
                        <b className="filtro1">Categoria</b> <Combobox valor="Todas" nome="Todas" />
                        <b className="filtro2">Tipo de doação</b> <Combobox valor="Todas" nome="Todas" />
                        <b className="filtro2">Data</b> <input className="box" type="date"></input>

                    </div>

                    <div className="eventos">
                        <CardCatalogo info={cards} isEvento={true}/>
                    </div>

                </div>

                <div className="menuDireita">
                    <b className="titulo">Próximos eventos</b>


                </div>
            </div>

        </>

    );
}

export default EventCatalog;