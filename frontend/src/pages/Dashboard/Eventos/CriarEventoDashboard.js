import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
	BiCalendar,
	BiUser,
	BiTimeFive,
	BiTrophy,
	BiMap
} from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import InputForm from '../../../components/InputForm/InputForm';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import { getURLApi } from '../../../configs/getUrlApi';
import api from '../../../api';

const CriarEventoDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [statePreview, setStatePreview] = useState();
	const [eventoData, setEventoData] = useState({
		titulo: "",
		dataEvento: "",
		dataFechamentoEvento: "",
		horas: 0.0,
		maximoParticipantes: 0,
		milhasParticipacao: 0,
		endereco: "",
	});
	const[fkCategoria, setFkCategoria] = useState(0);
	const[descricaoEvento, setDescricaoEvento] = useState("");

	function handle(e) {
		const newEventoData = { ...eventoData }
		console.log("handle")
		if(e.target.id == "dataEvento" || e.target.id == "dataFechamentoEvento") {
			let separadorData = e.target.value.split("-");
			newEventoData[e.target.id] = `${separadorData[2]}/${separadorData[1]}/${separadorData[0]}`;
		}else {
			newEventoData[e.target.id] = e.target.value;
		}
		setEventoData(newEventoData);
	}

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
	
	const documentHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setStatePreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    async function createNewEvent(e) {
        // PARA ENVIAR POST
        e.preventDefault();

		if(statePreview == null){
			let formData = new FormData();

			formData.append('arquivo', e.target.foto_evento.files[0]);

			const publiEvento = {
				descricao: descricaoEvento,
				dataPostagem: eventoData.dataEvento,
				publicacaoPai: null,
				evento : {
					titulo: eventoData.titulo,
					dataEvento: eventoData.dataEvento,
					dataFechamentoEvento: eventoData.dataFechamentoEvento,
					endereco: eventoData.endereco,
					horas: eventoData.horas,
					maximoParticipantes: eventoData.maximoParticipantes,
					milhasParticipacao: eventoData.milhasParticipacao,
					categoria: {
						idCategoria: fkCategoria
					}
				},
				usuario: {
					idUsuario: cookies.volunt3r_user.idUsuario
				}
			}
			
			formData.append('novaPublicacaoEvento', JSON.stringify(publiEvento));

			let config = {
				url: "/eventos/novo",
				method: "POST",
				headers: {
					'Authorization': cookies.volunt3r,
					'Content-Type': 'multipart/form-data'
				},
				data:formData
			}

			await api(config).then(resposta => {
				console.log(resposta)
			}).catch((err) => {
				console.log(err)
			})
		}
		else{
        
        let formData = new FormData();

		console.log(e.target);

        formData.append('arquivo', e.target.file_new_events.files[0]);

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


	// function criarEvento(e) {
	// 	e.preventDefault();

	// 	// api("/eventos/novo", {
	// 	// 	method: "POST",
	// 	// 	headers: {
	// 	// 		'Authorization': cookies.volunt3r
	// 	// 	}
	// 	// }).then(resposta => {
	// 	// })


	// }


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

					<form className="form-create" onSubmit={createNewEvent}>
						
						<div className="submit-file">
							<label htmlFor="">Selecione a imagem do evento</label>
							<input id="foto_evento" type="file" name="foto_evento"/>
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="titulo"
								name="titulo"
								label="Título do evento"
								function={(e) => handle(e)}
							/>

							<InputForm
								type="text"
								id="descricao"
								name="descricao"
								label="Descrição"
								function={e => {
									setDescricaoEvento(e.target.value)
								}}
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
								id="dataEvento"
								name="dataEvento"
								label="Data de abertura do evento"
								icon={<BiCalendar className="icon-input-group" />}
								function={(e) => handle(e)}
							/>

							<InputForm
								type="date"
								id="dataFechamentoEvento"
								name="dataFechamentoEvento"
								label="Data de fechamento do evento"
								icon={<BiCalendar className="icon-input-group" />}
								function={(e) => handle(e)}
							/>
							
						</div>

						<div className="group-form">
							<InputForm
								type="text"
								id="maximoParticipantes"
								name="maximoParticipantes"
								label="Máximo de participantes."
								icon={<BiUser className="icon-input-group" />}
								function={(e) => handle(e)}
							/>

							<InputForm
								type="text"
								id="horas"
								name="horas"
								label="Quantas horas vale o evento?"
								icon={<BiTimeFive className="icon-input-group" />}
								function={(e) => handle(e)}
							/>

							<InputForm
								type="text"
								id="milhasParticipacao"
								name="milhasParticipacao"
								label="Quantas milhas o usuário recebe?"
								icon={<BiTrophy className="icon-input-group" />}
								function={(e) => handle(e)}
							/>
							<div className="input-group">
								<label htmlFor="tipoUsuario">
									<span>Qual a Categoria do Evento?</span>

									<select className="input-field select" name="tipoUsuario" id="tipoUsuario" 
										onChange={(e) => {
											setFkCategoria(e.target.value);
										}}>
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
						<div className="group-form">
							<InputForm
								type="text"
								id="endereco"
								name="endereco"
								label="Endereço onde acontecerá o evento, se houver"
								icon={<BiMap className="icon-input-group" />}
								function={(e) => handle(e)}
							/>
						</div>
						<div className="line-form">
							<span>OU</span>
						</div>

						<div className="submit-file">
							<input type="file" id="" name="file_new_events" onChange={documentHandler}/>
						</div>

						<button type="submit" className="btn-new-submit">Cadastrar Novo Evento</button>
					</form>
				</div>
			</main>
		</div>
	);
}


export default CriarEventoDashboard;

