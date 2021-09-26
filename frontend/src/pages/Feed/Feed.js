import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';

import './style.css';
import CardCommentOrPost from '../../components/CardCommentOrPost/CardCommentOrPost';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import ModalNewPost from '../../components/ModalNewPost/ModalNewPost';

import UserImage from '../../components/UserImage/UserImage';

function Feed(props) {

	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;

	const [publicacoes, setPublicacoes] = useState([]);

	const [stateModalNewPost, setStateModalNewPost] = useState("");

	function showModalNewPost () {
		setStateModalNewPost("show");
	}

	function closeDropdown() {
		setStateModalNewPost("");
	};

	useEffect(() => {
		async function getAllPublicacoes() {
			api.get(`/publicacoes`, {
				params: {pagina : 0, tamanho: 10},
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setPublicacoes(resposta.data.content.reverse());
				console.log(resposta.data)
			}).catch(err => {
				console.log("Deu erro"+err)
			});
		}

		getAllPublicacoes();
	}, [])

	// Foto de Perfil
	let nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	let regexNomeSobrenome = /(\w+ \w+)/
	let NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (
		<>
			<ModalNewPost className={stateModalNewPost} nameUserLogged={NomeSobrenome[0]} closeModalFunction={closeDropdown} />
			<div className="feed-container">

				<UserImage imagem={imageUser} nome={NomeSobrenome[1]} />

				<div className="feed-content">
					<NewNavBar />
				

					<div className="new-post">
						{/* <span className="title">postagem</span> */}
						<img className="user-picture"
							src={imageUser}
							alt=""
						/>
						<button type="button" onClick={showModalNewPost} >  Que tal compartilhar a sua experiência?</button>
						{/* <button type="button">
							<BiSend className="icon-submit-image" />
						</button> */}

					</div>

					<div className="feed-cards">

						{/* <span className="not-content">
							Olá, Ainda não temos posts
						</span> */}

						{
							publicacoes.map((publicacao) => {
								// console.log(publicacao);
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
											titlePost={publicacao.evento.titulo}
											addressPost={publicacao.evento.endereco}
											descriptionPost={publicacao.descricao}
											countLikes={publicacao.numeroLikes}
											dataEvent={publicacao.evento.dataEvento}
											idPost={publicacao.id}
											idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
											token = {cookies.volunt3r}
											isLikedPost={publicacao.curtido}
										/>
									);

								} else {
									return (
										<CardCommentOrPost
											imagePost={publicacao.pathImagem}
											nameUserPosted={publicacao.usuario.nomeUsuario}
											imageUserPosted={"http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + publicacao.usuario.usuarioImagemPerfil}
											descriptionPost={publicacao.descricao}
											postedIn={publicacao.evento.titulo}
											countLikes={publicacao.numeroLikes}
											idPost={publicacao.id}
											idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
											token = {cookies.volunt3r}
											isLikedPost={publicacao.curtido}
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