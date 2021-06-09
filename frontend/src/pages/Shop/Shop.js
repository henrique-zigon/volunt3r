import React, { Component, useState, useEffect } from 'react'
import api from "../../api";
import './style.css';
import CardCatalogo from '../../components/CardCatalogo';
import Combobox from '../../components/Combobox';
import '../../styles/combo-box-style.css';
import NavBar from '../../components/componentes/NavBarUI';
import Menu from '../../components/componentes/MenuUI.js';
import { useCookies } from 'react-cookie';

function Shop() {
    const [cookies] = useCookies(['volunt3r']);
    const [cards, setCards] = useState([]);

    useEffect(() => {

        async function getAllCards() {
            const resposta = await api.get("/cursos",{
                headers: { 'Authorization': cookies.volunt3r }
            });
            console.log(resposta.data);
            setCards(resposta.data);
        }

        getAllCards();
    }, [])
    return (

        <>
            <NavBar />
            <Menu />
            <div className="pagina">
                <div className="paginaCentro">
                    <h2 className="titulo">Loja</h2>
                    <h4 className="subtitulo">Troque suas<span className="textoAzul"> milhas</span> por cursos incríveis!</h4>

                    <div className="filtros">
                        <b className="filtro1">Categoria</b> <Combobox valor="Todas" nome="Todas" />
                        <b className="filtro2">Ordenar por</b> <Combobox valor="Preço" nome="Preço" />

                    </div>

                    <div className="eventos">
                        <CardCatalogo info={cards} isEvento={false}/>
                    </div>

                </div>

                <div className="menuDireita">
                    <b className="titulo">Próximos eventos</b>


                </div>
            </div>

        </>

    );
}

export default Shop;