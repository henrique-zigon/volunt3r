import React, { Component, useState, useEffect } from 'react'
import api from "../../api";
import './style.css';
import CardCatalogo from '../../components/CardCatalogo';
import Combobox from '../../components/Combobox';
import '../../styles/combo-box-style.css';
import NavBar from '../../components/componentes/NavBarUI';

function Shop(){

return(

<>
<NavBar />

<div className="pagina">
<div className="paginaCentro">
    <h2 className="titulo">Loja</h2>
    <h4 className="subtitulo">Troque suas<span className="textoAzul"> milhas</span> por cursos incríveis!</h4>

<div className="filtros">
    <b className="filtro1">Categoria</b> <Combobox valor="Todas" nome="Todas"/>
    <b className="filtro2">Ordenar por</b> <Combobox valor="Preço" nome="Preço"/>

</div>

    <div className="eventos">
    <CardCatalogo />
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