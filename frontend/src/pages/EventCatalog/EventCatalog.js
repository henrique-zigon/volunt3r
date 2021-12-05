import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';
import InputForm from '../../components/InputForm/InputForm';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';
import RecommendedEvents from '../../components/RecommendedEvents/recommendedEvents'

import ReactLoading from 'react-loading';
import { getURLApi } from '../../configs/getUrlApi';
import './style.css';
import '../global-pages.css';

function EventCatalog() {
	const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);
	const [cookies_user] = useCookies(['volunt3r_user']);
	const [eventos, setEventos] = useState([]);
	const [eventosRecommended, setEventosRecommended] = useState([]);
	const { addToast } = useToasts();


	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : `${getURLApi()}/arquivos/imagem/` + cookies.volunt3r_user.imagemPerfil;

	const [isLoaded, setIsloaded] = useState(false);

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/eventos", {
				params: { pagina: 0, tamanho: 10 },
				headers: { 'Authorization': cookies.volunt3r }
			});
			setEventos(resposta.data.content.reverse());
			setIsloaded(true);
		}
		getAllCards();
	}, [])


	function filtrarEventos(e) {
		console.log()
		let filtro = e.target.value

		if (filtro === "") {
			addToast('Adicione um filtro...', { appearance: 'warning', autoDismiss: true })
		}
		else {
			api.get(`/publicacoes/filtroEventos/${filtro}`, {
				headers: {
					'Authorization': cookies.volunt3r
				}
			}).then(resposta => {

				if (resposta.status == 200) {
					setEventos(resposta.data.content.reverse());
					console.log(resposta)
				}
				// else if (resposta == 204){
				// setEventos= "Não encontramos eventos com esse filtro 😥"
				// }
			}).catch(err => {
				console.log(err)
				addToast('Algo deu errado... 😥', { appearance: 'error', autoDismiss: true })
			});
		}
	}


	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexNomeSobrenome = /(\w+\s\w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (

		<>
			<div className="feed-container">
				<NewNavBar 
					userpic={imageUser}
				/>

				<div className="feed-content">
					<div className="description-page">
						<span className="title">Eventos</span>
						<span className="description">Que tal abraçar uma causa? 😉</span>
					</div>
				
					<RecommendedEvents />


					<div className="search-itens">
						<InputForm
							type="text"
							id="filtro"
							name="filtro"
							label="Busque por um evento usando uma palavra-chave"
							function={(e) => filtrarEventos(e)}

						/>
					</div>

					{
						!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> :
					
						<div className="feed-cards">

							{/* <span className="not-content">
								Olá, Ainda não temos posts
							</span> */}

							{
								eventos.map((evento) => {

									if (evento.publicacaoEvento) {
										return (
											<CardFeedEvent
												imagePost={evento.pathImagem}
												nameUserPosted={evento.usuario.nomeUsuario}
												imageUserPosted={`${getURLApi()}/arquivos/imagem/` + evento.usuario.usuarioImagemPerfil}
												areaUserPosted={evento.usuario.area}
												titlePost={evento.evento.titulo}
												addressPost={evento.evento.endereco}
												descriptionPost={evento.descricao}
												countLikes={evento.numeroLikes}
												countRelatedPosts={evento.numeroComentarios}
												dataEvent={evento.evento.dataEvento}
												idLoggedUser={cookies_user.volunt3r_user.idUsuario}
												token={cookies.volunt3r}
												isLikedPost={evento.curtido}
												isSubscribe={evento.evento.inscrito}
												idEvent={evento.evento.id}
											/>
										);

									} else {
										return;
									}
								})
							}
						</div>
					}	

				</div>
			</div>
		</>
	);
}

export default EventCatalog;