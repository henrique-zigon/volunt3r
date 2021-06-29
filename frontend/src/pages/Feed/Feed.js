import React, { Component, useState, useEffect } from 'react';
import { BiImageAdd, BiSend, BiHeart } from 'react-icons/bi';
import { useCookies } from 'react-cookie';

import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';

import './style.css';

function Feed(props) {
	// const [abrirModalCriacao, setModalCriacao] = useState(false);

	// function abrirModalCriacaoF() {
	// 	setModalCriacao(true);
	// }
	
	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : props.userpic;

	const [publicacoes, setPublicacoes] = useState([]);

	console.log(publicacoes)

	useEffect(() => {
		async function getAllPublicacoes() {
			// console.log("AAA", cookies.volunt3r);
			api.get("/publicacoes", {
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				
				setPublicacoes(resposta.data.reverse());
			}).catch(err => {
				console.log("Deu erro")
			});
		}

		getAllPublicacoes();
	}, [])

	return (
		<>

			<div className="feed-container">
				<div className="feed-content">
					<NewNavBar />

					<div className="new-post">
						{/* <span className="title">postagem</span> */}
						<img className="user-picture"
							// src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
							src={imageUser}
							alt=""
						/>
						<input type="text" placeholder="Que tal compartilhar a sua experiência?" />
						<button type="button">
							<BiSend className="icon-submit-image" />
						</button>
					</div>

					<div className="feed-cards">

						{/* <span className="not-content">
							Olá, Ainda não temos posts
						</span> */}

						{
							publicacoes.map((publicacao) => {
							
								if(publicacao.publicacaoEvento) {
									return(
										<CardFeedEvent
											imagePost={publicacao.pathImagem}
											nameUserPosted={publicacao.usuario.nomeUsuario}
											imageUserPosted={publicacao.usuario.usuarioImagemPerfil}
											areaUserPosted={publicacao.usuario.area}
											titlePost={publicacao.titulo}
											addressPost={publicacao.evento.endereco}
											descriptionPost={publicacao.descricao}
											countLikes={publicacao.numeroLikes}
											dataEvent={publicacao.evento.dataEvento}
										/>
									);
									
								}
							})
						}
					</div>
				</div>

			</div>
		</>

		// <div className="feed">
		// 	<NavBar username="Jon" />
		// 	<ModalCriacao exibeModal={abrirModalCriacao} funcao={setModalCriacao} />
		// 	<Menu />
		// 	<div className="createPublicacao" onClick={() => { abrirModalCriacaoF() }}>
		// 		<img className="iconeClipe" src={imagem15} />
		// 		<textarea className="textAreaCreate" placeholder="Compartilhe uma experiência... =)" />
		// 		<img className="iconeEnviar" src={imagem16} />
		// 	</div>
		// 	<Publicacao />

		// </div>
	);
}

export default Feed;