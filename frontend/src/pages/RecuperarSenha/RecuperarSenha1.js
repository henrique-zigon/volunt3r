import React, { useState } from 'react';
import '../global-pages.css';
import './style.css';
import RecuperarSenhaImage from '../../images/RecuperarSenha.png';
import { BiEnvelope } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import '../global-pages.css';
import api from '../../api'
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';
import InputForm from '../../components/InputForm/InputForm';


function RecuperarSenha() {

	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [userData, setUserData] = useState({
		email: "",
		senha: "",
		confirmaSenha: ""
	});

	const { push } = useHistory();
	let history = useHistory();
	const { addToast } = useToasts();


	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
		console.log(newUserData)
	}


	async function submitForm(e) {
		e.preventDefault();

		//Validação de Email
		var Email = userData.email;
		var RegexEmail = /@\w+.com/;
		var TesteRegexEmail = RegexEmail.test(Email);

		if(userData.email === '' || TesteRegexEmail === false) {
			console.log("OPA A MI GÃO PREENCHE Aí")
			addToast('Por favor, preencha todos os campos corretamente. O email deve conter @ e .com', {appearance: 'warning', autoDismiss: true});
		} 
	
		else {
			await api.post(`/usuarios/email-existente/${Email}`)
			.then(resposta => {
				if (resposta.status === 200) {
					history.push("/recuperar-senha/email")
				}
			}).catch((e) => {
				if(e.response.status === 404) {
					addToast('Email não encontrado 😕', {appearance: 'error', autoDismiss: true})
				}
			});

		}
	}

    return (
		<div className="container">
			<div className="content">
            <img src={RecuperarSenhaImage} aria-hidden alt="Imagem de recuperação de senha" />
			</div>
			<div className="contain-form">
				<div className="information-page">
					<h2 className="title">Olá, vamos recuperar a sua senha?</h2>
					<span className="subtitle">Qual o seu e-mail?</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>
					<InputForm 
						type="text"
						id="email"
						name="email"
						label="Seu email"
						icon={<BiEnvelope  className="icon-input-group"/>}
						function={(e) => handle(e)}
					/>
				
			
					<button type="submit" className="btn-new-submit">Continuar</button>
				
				</form>

			</div>
		</div>

	);
}

export	default RecuperarSenha;