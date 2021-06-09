import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import api from '../../api'
import { useCookies } from 'react-cookie';



function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r']);
    const [userData, setUserData] = useState({
        email: "",
        senha: ""
    });
    removeCookie('volunt3r');
    console.log(cookies.volunt3r);
    let history = useHistory();
    

    function handle(e) {
        const newUserData = {...userData }
        newUserData[e.target.id] = e.target.value;
        setUserData(newUserData);
    }

    function submitForm(e) {
        e.preventDefault();
        
        api.post("/usuarios/login",{
            email:userData.email,
            senha:userData.senha 
        }).then((resposta)=>{
            setCookie('volunt3r', resposta.data.tipo + " " + resposta.data.token, { path: '/' });
            console.log("o login foi enviado: ",resposta);
            history.push("/");
        })

        /* 
        * Aqui estou realizando a destruturação do array newUserData!
        * Isso pode ajudar na hora de enviar o json para a API
        */
        // const {
        //     email,
        //     senha,  
        // } = userData;


    }

    return (
        <div className="container-page">
            <div className="references-voluntier">
                <h2 className="title">Volunt3r</h2>
                <span>
                    Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Natus ut nulla e
                    xercitationem, incidunt commodi necessitatibus!
                    Aperiam molestias non suscipit quibusdam, pariatur eius aspernatur minus dolore, beatae at veritatis ducimus assumenda.
                
                </span>
                <button className="btn">Saiba mais!</button>
            </div>
            <div className="form-container">
                <form onSubmit={(e) => submitForm(e)}>
                    <fieldset>
                        <legend>Olá, você voltou! <br></br> Sentimos saudades...</legend>
                        <div className="input-group">
                            <label htmlFor="">
                                Seu email
                                <input className="input" type="email" name="email" id="email" onChange={(e) => handle(e)} />
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">
                                Sua senha
                                <input className="input" type="password" name="senha" id="senha" onChange={(e) => handle(e)} />
                            </label>
                        </div>
                        
                        <button className="btn-submit">Logar na Volunt3r</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}

export default Login;