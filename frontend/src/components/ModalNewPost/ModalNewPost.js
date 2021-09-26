import React, { useState } from 'react';
import { BiX, BiUpload } from 'react-icons/bi'
import './ModalNewPost.css';


const ModalNewPost = (props) => {


    const { className, modalRef, nameUserLogged, closeModalFunction } = props;

    const [statePreview, setStatePreview] = useState();

    const [stateModalNewPostA, setStateModalNewPostA] = useState(className);

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setStatePreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function sendNewPost() {
        // PARA ENVIAR POST

    }  

    return (
        <div className={`${className} container-modal-post`}>
            <div className="content-modal-post">
                <header>
                    <span className="title">Criar um post</span>
                    <BiX size={30} className="close-modal" onClick={closeModalFunction} />
                </header>
                <div className="line"></div>
                <textarea placeholder={`Olá ${nameUserLogged}, o que você gostaria de compartilhar?`}></textarea>

                <div className="upload-files">
                    <div className="container-preview">
                        <img src={statePreview} alt="" className="preview"/>
                    </div>
                    <input type="file" name="file-new-post" id="" accept="image/*" onChange={imageHandler}/>
                    <span className="title-upload">Que tal compartilhar uma foto?</span>
                    <BiUpload size={25}/>
                </div>

                <button type="button" className="button-submit-new-post" onClick={sendNewPost}>
                    Enviar
                </button>
            </div>
        </div>
    );
}


export default ModalNewPost;