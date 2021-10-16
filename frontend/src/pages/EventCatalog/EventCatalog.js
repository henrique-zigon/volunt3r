import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';
import InputForm from '../../components/InputForm/InputForm';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';

import './style.css';
import '../global-pages.css';

//import { BiImageAdd, BiSend, BiHeart } from 'react-icons/bi';

import UserImage from '../../components/UserImage/UserImage';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

function EventCatalog() {
	const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);
	const [cookies_user] = useCookies(['volunt3r_user']);
	const [eventos, setEventos] = useState([]);
	const { addToast } = useToasts();


	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : `${process.env.REACT_APP_PUBLIC_URL_API}/arquivos/imagem/` + cookies.volunt3r_user.imagemPerfil;

	function handleSearch(e) {	
		console.log()
		let filtro = e.target.value

		if(filtro === ""){
			addToast('Adicione um filtro...', { appearance: 'warning', autoDismiss: true })
		}
		else{
		api.get(`/publicacoes/filtroEventos/${filtro}`, {
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			if(resposta == 200){
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

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/eventos", { params: {pagina : 0, tamanho: 10},
				headers: { 'Authorization': cookies.volunt3r }
			});
			setEventos(resposta.data.content.reverse());
		}

		getAllCards();
	}, [])


	// function filtrarEventos(e){
	// 	console.log(e)
	// 	// const eventosFiltrados = api.post(`/publicacoes/filtroEventos/${e}`);
	
	// }


	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexNomeSobrenome = /(\w+\s\w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (

		<>

			<div className="feed-container">

			<UserImage imagem={imageUser} nome={NomeSobrenome[1]} />

				<div className="feed-content">
					<NewNavBar />

					<div className="description-page">
						<span className="title">Eventos</span>
						<span className="description">Que tal abraçar uma causa? 😉</span>
					</div>

					<div className="search-itens">
						<InputForm 
							type="text"
							id="filtro"
							name="filtro"
							label="Busque por um evento usando uma palavra-chave"

							function={(e) => handleSearch(e)}
						/>
					</div>


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
											imageUserPosted={`${process.env.REACT_APP_PUBLIC_URL_API}/arquivos/imagem/` + evento.usuario.usuarioImagemPerfil}
											areaUserPosted={evento.usuario.area}
											titlePost={evento.evento.titulo}
											addressPost={evento.evento.endereco}
											descriptionPost={evento.descricao}
											countLikes={evento.numeroLikes}
											countRelatedPosts={evento.numeroComentarios}
											dataEvent={evento.evento.dataEvento}
											idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
											token = {cookies.volunt3r}
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
						{/* <ModalPublicacao exibeModal={modal} funcao={setModal} publicacaoSelecionada={publicacaoSelecionada} /> */}
					</div>
				</div>

			</div>
		</>
	);
}

export default EventCatalog;