import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiEnvelope, BiKey } from 'react-icons/bi';
import InputForm from '../../components/InputForm/InputForm';
import { ToastProvider, useToasts } from 'react-toast-notifications';


import './style.css';
import '../global-pages.css';
import api from "../../api.js";

function CriarUsuarioStep2(props) {

	const history = useHistory();
	const { addToast } = useToasts();


	const [userData, setUserData] = useState({
		nomeUsuario: "",
		genero: "",
		cargo: "",
		area: "",
		tipoUsuario: "",
		email: "",
		senha: "",
	});

	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
	}

	function submitForm(e) {
		e.preventDefault();
		const newUserData = { ...userData, ...props.location.state }
		
		//Parte para enviar para a API
		api.post("/usuarios/novo", newUserData)
			.then(resposta => {
				if (resposta.status == 201) {
					addToast('Usuário Criado com sucesso!', {appearance: 'success', autoDismiss: true})
					history.push("/")
				}
			}).catch((e) => {
				if(e.response.status == 406) {
					addToast('Opps... Seu usuário já existe!', {appearance: 'error', autoDismiss: true})
				}
			});
	}

	return (
		<div className="container">
			<div className="content">
				<img src={LoginAndRegisterImage} />
			</div>
			<div className="contain-form">
				<div className="information-page">
					<h2 className="title">Que bom você quer ser um volunt3r</h2>
					<span className="subtitle">Agora, precisamos dessas informações para o seu login!</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>

					<InputForm
						type="email"
						id="email"
						name="email"
						label="Seu email"
						icon={<BiEnvelope className="icon-input-group" />}
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

					{/* <div className="input-group">
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
					</div> */}
					<button type="submit" className="btn-new-submit">Me Cadastrar</button>

				</form>

				<div className="footer">
					Já tenho uma conta, <Link className="bold" to="/">quero entrar!</Link>
				</div>

			</div>
		</div>
		// <div className="container-page">
		//     <div className="references-voluntier">
		//         <h2 className="title">Volunt3r</h2>
		//         <span>
		//         A plataforma Volunt3r foi feita por alunos da faculdade Bandtec. <br />
		//         Essa <b>incrível</b> plataforma foi a solução encontrada para resolver alguns problemas que a B3 Social sofria.

		//         </span>
		//         <button className="btn">Saiba mais!</button>
		//     </div>
		//     <div className="form-container">
		//         <form onSubmit={(e) => submitForm(e)}>
		//             <fieldset>
		//                 <legend>Agora vamos criar o seu usuário!</legend>

		//                 <div className="input-group">
		//                     <label htmlFor="">
		//                         Seu email
		//                         <input className="input" type="email" name="email" id="email" onChange={(e) => handle(e)} />
		//                     </label>
		//                 </div>

		//                 <div className="input-group">
		//                     <label htmlFor="">
		//                         Sua senha
		//                         <input className="input" type="password" name="senha" id="senha" onChange={(e) => handle(e)} />
		//                     </label>
		//                 </div> 

		//                 <button className="btn-submit" type="submit">Cadastrar-se</button>
		//             </fieldset>
		//         </form>
		//     </div>
		// </div>

	);
}


export default CriarUsuarioStep2;