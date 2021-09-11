import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import InputForm from '../../components/InputForm/InputForm';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';

import './style.css';
import '../global-pages.css';

//import { BiImageAdd, BiSend, BiHeart } from 'react-icons/bi';

import UserImage from '../../components/UserImage/UserImage';

function EventCatalog() {
	const [cookies] = useCookies(['volunt3r']);
	const [eventos, setEventos] = useState([]);

	const URL_API = "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/";

	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;
	


	function handleSearch(e) {
		console.log(e.target.value)
	}

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/eventos", {
				headers: { 'Authorization': cookies.volunt3r }
			});
			setEventos(resposta.data);
		}

		getAllCards();
	}, [])

	return (

		<>

			<div className="feed-container">

				<UserImage imagem={imageUser} nome={cookies.volunt3r_user.nomeUsuario} />

				<div className="feed-content">
					<NewNavBar />

					<div className="search-itens">
						<InputForm 
							type="text"
							id="categoriaEvento"
							name="categoriaEvento"
							label="Categoria do evento"

							function={(e) => handleSearch(e)}
						/>
						<InputForm 
							type="text"
							id="tipoDoacao"
							name="tipoDoacao"
							label="Tipo de doação"

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
											/*onClick={() => {
												setPublicacaoSelecionada(publicacao);
												abrirModal();
											}}*/
											imagePost={evento.pathImagem}
											nameUserPosted={evento.usuario.nomeUsuario}
											imageUserPosted={URL_API+evento.usuario.usuarioImagemPerfil}
											areaUserPosted={evento.usuario.area}
											titlePost={evento.titulo}
											addressPost={evento.evento.endereco}
											descriptionPost={evento.descricao}
											countLikes={evento.numeroLikes}
											dataEvent={evento.evento.dataEvento}
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