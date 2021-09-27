import api from '../../api';
import React, { useState } from 'react';
import { BiX, BiUpload } from 'react-icons/bi';
import { useToasts } from 'react-toast-notifications';


import './ModalNewPost.css';


const ModalNewPost = (props) => {


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
            if(reader.readyState === 2) {
                setStatePreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    async function sendNewPost(e) {
        // PARA ENVIAR POST
        e.preventDefault();

        let descricao = e.target.descricao.value;

        const date = new Date();

        let hourPosted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let today = date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear() +" "+ hourPosted;

        let formData = new FormData();

        formData.append('arquivo', e.target.file_new_post.files[0]);

        let headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }

        let data = {
            novaPublicacao: {
                descricao,
                dataPostagem: today,
                publicacaoPai: null,
                evento: null,
                usuario: {
                    idUsuario: cookieUser.idUsuario
                },
                tipo: "publicacao"
            },
            arquivo: formData
        }

        await api.post("/publicacoes/novo", data, {
            headers
        }).then((resposta) => {
            console.log(resposta)
        }).catch((e) => {
            console.error(e)
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
                    <textarea placeholder={`Olá ${nameUserLogged}, o que você gostaria de compartilhar?`} name="descricao"></textarea>

                    <div className="upload-files">
                        <div className="container-preview">
                            <img src={statePreview} alt="" className="preview"/>
                        </div>
                        <input type="file" name="file_new_post" id="" accept="image/*" onChange={imageHandler}/>
                        <span className="title-upload">Que tal compartilhar uma foto?</span>
                        <BiUpload size={25}/>
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