import React, { Component, useState, useEffect } from 'react'
import Publicacao from '../../components/componentes/PublicacaoUI';
import img1 from "../../images/imagem1.jpg";
import img3 from "../../images/imagem3.jpg";
import img2 from "../../images/imagem2.jpg";
import img5 from "../../images/imagem5.jpg";
import imgLonga from "../../images/imagemLonga.jpg";
import imgLike from "../../images/heart.png";
import imgComment from "../../images/comment.png";
import api from "../../api.js";
import { ToastProvider, useToasts }  from 'react-toast-notifications';


export default function Publicacoes() {
    const { addToast } = useToasts();

    const [publicacoes, setPublicacoes] = useState([]);

    useEffect(() => {

        async function getAllPublicacoes() {
            const resposta = await api.get("/publicacoes");
            console.log(resposta.data);
            setPublicacoes(resposta.data);
        }

        getAllPublicacoes();
    }, [])
    
        return (
            <div className="container-publicacao">
                    { 
                        publicacoes.map((publicacao) => (
                            <Publicacao imgIconUser={img1} onClick = {()=>{
                                api.delete(`/publicacoes/remover/${publicacao.id}`).then(resposta => {
                                    console.log(resposta);
                                    if(resposta.status==200){
                                        addToast(resposta.data.message,{
                                            appearance: 'success',
                                            autoDismiss: true,
                                        })

                                        setPublicacoes(publicacoes.filter(p=>p.id!=publicacao.id))
                                    }
                                })
                                .catch(e => {
                                    console.log(e);
                                    addToast("Ops! Algo deu errado :(",{
                                        appearance: 'error',
                                        autoDismiss: true,
                                    })

                                })
                                
                            }
                            }
                            imgsrc={img3} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName={publicacao.usuario.nomeUsuario} time={publicacao.evento.dataEvento} desc={publicacao.descricao} tags="#Gratidão #AmoCães" />
                        ))
                    }
            </div>
        );

}

