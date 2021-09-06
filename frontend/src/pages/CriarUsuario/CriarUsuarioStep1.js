import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiUser, BiBuilding, BiDonateHeart } from 'react-icons/bi';
import InputForm from '../../components/InputForm/InputForm';
//import SelectForm from '../../components/InputForm/SelectForm';

import './style.css';
import '../global-pages.css';
import { useToasts } from 'react-toast-notifications';

function CriarUsuarioStep1() {

	const { addToast } = useToasts();

	const [userData, setUserData] = useState({
		nomeUsuario: "",
		genero: "",
		cargo: "",
		area: "",
		tipoUsuario: "",
	});

	const history =  useHistory();

	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
	}

	
	// Validação do preenchimento dos campos
	function ValidarFormulario(){
	var ValidaNome = userData.nomeUsuario;
	var ValidaGenero = userData.genero;
	var ValidaCargo = userData.cargo;
	var ValidaArea = userData.area;
	var ValidaTipoUsuario = userData.tipoUsuario;
	var CamposValidados = "";
		
	console.log(CamposValidados);

	if(
		ValidaNome === "" || 
		ValidaGenero === "" ||
		ValidaCargo === "" ||
		ValidaArea === "" ||
		ValidaTipoUsuario === ""  

		){
			
		console.log("Hoje Não =(");
		CamposValidados = "Não";
		addToast('Por favor, preencha todos os campos', {appearance: 'warning', autoDismiss: true})
		console.log(CamposValidados);

		console.log(ValidaNome);
		console.log(ValidaGenero);
		console.log(ValidaCargo);
		console.log(ValidaArea);
		console.log(ValidaTipoUsuario);

		
		}

	else{
		console.log(userData);
		console.log("Tudo OK!");
		CamposValidados = "Sim";
		
		
		history.push("/register/step2", userData);

		}
	}

	return (
		<div className="container">
				<div className="content">
					<img src={LoginAndRegisterImage} aria-hidden alt="Register Image"/>
				</div>
				<div className="contain-form">
					<div className="information-page">
						<h2 className="title">Que bom você quer ser um Volunt3r</h2>
						<span className="subtitle">Precisamos saber um pouco sobre você!</span>
					</div>

					<form>
						<InputForm 
							type="text"
							id="nomeUsuario"
							name="nomeUsuario"
							label="Seu nome"
							icon={<BiUser className="icon-input-group" />}
							function={(e) => handle(e)}
						/>
{/* 
						<SelectForm 
							id="genero"
							name="genero"
							label="Qual o seu gênero?"
							icon={<BiUser className="icon-input-group" />}
							function={(e) => handle(e)}
						/> */}

						<div className="input-group">
							<label htmlFor="senha">
								<span>Qual o seu gênero?</span>

								<select className="input-field select"  name="genero" id="genero" onChange={(e) => handle(e)}>
									<option disabled selected>Selecione seu gênero</option>
									<option value="F">Feminino</option>
									<option value="M">Masculino</option>
								</select>
								<div className="underline"></div>
							</label>
						</div>


						<InputForm 
							type="text"
							id="cargo"
							name="cargo"
							label="Qual o seu cargo?"
							icon={<BiBuilding className="icon-input-group" />}
							function={(e) => handle(e)}
						/>

		
						<div className="input-group">
							<label htmlFor="senha">
								<span>Qual a sua área?</span>

								<select className="input-field select"  name="area" id="area" onChange={(e) => handle(e)}>
									<option disabled selected>Selecione sua área</option>
									<option value="B3 Social">B3 Social</option>
									<option value="Produtos Analytics">Produtos Analytics</option>
									<option value="Listados">Listados</option>
									<option value="Balcão">Balcão</option>
								</select>
								<div className="underline"></div>
							</label>
						</div>

						<div className="input-group">
							<label htmlFor="tipoUsuario">
								<span>Sou B3 Social?</span>
								
								<select className="input-field select"  name="tipoUsuario" id="tipoUsuario" onChange={(e) => handle(e)}>
									<option disabled selected >Selecione</option>
									<option value="b3_social">Sim</option>
									<option value="comum">Não</option>
								</select>
								<div className="underline"></div>

								<BiDonateHeart className="icon-input-group" />
							</label>
						</div>

						{/* <Link id="linkRegister" to={{
							pathname: "/register/step2",
							state: userData
						}}
						> */}
							<button type="button" className="btn-new-submit" onClick={ValidarFormulario}>Continuar</button> 

						{/* </Link> */}
					</form>

					<div className="footer">
						Já tenho uma conta, <Link className="bold" to="/">quero entrar!</Link>
					</div>

				</div>
			</div>
	);
}


export default CriarUsuarioStep1;