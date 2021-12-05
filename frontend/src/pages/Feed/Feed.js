import React, { useRef, useState, useEffect } from 'react';
import { BiSend, BiExit } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';
import fotoPadrao from '../../images/foto_padrao.png';
import RecommendedEvents from '../../components/RecommendedEvents/recommendedEvents'

import ReactLoading from 'react-loading';

import './style.css';
import CardCommentOrPost from '../../components/CardCommentOrPost/CardCommentOrPost';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import ModalNewPost from '../../components/ModalNewPost/ModalNewPost';
import { getURLApi } from '../../configs/getUrlApi';

function Feed(props) {

	const [cookies, setCookie, removeCookie]= useCookies(['volunt3r', 'volunt3r_user']);
	const [cookies_user] = useCookies(['volunt3r_user']);
	//Paginação
	const loadMoreRef = useRef(null);
	const [currentPage, setCurrentPage] = useState(-1);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0
		};

		const observer = new IntersectionObserver((entities) => {
			const target = entities[0];
			console.log(target)

			if(target.isIntersecting) {
				setCurrentPage(old => old + 1);
			}
		}, options);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}
	}, [])


	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : `${getURLApi()}/arquivos/imagem/` + cookies.volunt3r_user.imagemPerfil;

	const [publicacoes, setPublicacoes] = useState([]);

	const [stateModalNewPost, setStateModalNewPost] = useState("");

	const [isLoaded, setIsloaded] = useState(false);

	function showModalNewPost () {
		setStateModalNewPost("show");
	}

	function closeDropdown() {
		setStateModalNewPost("");
	};

	useEffect(() => {
		console.log(currentPage)
		async function getAllPublicacoes() {
			api.get(`/publicacoes`, {
				params: {pagina : currentPage, tamanho: 10},
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {	
				setPublicacoes([...publicacoes, ...resposta.data.content]);
			}).catch(err => {
				console.log("Deu erro"+err)
			});
		}

		getAllPublicacoes();
	}, [currentPage])

	// Foto de Perfil
	let nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	let regexNomeSobrenome = /(\w+\s\w+)/
	let NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);


	return (
		<>
			<ModalNewPost className={stateModalNewPost} nameUserLogged={NomeSobrenome[0]} closeModalFunction={closeDropdown} cookieUser={cookies.volunt3r_user} token={cookies.volunt3r} />
			<div className="feed-container">

				{/* <UserImage imagem={imageUser} nome={NomeSobrenome[1]} /> */}
				<NewNavBar 
					userpic={imageUser}
				/>

				<div className="feed-content">
				
					<div className="new-post">
						<img className="user-picture"
							src={imageUser}
							alt=""
						/>
						<button type="button" onClick={showModalNewPost} >  Que tal compartilhar a sua experiência?</button>

					</div>
					<RecommendedEvents />

					{
						<>
						<div className="feed-cards">
							{
								publicacoes.map((publicacao) => {
									if (publicacao.publicacaoEvento) {
										return (
											<CardFeedEvent
												imagePost={publicacao.pathImagem == null ? fotoPadrao : `${getURLApi()}/arquivos/imagem/` + publicacao.pathImagem}
												nameUserPosted={publicacao.usuario.nomeUsuario}
												imageUserPosted={publicacao.usuario.usuarioImagemPerfil == null ? avatarPadrao : `${getURLApi()}/arquivos/imagem/` + publicacao.usuario.usuarioImagemPerfil}
												areaUserPosted={publicacao.usuario.area}
												titlePost={publicacao.evento.titulo}
												addressPost={publicacao.evento.endereco}
												descriptionPost={publicacao.descricao}
												hashtags={publicacao.hashtags}
												countLikes={publicacao.numeroLikes}
												countRelatedPosts={publicacao.numeroComentarios}
												dataEvent={publicacao.evento.dataEvento}
												idPost={publicacao.id}
												idLoggedUser = {cookies_user.volunt3r_user.idUsuario}
												token = {cookies.volunt3r}
												isLikedPost={publicacao.curtido}
												isSubscribe={publicacao.evento.inscrito}
												idEvent={publicacao.evento.id}
												inscritos={publicacao.evento.inscritos}
											/>
										);

									} else {
										return (
											<CardCommentOrPost
											    imagePost={publicacao.pathImagem == null ? fotoPadrao :  publicacao.pathImagem}
												nameUserPosted={publicacao.usuario.nomeUsuario}
												areaUserPosted={publicacao.usuario.area}
												imageUserPosted={publicacao.usuario.usuarioImagemPerfil == null ? avatarPadrao : `${getURLApi()}/arquivos/imagem/` + publicacao.usuario.usuarioImagemPerfil}
												descriptionPost={publicacao.descricao}
												hashtags={publicacao.hashtags}
												postedIn={publicacao.evento === null ? "" : publicacao.evento.titulo}
												countLikes={publicacao.numeroLikes}
												countComments={publicacao.numeroComentarios}
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
						<ReactLoading type="spin" color="#06377B" className="loading-spin" />
						</>
					}
				</div>
				<div >
					<p ref={loadMoreRef}>Carregando mais publicações...</p>
				</div>
			</div>
		</>
	);
}

export default Feed;