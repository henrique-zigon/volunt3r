import React from 'react';
import "../styles/modal-publicacao-style.css"
import Botao from "./Botao";
import Heart from "../images/heart.png";
import Comment from "../images/comment.png";
import Calendar from "../images/Calendar.png";
import Location from "../images/Location.png";

function ModalPublicacao(props){
    return ( 
<>
<div className="modalCompleto">
    <div className="headerModal">
        <img className="imagemPerfil" src={props.imagemPerfil} />
        <b className="tituloModal">{props.titulo}</b>
        <span className="subtituloModal"> - <span>{props.tempo}</span><span> horas atrás</span></span>
    </div>

    <div className="evento">
        <div className="fotoEvento">
            <img src={props.imagemEvento}></img>
        </div>
        
        <div className="sobre">
            <div className="descricaoEvento">{props.descricao}</div>
            <div className="tagsEvento">{props.tags}</div>

            <div className="localizacaoEvento">
                 <img src={Location} />
                <span className="textoLocalizacao">
                    {props.localizacao}
                </span>
            </div>

            <div className="dataEvento">
                <img src={Calendar} />        
                <span className="textoData">
                    {props.data} - {props.hora}
                </span> 
            </div>
        </div>
    </div>
    <div className="botoesEvento">
        <img className="like" src={Heart} />
        <img className="comentario" src={Comment} />
        <span className="btnInteresse"><Botao  onClick="" action="Estou interessado"/></span>
    </div>
    
    <div className="linha" />

    <div className="feedbackEvento">
        <b><b className="numerosEvento">{props.likes}</b> Likes</b>
        <b>-</b>
        <b><b className="numerosEvento">{props.comentarios}</b> Comentários</b>
        <b>-</b>
        <b>Interessados:</b>
        <div className="interessados">
        <img src={props.interessado1}/>
        <img src={props.interessado2}/>
        <img src={props.interessado3}/>
        <img src={props.interessado4}/>
         <b> +{props.interessados}</b>
        </div>
    </div>

</div>


</>
    );
}

export default ModalPublicacao;