import React, { Component, useState, useEffect } from 'react'
import Publicacao from '../../components/componentes/PublicacaoUI';
import img1 from "../../images/imagem1.jpg";
import img3 from "../../images/imagem3.jpg";
import img2 from "../../images/imagem2.jpg";
import img5 from "../../images/imagem5.jpg";
import imgLonga from "../../images/imagemLonga.jpg";
import api from "../../api.js";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import ModalPublicacao from '../../components/ModalPublicacao';
import { useCookies } from 'react-cookie';

export default function Publicacoes() {
    const [cookies] = useCookies(['volunt3r']);
    const { addToast } = useToasts();

    const [modal, setModal] = useState(false);

    const [publicacaoSelecionada, setPublicacaoSelecionada] = useState({
        titulo: "",
        descricao: "",
        dataPostagem: "",
        pathImagem: "",
        evento: {
            dataEvento: "",
            dataFechamentoEvento: "",
            endereco: "",
            maximoParticipantes: 0
        },
        numeroLikes: 0,
        numeroComentarios: 1
    });

    function abrirModal() {
        setModal(true);
    }

    const [publicacoes, setPublicacoes] = useState([]);

    useEffect(() => {

        async function getAllPublicacoes() {
            console.log("AAA",cookies.volunt3r);
            const resposta = await api.get("/publicacoes",{
                headers: { 'Authorization': cookies.volunt3r }
            });
            console.log(resposta.data);
            setPublicacoes(resposta.data);
        }

        getAllPublicacoes();
    }, [])

    return (
        <div className="container-publicacao">
            {
                publicacoes.map((publicacao) => (
                    <Publicacao  onClick={() => {
                        setPublicacaoSelecionada(publicacao);
                        abrirModal();
                        // api.delete(`/publicacoes/remover/${publicacao.id}`).then(resposta => {
                        //     console.log(resposta);
                        //     if(resposta.status==200){
                        //         addToast(resposta.data.message,{
                        //             appearance: 'success',
                        //             autoDismiss: true,
                        //         })

                        //         setPublicacoes(publicacoes.filter(p=>p.id!=publicacao.id))
                        //     }
                        // })
                        // .catch(e => {
                        //     console.log(e);
                        //     addToast("Ops! Algo deu errado :(",{
                        //         appearance: 'error',
                        //         autoDismiss: true,
                        //     })

                        // })

                    }
                    }
                    imgIconUser={publicacao.usuario.usuarioImagemPerfil} imgsrc={publicacao.pathImagem} likes={publicacao.numeroLikes} comments={publicacao.numeroComentarios} userName={publicacao.usuario.nomeUsuario} time={publicacao.evento.dataEvento} desc={publicacao.descricao} evento={publicacao.publicacaoEvento} comentario={publicacao.comentario} tags="#Gratidão #AmoCães" />
                        
                ))
            }

            <ModalPublicacao exibeModal={modal} funcao={setModal} publicacaoSelecionada={publicacaoSelecionada} />
        </div>
    );

}

