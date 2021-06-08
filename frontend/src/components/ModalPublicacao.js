import React from 'react';
import "../styles/modal-publicacao-style.css"
import Botao from "../components/componentes/BotaoUI";
import Heart from "../images/heart.png";
import Comment from "../images/comment.png";
import Calendar from "../images/Calendar.png";
import Location from "../images/Location.png";
import imgCancel from '../images/cancel.png';

function ModalPublicacao(props){

    let abrirModal = {
        display: props.exibeModal? "block" : "none"
    }

    let publicacao = props.publicacaoSelecionada

    return ( 
<>

<div className="paginaModalPublicacao" style={
    abrirModal
}> 
<div className="exit"><img src={imgCancel} onClick={() => {props.funcao(false)}}></img>
</div>
<div className="modalCompleto">
    <div className="headerModal">
        <img className="imagemPerfil" src={props.imagemPerfil} />
        <b className="tituloModal">{publicacao.titulo}</b>
        <span className="subtituloModal"> - <span>{publicacao.dataPostagem}</span><span> horas atrás</span></span>
    </div>

    <div className="evento">
        <div className="fotoEvento">
            <img src={props.imagemEvento}></img>
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
        <img src={props.interessado1}/>
        <img src={props.interessado2}/>
        <img src={props.interessado3}/>
        <img src={props.interessado4}/>
         <b> +{props.interessados}</b>
        </div>
    </div>

</div>
</div>

</>
    );
}

export default ModalPublicacao;