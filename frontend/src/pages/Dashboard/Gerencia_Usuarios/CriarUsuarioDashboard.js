import React, { useState } from 'react';
import api from '../../../api';
import { useCookies } from 'react-cookie';
import {
	BiBuilding,
	BiDonateHeart,
	BiEnvelope,
	BiKey,
	BiUser
} from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import InputForm from '../../../components/InputForm/InputForm';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import { getURLApi } from '../../../configs/getUrlApi';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

const CriarUsuarioDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [statePreview, setStatePreview] = useState();

	const history = useHistory();
	const { addToast } = useToasts();

	const [userData, setUserData] = useState({
		imagemPerfil: "",
		imagemCapa: "",
		nomeUsuario: "",
		genero: "",
		cargo: "",
		area: "",
		tipoUsuario: "",
		email: "",
		senha: "123"
	});

	const documentHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setStatePreview(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0]);
	}

	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
	}

	async function submitForm(e) {
		e.preventDefault();
		const newUserData = { ...userData }

		//Validação dos campos
		var ValidaEmail = userData.email;
		var ValidaSenha = userData.senha;
		var RegexEmail = /@\w+.com/;
		var TesteRegexEmail = RegexEmail.test(ValidaEmail);

		if (
			ValidaEmail === "" ||
			ValidaSenha === "" ||
			TesteRegexEmail === false
		) {
			addToast('Por favor, preencha todos os campos corretamente. O email deve conter @ e .com', { appearance: 'warning', autoDismiss: true });
		}
		else {
			//Parte para enviar para a API
			await api.post("/usuarios/novo", {
				headers: {
					'Authorization': cookies.volunt3r
				},
				data: newUserData
			})
				.then(resposta => {
					if (resposta.status === 201) {
						addToast('Usuário cadastrado com sucesso!', { appearance: 'success', autoDismiss: true })
						history.push("/login")
					}
				}).catch((e) => {
					if (e.response.status === 406) {
						addToast('Ops... Seu usuário já existe', { appearance: 'error', autoDismiss: true })
					}
				});
		}
	}


	async function createNewUser(e) {
		// PARA ENVIAR POST
		e.preventDefault();

		if (statePreview == null) {
			// Usar formulário
		}

		else {

			let formData = new FormData();

			console.log(e.target);

			formData.append('arquivo', e.target.file_new_users.files[0]);

			let config = {
				url: "/arquivos/upload",
				method: "POST",
				headers: {
					'Authorization': cookies.volunt3r,
					'Content-Type': 'multipart/form-data'
				},
				data: formData
			}

			await api(config).then((resposta) => {
				console.log(resposta)
			}).catch((e) => {
				console.error(e)
			});
		}
	}


	return (
		<div className="container-dashboard">
			<NavBarDashboard
				userpic={getURLApi() + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil}
				username={cookies.volunt3r_user.nomeUsuario}
			/>

			<main className="content-dashboard">
				<div className="subcontent-controller">

					<HeaderWelcomePageDashboard
						username={cookies.volunt3r_user.nomeUsuario}
						subtitle="Que tal criar um usuário?"
					/>

					<form className="form-create" onSubmit={(e) => submitForm(e)}>

						<div className="group-form">
							<InputForm
								type="name"
								id="name"
								name="name"
								label="Nome do usuário"
								icon={<BiUser className="icon-input-group" />}
								function={(e) => handle(e)}
							/>


							<div className="input-group">
								<label htmlFor="senha">
									<span>Qual o gênero?</span>

									<select className="input-field select" name="genero" id="genero" onChange={(e) => handle(e)}>
										<option disabled selected>Selecione seu gênero</option>
										<option value="F">Feminino</option>
										<option value="M">Masculino</option>
										<option value="NB">Não Binário</option>
									</select>
									<div className="underline"></div>
								</label>
							</div>
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="cargo"
								name="cargo"
								label="Cargo do usuário"
								icon={<BiBuilding className="icon-input-group" />}
								function={(e) => handle(e)}
							/>

							<div className="input-group">
								<label htmlFor="area">
									<span>Qual a área?</span>
									<select className="input-field select" name="area" id="area" onChange={(e) => handle(e)}>
										<option disabled selected>Selecione sua área</option>
										<option value="B3 Social">B3 Social</option>
										<option value="Produtos Analytics">Produtos Analytics</option>
										<option value="Listados">Listados</option>
										<option value="Balcão">Balcão</option>
									</select>
									<div className="underline"></div>
								</label>
							</div>
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="email"
								name="email"
								label="Qual o email do usuário?"
								icon={<BiEnvelope className="icon-input-group" />}
								function={(e) => handle(e)}
							/>
							<div className="input-group">
								<label htmlFor="tipoUsuario">
									<span>O usuário é B3 Social?</span>

									<select className="input-field select" name="tipoUsuario" id="tipoUsuario" onChange={(e) => handle(e)}>
										<option disabled selected >Selecione</option>
										<option value="b3_social">Sim</option>
										<option value="comum">Não</option>
									</select>
									<div className="underline"></div>

									<BiDonateHeart className="icon-input-group" />
								</label>
							</div>
							{/* <InputForm
								type="password"
								id="senha"
								name="senha"
								label="Senha para o usuário"
								icon={<BiKey className="icon-input-group" />}
							// function={(e) => handle(e)}
							/> */}
						</div>

						<div className="line-form">
							<span>OU</span>
						</div>

						<div className="submit-file">
							<input name="file_new_users" type="file" id="" onChange={documentHandler} />
						</div>

						<button type="submit" className="btn-new-submit">Cadastrar Novo Usuário</button>
					</form>
				</div>
			</main>
		</div>
	);
}

export default CriarUsuarioDashboard;

