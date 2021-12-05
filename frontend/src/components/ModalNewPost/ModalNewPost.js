import api from '../../api';
import React, { useEffect, useState } from 'react';
import { BiX, BiUpload } from 'react-icons/bi';
import { useToasts } from 'react-toast-notifications';

import './ModalNewPost.css';

const ModalNewPost = (props) => {
    const [eventos, setEventos] = useState([]);

    const {
        className,
        nameUserLogged,
        closeModalFunction,
        cookieUser,
        token
    } = props;

    const [statePreview, setStatePreview] = useState();

    const { addToast } = useToasts();

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setStatePreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    async function getEventos() {
        await api("eventos", {
            method: "GET",
            headers: {
                'Authorization': token,
            },
            
        }).then(reposta => {
            setEventos(reposta.data.content);
        });
    }

    useEffect(() => {
        getEventos();
    }, [])


    async function sendNewPost(e) {
        // PARA ENVIAR POST
        e.preventDefault();

        let descricao = e.target.descricao.value;
        let eventoPub = e.target.eventoPub.value.split("-");

        console.log(eventoPub);

        const date = new Date();

        let today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        let formData = new FormData();

        let data = {
            descricao,
            dataPostagem: today,
            publicacaoPai: {
                id: eventoPub[1]
            },
            evento: {
                id: eventoPub[0]
            },
            usuario: {
                idUsuario: cookieUser.idUsuario
            }
        }
        console.log(data);
        console.log(cookieUser);
        formData.append('novaPublicacao', JSON.stringify(data))
        formData.append('arquivo', e.target.file_new_post.files[0]);

        let config = {
            url: "/publicacoes/novo",
            method: "POST",
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            data: formData
        }

        await api(config).then((resposta) => {
            addToast('Publicação registrada com sucesso!', { appearance: 'success', autoDismiss: true })
        }).catch((e) => {
            addToast('Opps ... Não foi possível completar sua publicação.', { appearance: 'error', autoDismiss: true })
        });
    }

    return (
        <div className={`${className} container-modal-post`}>
            <div className="content-modal-post">
                <header>
                    <span className="title">Criar um post</span>
                    <BiX size={30} className="close-modal" onClick={closeModalFunction} />
                </header>
                <div className="line"></div>

                <form action="" onSubmit={sendNewPost}>
                    <textarea placeholder={`Olá, ${nameUserLogged}, o que você gostaria de compartilhar?`} name="descricao"></textarea>

                    <div className="input-group">
                        <label htmlFor="senha">
                            <span>Selecione o evento</span>

                            <select className="input-field select" name="eventoPub" id="eventoPub">
                                <option disabled selected>Selecione o evento</option>

                                {
                                    eventos.map(evento => {
                                        return (
                                            <option value={`${evento.evento.id}-${evento.id}`}>{evento.evento.titulo}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="underline"></div>
                        </label>
                    </div>

                    <div className="upload-files">
                        <div className="container-preview">
                            <img src={statePreview} alt="" className="preview" />
                        </div>
                        <input type="file" name="file_new_post" id="" accept="image/*" onChange={imageHandler} />
                        <span className="title-upload">Que tal compartilhar uma foto?</span>
                        <BiUpload size={25} />
                    </div>

                    <button type="submit" className="button-submit-new-post">
                        Enviar
                    </button>
                </form>


            </div>
        </div>
    );
}


export default ModalNewPost;