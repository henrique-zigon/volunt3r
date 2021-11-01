import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
	BiCalendar,
	BiUser,
	BiTimeFive
} from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import InputForm from '../../../components/InputForm/InputForm';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import { getURLApi } from '../../../configs/getUrlApi';
import api from '../../../api';

const CriarEventoDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);

	const [categorias, setCategorias] = useState([]);

	function getCategorias() {
		api("/eventos/categorias", {
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setCategorias(resposta.data)
		})
	}
	

	function criarEvento(e) {
		e.preventDefault();

		// api("/eventos/novo", {
		// 	method: "POST",
		// 	headers: {
		// 		'Authorization': cookies.volunt3r
		// 	}
		// }).then(resposta => {
		// })


	}


	useEffect(() => {
		getCategorias();
	}, [])


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
						subtitle="Que tal criar um novo evento?"
					/>

					<form className="form-create" onSubmit={(e) => criarEvento(e)}>
						
						<div className="submit-file">
							<label htmlFor="">Selecione a imagem do evento</label>
							<input type="text" id="foto_evento" type="file" />
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="titulo"
								name="titulo"
								label="Título do evento"
							/>

							<InputForm
								type="text"
								id="descricao"
								name="descricao"
								label="Descrição"
							/>

							{/* <div className="input-group">
								<label htmlFor="senha">
									<span>Qual o gênero?</span>

									<select className="input-field select" name="genero" id="genero">
										<option disabled selected>Selecione seu gênero</option>
										<option value="F">Feminino</option>
										<option value="M">Masculino</option>
										<option value="NB">Não Binário</option>
									</select>
									<div className="underline"></div>
								</label>
							</div> */}
						</div>

						<div className="group-form">
							<InputForm
								type="date"
								id="data_evento_abertura"
								name="data_evento_abertura"
								label="Data de abertura do evento"
								icon={<BiCalendar className="icon-input-group" />}
							// function={(e) => handle(e)}
							/>

							<InputForm
								type="date"
								id="data_evento_fechamento"
								name="data_evento_fechamento"
								label="Data de fechamento do evento"
								icon={<BiCalendar className="icon-input-group" />}
							
							/>
							
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="maxParticipantes"
								name="maxParticipantes"
								label="Máximo de participantes."
								icon={<BiUser className="icon-input-group" />}
							// function={(e) => handle(e)}
							/>

							<InputForm
								type="text"
								id="horasEvento"
								name="horasEvento"
								label="Quantas horas vale o evento?"
								icon={<BiTimeFive className="icon-input-group" />}
							// function={(e) => handle(e)}
							/>
							<div className="input-group">
								<label htmlFor="tipoUsuario">
									<span>Qual a Categoria do Evento?</span>

									<select className="input-field select" name="tipoUsuario" id="tipoUsuario">
										<option disabled selected >Selecione</option>

										{
											categorias.map(categoria => {
												return(
													<option value={categoria.idCategoria}>{categoria.nomeCategoria}</option>
												);
											})
										}
								
									</select>
									<div className="underline"></div>
								</label>
							</div>
						</div>

						<div className="line-form">
							<span>OU</span>
						</div>

						<div className="submit-file">
							<input type="text" type="file" />
						</div>

						<button type="submit" className="btn-new-submit">Cadastrar Novo Evento</button>
					</form>
				</div>
			</main>
		</div>
	);
}


export default CriarEventoDashboard;

