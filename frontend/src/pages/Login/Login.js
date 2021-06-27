import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../global-pages.css';
import './style.css';
import api from '../../api'
import { useCookies } from 'react-cookie';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiEnvelope, BiKey } from 'react-icons/bi';



function Login() {
	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [userData, setUserData] = useState({
		email: "",
		senha: ""
	});
	let history = useHistory();


	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
	}

	function submitForm(e) {
		e.preventDefault();

		api.post("/usuarios/login", {
			email: userData.email,
			senha: userData.senha
		}).then((resposta) => {
			setCookie('volunt3r', resposta.data.token.tipo + " " + resposta.data.token.token, { path: '/' });
			setCookie('volunt3r_user', resposta.data.user, { path: "/" });
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
		<div className="container">
			<div className="content">
				<img src={LoginAndRegisterImage} />
			</div>
			<div className="contain-form">
				<div className="information-page">
					<h2 className="title">Olá, bem vindo(a) de volta</h2>
					<span className="subtitle">vamos fazer login?</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>
					<div className="input-group">
						<label htmlFor="email">
							<span>Seu email</span>
							<input className="input-field" type="email" name="email" id="email" onChange={(e) => handle(e)} />
							<div className="underline"></div>
							<BiEnvelope className="icon-input-group" />
						</label>
					</div>
					<div className="input-group">
						<label htmlFor="senha">
							<span>Sua senha</span>
							<input className="input-field" type="password" name="senha" id="senha" onChange={(e) => handle(e)} />
							<div className="underline"></div>
							<BiKey className="icon-input-group" />
						</label>
					</div>

					<button type="submit" className="btn-new-submit">Entrar</button>
				</form>

				<div className="footer">
					Não tenho uma conta, <Link className="bold" to="/register">quero criar uma!</Link>
				</div>

			</div>
		</div>

	);
}

export default Login;