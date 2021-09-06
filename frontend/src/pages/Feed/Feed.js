import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';

import './style.css';
import CardCommentOrPost from '../../components/CardCommentOrPost/CardCommentOrPost';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';

function Feed(props) {

	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;

	const [publicacoes, setPublicacoes] = useState([]);

	useEffect(() => {
		async function getAllPublicacoes() {
			api.get("/publicacoes", {
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setPublicacoes(resposta.data.reverse());
			}).catch(err => {
				console.log("Deu erro"+err)
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
								if (publicacao.publicacaoEvento) {
									return (
										<CardFeedEvent
											/*onClick={() => {
												setPublicacaoSelecionada(publicacao);
												abrirModal();
											}}*/
											imagePost={publicacao.pathImagem}
											nameUserPosted={publicacao.usuario.nomeUsuario}
											imageUserPosted={"http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + publicacao.usuario.usuarioImagemPerfil}
											areaUserPosted={publicacao.usuario.area}
											titlePost={publicacao.titulo}
											addressPost={publicacao.evento.endereco}
											descriptionPost={publicacao.descricao}
											countLikes={publicacao.numeroLikes}
											dataEvent={publicacao.evento.dataEvento}
											idPost={publicacao.id}
											idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
											token = {cookies.volunt3r}
										/>
									);

								} else {
									return (
										<CardCommentOrPost
											imagePost={publicacao.pathImagem}
											nameUserPosted={publicacao.usuario.nomeUsuario}
											imageUserPosted={"http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + publicacao.usuario.usuarioImagemPerfil}
											descriptionPost={publicacao.descricao}
											postedIn={publicacao.publicacaoPai.titulo}
											countLikes={publicacao.numeroLikes}
											idPost={publicacao.id}
											idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
											token = {cookies.volunt3r}
										/>
									);
								}
							})
						}
					</div>
				</div>

			</div>
		</>
	);
}

export default Feed;