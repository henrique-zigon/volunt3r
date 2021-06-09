import "../styles/modal-publicacao-style.css"
import Botao from "../components/componentes/BotaoUI";
import Heart from "../images/heart.png";
import Comment from "../images/comment.png";
import Calendar from "../images/calendar.png";
import Location from "../images/Location.png";
import imgCancel from '../images/cancel.png';
import React, { Component, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import api from "../api.js";

function ModalPublicacao(props){
    const [cookies] = useCookies(['volunt3r']);
    let abrirModal = {
        display: props.exibeModal? "block" : "none"
    }

    let publicacao = props.publicacaoSelecionada

    const [inscritos, setInscritos] = useState([]);

    useEffect(() => {

        async function getInscritos() {
            console.log("XOXO",cookies.volunt3r);
            const resposta = await api.get(`/eventos/${publicacao.evento.id}/inscritos`,{
                headers: { 'Authorization': cookies.volunt3r }
            });
            console.log(resposta.data);
            setInscritos(resposta.data);
        }

        getInscritos();
    }, [
        publicacao
    ])

    



    return ( 
<>

<div className="paginaModalPublicacao" style={
    abrirModal
}> 
<div className="exit"><img src={imgCancel} onClick={() => {props.funcao(false)}}></img>
</div>
<div className="modalCompleto">
    <div className="headerModal">
        <img className="imagemPerfil" src={publicacao.usuario.usuarioImagemPerfil} />
        <b className="tituloModal">{publicacao.usuario.nomeUsuario}</b>
        <span className="subtituloModal"> - <span>{publicacao.dataPostagem}</span></span>
    </div>

    <div className="evento">
        <div className="fotoEvento">
            <img src={publicacao.pathImagem}></img>
        </div>
        
        <div className="sobre">
            <div className="descricaoEvento">{publicacao.descricao}</div>
            <div className="tagsEvento">{publicacao.tags}</div>

            <div className="localizacaoEvento">
                 <img src={Location} />
                <span className="textoLocalizacao">
                    {publicacao.evento.endereco}
                </span>
            </div>

            <div className="dataEvento">
                <img src={Calendar} />        
                <span className="textoData">
                    {publicacao.evento.dataEvento} - {publicacao.evento.dataFechamentoEvento}
                </span> 
            </div>
        </div>
    </div>
    <div className="botoesEvento">
        <img className="like" src={Heart} />
        <img className="comentario" src={Comment} />
        <span className="btnInteresse"><Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--solid" children="Estou interessado" onClick={props.onClick}></Botao></span>
    </div>
    
    <div className="linha" />

    <div className="feedbackEvento">
        <b><b className="numerosEvento">{publicacao.numeroLikes}</b> Likes</b>
        <b>-</b>
        <b><b className="numerosEvento">{publicacao.numeroComentarios}</b> Comentários</b>
        <b>-</b>
        <b>Interessados:</b>
        <div className="interessados">
            {
                inscritos.map((inscrito) => (
                    <img className="interessados" src={inscrito.usuarioImagemPerfil}/>
                ))
            }
        
         <b> +{props.interessados}</b>
        </div>
    </div>

</div>
</div>

</>
    );
}

export default ModalPublicacao;