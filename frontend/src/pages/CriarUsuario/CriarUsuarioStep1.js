import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiUser, BiBuilding, BiDonateHeart } from 'react-icons/bi';
import './style.css';
import '../global-pages.css';

function CriarUsuarioStep1() {


	const [userData, setUserData] = useState({
		nomeUsuario: "",
		genero: "",
		cargo: "",
		area: "",
		tipoUsuario: "",
	});


	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
		console.log(newUserData)
	}


	return (
		<div className="container">
				<div className="content">
					<img src={LoginAndRegisterImage} />
				</div>
				<div className="contain-form">
					<div className="information-page">
						<h2 className="title">Que bom você quer ser um volunt3r</h2>
						<span className="subtitle">Precisamos saber um pouco sobre você!</span>
					</div>

					<form>
						<div className="input-group">
							<label htmlFor="nomeUsuario">
								<span>Seu nome</span>
								<input className="input-field" type="text" name="nomeUsuario" id="nomeUsuario" onChange={(e) => handle(e)}/>
								<div className="underline"></div>
								<BiUser className="icon-input-group" />
							</label>
						</div>
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

						<div className="input-group">
							<label htmlFor="nome">
								<span>Qual o seu cargo?</span>
								<input className="input-field" type="text" name="cargo" id="cargo" onChange={(e) => handle(e)}/>
								<div className="underline"></div>
								<BiBuilding className="icon-input-group" />
							</label>
						</div>

						<div className="input-group">
							<label htmlFor="senha">
								<span>Qual a sua área?</span>

								<select className="input-field select"  name="area" id="area" onChange={(e) => handle(e)}>
									<option disabled selected>Selecione sua área</option>
									<option value="B3 Social">B3 Social</option>
									<option value="Produtos Analytcs">Produtos Analytcs</option>
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

						<Link to={{
							pathname: "register/step2",
							state: userData
						}}
						>
							<button type="button" className="btn-new-submit">Continuar</button> 

						</Link>
					</form>

					<div className="footer">
						Já tenho uma conta, <Link className="bold" to="/">quero entrar!</Link>
					</div>

				</div>
			</div>
	);
}


export default CriarUsuarioStep1;