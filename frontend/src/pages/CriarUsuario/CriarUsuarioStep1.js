import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function CriarUsuarioStep1() {


    const [userData, setUserData] = useState({
        nome: "",
        genero: "",
        cargo: "",
        area: "",
        tipoUsuario: "",
    });


    function handle(e) {
        const newUserData = {...userData }
        newUserData[e.target.id] = e.target.value;
        console.log(newUserData)
        setUserData(newUserData);
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
                <form>
                    <fieldset>
                        <legend>Olá, precisamos de algumas informações suas!</legend>
                        <div className="input-group">
                            <label htmlFor="">
                                Seu nome
                                <input className="input" type="text" name="nome" id="nome" onChange={(e) => handle(e)} />
                            </label>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="">
                                Seu gênero
                                <select className="input" name="genero" id="genero" onChange={(e) => handle(e)}>
                                    <option value="" disabled>Selecione o seu gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </label>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">
                                Seu cargo
                                <select className="input" name="cargo" id="cargo" onChange={(e) => handle(e)}>
                                    <option value="" disabled>Selecione o seu cargo</option>
                                    <option value="Estagiário">Estagiário</option>
                                    <option value="Analista I">Analista I</option>
                                    <option value="Analista II">Analista II</option>
                                    <option value="Analista III">Analista III</option>
                                    <option value="Superintendente">Superintendente</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">
                                Sua área
                                <select className="input" name="area" id="area" onChange={(e) => handle(e)}>
                                    <option value="" disabled>Selecione sua área</option>
                                    <option value="Produtos Analytics">Produtos Analytics</option>
                                    <option value="Listados">Listados</option>
                                    <option value="Balcão">Balcão</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">
                                Tipo de usuário
                                <select className="input" name="tipoUsuario" id="tipoUsuario" onChange={(e) => handle(e)}>
                                    <option value="" disabled>Selecione o tipo do usuário</option>
                                    <option value="b3_social">B3 Social</option>
                                    <option value="comum">Comum</option>
                                </select>
                            </label>
                        </div>
                       
                        <Link to={{
                                pathname: "register/step2",
                                state: userData
                            }} 
                            className="btn-submit">Continuar
                        </Link>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}


export default CriarUsuarioStep1;