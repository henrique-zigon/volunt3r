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
		console.log()
		let filtro = e.target.value
		api.get(`/publicacoes/filtroEventos/${filtro}`, {
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			console.log(resposta)
		}).catch(err => {
			console.log(err)
		});
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
	var regexNomeSobrenome = /(\w+ \w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (

		<>

			<div className="feed-container">

			<UserImage imagem={imageUser} nome={NomeSobrenome[1]} />

				<div className="feed-content">
					<NewNavBar />

					<div className="search-itens">
						<InputForm 
							type="text"
							id="filtro"
							name="filtro"
							label="Pesquise um evento"

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