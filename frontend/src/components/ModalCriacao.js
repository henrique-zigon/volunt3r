import React, { Component, useState, useEffect } from 'react'
import "../styles/modal-criacao-style.css"
import Botao from "../components/componentes/BotaoUI";
import { Link, useHistory } from 'react-router-dom';
import imgCancel from '../images/cancel.png';
import api from "../api.js";
import { useCookies } from 'react-cookie';

function ModalCriacao(props) {
    const history = useHistory();
    const [cookies] = useCookies(['volunt3r','volunt3r_user']);
    const [publiData, setPubliData] = useState({
        descricao: "",
        dataPostagem: "",
        pathImagem: "",
        publicacaoPai: {
            id: 2
        },
        evento: {
            id: 2
        },
        usuario: {
            idUsuario : cookies.volunt3r_user.idUsuario
        }
    });

    function handle(e) {
        const newUserData = {...publiData }
        newUserData[e.target.id] = e.target.value;
        setPubliData(newUserData);
        console.log(newUserData);
    }

    function submitForm(e) {
        console.log("OPA")
        api.post("/publicacoes/novo",publiData, {
            headers: { 'Authorization': cookies.volunt3r }
        })
            .then(resposta => {
                if(resposta.status==201) {
                    console.log("Foi");
                    history.push("/");
                }else {
                    //mensagem
                }
            });
    }

    let abrirModalCriacao = {
        display: props.exibeModal ? "block" : "none"
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

                <div className="modalCompleto">

                    <div className="tituloModalCriacao"><h2>Compartilhar Experiência</h2></div>

                    <div className="headerModal">
                        <img className="imagemPerfil" src={cookies.volunt3r_user.imagemPerfil} />
                        <b className="nomePerfil">{cookies.volunt3r_user.nomeUsuario}</b>
                    </div>

                    <textarea placeholder="Compartilhe uma experiência..." onChange={handle} className="inputCriacao" name="descricao" id="descricao"></textarea>
                    {/*<span className="tags" >{/*<textarea placeholder="Use algumas #tags" className="inputTags"></textarea></span>*/}

                   
                        <div className="botoesDataLugar">
                            <div>
                                <span className="botaoAdd">Adicionar data:</span>
                                <input className="inputAdd" type="date" name="dataPostagem" id="dataPostagem" onChange={handle}></input>
                            </div>

                            <div>
                                <span className="botaoAdd">Adicionar localização:</span>
                                <input className="inputAdd2" placeholder="Insira uma localização"></input>
                            </div>
                        </div>

                        <div className="botoesAdicionaImagem">
                        <div className="botaoAdd">Adicionar imagem:</div>
                        <input className="inputAdd2" placeholder="Insira o link de uma imagem" onChange={handle} name="pathImagem" id="pathImagem"></input>
                        {/* <input className="inputAdd3" type="file"></input> */}
                        </div>
                    <div className="btnModal">
                        <Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--outline" children="Cancelar" onClick={() => { props.funcao(false) }}></Botao><Botao type="button" buttonSize="btn--medium" buttonStyle="btn--primary--solid" children="Publicar" onClick={submitForm} ></Botao>
                    </div>

                </div>
            </div>


        </>
    );
}

export default ModalCriacao;