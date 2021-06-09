import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function CriarUsuarioStep2(props) {


    const [userData, setUserData] = useState({
        nome: "",
        genero: "",
        cargo: "",
        area: "",
        tipoUsuario: "",
        email: "",
        senha: "",
    })

    function handle(e) {
        const newUserData = {...userData }
        newUserData[e.target.id] = e.target.value;
        setUserData(newUserData);
    }

    
    function submitForm(e) {
        e.preventDefault();
        const newUserData = {...userData, ...props.location.state }

        /* 
        * Aqui estou realizando a destruturação do array newUserData!
        * Isso pode ajudar na hora de enviar o json para a API
        */
        const {
            nome,
            genero,
            cargo,
            area,
            tipoUsuario,
            email,
            senha,
        } = newUserData;


        /**
         * Utilizar a const acima porque está com todas as infos
         * Verifique o conteúdo da variável com o console.log(newUserData)
         * nesse trexo do códico :D
         */

        // Parte para enviar para a API
        
    }

    return (
        <div className="container-page">
            <div className="references-voluntier">
                <h2 className="title">Volunt3r</h2>
                <span>
                A plataforma Volunt3r foi feita por alunos da faculdade Bandtec. <br />
                Essa <b>incrível</b> plataforma foi a solução encontrada para resolver alguns problemas que a B3 Social sofria.
                
                </span>
                <button className="btn">Saiba mais!</button>
            </div>
            <div className="form-container">
                <form onSubmit={(e) => submitForm(e)}>
                    <fieldset>
                        <legend>Agora vamos criar o seu usuário!</legend>
                       
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

                        <button className="btn-submit" type="submit">Cadastrar-se</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}


export default CriarUsuarioStep2;