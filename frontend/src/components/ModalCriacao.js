import React, { Component, useState, useEffect } from 'react'
import "../styles/modal-criacao-style.css"
import Botao from "../components/componentes/BotaoUI";
import imgCancel from '../images/cancel.png';
import api from "../api.js";
import { useCookies } from 'react-cookie';

function ModalCriacao(props){
    let abrirModalCriacao = {
        display: props.exibeModal? "block" : "none"
    }

    // useEffect(() => {

    //     async function getUsuarioAtual() {
    //         console.log("AAA",cookies.volunt3r);
    //         const resposta = await api.get(`/usuarios/${id}`,{
    //             headers: { 'Authorization': cookies.volunt3r }
    //         });
    //         console.log(resposta.data);
    //         //setUsuarioAtual(resposta.data);
    //     }

    //     getUsuarioAtual();
    // }, [

    // ])






    return ( 
<>
<div className="paginaModalCriacao" style={
    abrirModalCriacao
}> 

    
<div className="exit"><img src={imgCancel} onClick={() => {props.funcao(false)}}></img>
</div>
<div className="modalCompleto">

<div className="tituloModal"><h2>Compartilhar Experiência</h2></div> 

<div className="headerModal">
        <img className="imagemPerfil" src={props.imagemPerfil} />
        <b className="nomePerfil">{props.nomePerfil}</b>
</div>

<textarea placeholder="Compartilhe uma experiência..." className="inputCriacao"></textarea>
<span className="tags" ><textarea placeholder="Use algumas #tags" className="inputTags"></textarea></span>

<div className="botoesDataLugar">
<div>
<span className="botaoAdd">Adicionar data:</span>
<input className="inputAdd" type="date"></input>
</div>

<div>
<span className="botaoAdd">Adicionar localização:</span>
<input className="inputAdd2" placeholder="Insira uma localização"></input>
</div>
</div>

<div className="botaoAdd2">Adicionar imagem:</div>
<input className="inputAdd3" type="file"></input>

<div className="btnModal">
<Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--outline" children="Cancelar" onClick={props.onClick}></Botao><Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--solid" children="Publicar" onClick={props.onClick}></Botao>
</div>

</div>
</div>


</>
    );
}

export default ModalCriacao;