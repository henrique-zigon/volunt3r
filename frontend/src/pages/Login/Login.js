import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../global-pages.css';
import './style.css';
import api from '../../api'
import { useCookies } from 'react-cookie';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiEnvelope, BiKey } from 'react-icons/bi';

import { ToastProvider, useToasts } from 'react-toast-notifications';
import InputForm from '../../components/InputForm/InputForm';


function Login() {

	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [userData, setUserData] = useState({
		email: "",
		senha: ""
	});

	let history = useHistory();
	const { addToast } = useToasts();


	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
		console.log(newUserData)
	}

	function submitForm(e) {
		e.preventDefault();




		if( userData.email === '' || userData.senha === '') {
			console.log("OPA AMIGÃO PREENCHE Aí")
			addToast('Opps... Preencha os campos!', {appearance: 'error', autoDismiss: true})
		} else {


			api.post("/usuarios/login", {
				email: userData.email,
				senha: userData.senha
			}).then((resposta) => {
				setCookie('volunt3r', resposta.data.token.tipo + " " + resposta.data.token.token, { path: '/' });
				setCookie('volunt3r_user', resposta.data.user, { path: "/" });
				history.push("/");
			})

		}


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
					<InputForm 
						type="email"
						id="email"
						name="email"
						label="Seu email"
						icon={<BiEnvelope  className="icon-input-group"/>}
						function={(e) => handle(e)}
					/>
					<InputForm 
						type="password"
						id="senha"
						name="senha"
						label="Sua senha"
						icon={<BiKey className="icon-input-group" />}
						function={(e) => handle(e)}
					/>

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