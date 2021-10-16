import React, { useState, useEffect } from 'react';
import '../global-pages.css';
import './style.css';
import RecuperarSenhaImage from '../../images/RecuperarSenha.png';
import '../global-pages.css';
import InputForm from '../../components/InputForm/InputForm';
import { BiCheck, BiDockBottom, BiKey } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import api from '../../api'
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';


function RecuperarSenha2() {

	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [userData, setUserData] = useState({
		senha: "",
		confirmaSenha: ""
	});

	const { push } = useHistory();
	let history = useHistory();
	const { addToast } = useToasts();

	useEffect(() => {
		async function getFormulario() {

			let urlSenha = document.location.href;
			let regexToken = /\/recuperar-senha-redefinir\/(.*)/
			let token = urlSenha.match(regexToken)[1];

			await api.post(`/usuarios/validarToken/${token}`)
			.then().catch((e) => {
				if(e.response.status === 404){
					history.push("/recuperar-senha/token-invalido");
			}
		});
		}
		getFormulario();
	}, [])

	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
		console.log(newUserData)
	}

	function submitForm(e) {
		e.preventDefault();

		if(userData.senha === '' || userData.confirmaSenha === '') {
			console.log("OPA A MI GÃO PREENCHE Aí")
			addToast('Opa, faltou preencher algo...', {appearance: 'warning', autoDismiss: true})
		} 
		else if(userData.senha != userData.confirmaSenha ){
			addToast('Senhas não coincidem...', {appearance: 'warning', autoDismiss: true})
		}

		else {
			api.post("/usuarios/updateSenha", {
				email: userData.email,
				senha: userData.senha
			}).then((resposta) => {
				if(resposta == 200){
					history.push("/recuperar-senha/sucesso")
				}
		}).catch(err => {
			console.log(err)
			addToast('Algo deu errado... 😥', { appearance: 'error', autoDismiss: true })
		});
	}
}


    return (
		<div className="container">
			<div className="content">
				<img src={RecuperarSenhaImage} aria-hidden alt="Imagem de recuperação de senha" />
			</div>
			<div id="formularioSenha" className="contain-form">
				<div className="information-page">
					<h2 className="title">Olá, vamos criar a sua nova senha</h2>
					<span className="subtitle">Digite sua nova senha</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>
                    <InputForm 
						type="password"
						id="senha"
						name="senha"
						label="Sua nova senha"
						icon={<BiKey className="icon-input-group" />}
						function={(e) => handle(e)}
					/>

                    <InputForm 
						type="password"
						id="confirmaSenha"
						name="confirmaSenha"
						label="Confirme sua nova senha"
						icon={<BiCheck className="icon-input-group" />}
						function={(e) => handle(e)}
					/>
				
					<button type="submit" className="btn-new-submit">Confirmar</button>
				</form>

			</div>
		</div>

	);
}

export default RecuperarSenha2;