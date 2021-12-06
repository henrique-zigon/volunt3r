import React, { useRef, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ReactLoading from 'react-loading';

import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardPerfil from '../../components/CardPerfil/CardPerfil'
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';
import capaPadrao from '../../images/capa_padrao.png';
import './style.css';
import CardCommentOrPost from '../../components/CardCommentOrPost/CardCommentOrPost';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';
import { getURLApi } from '../../configs/getUrlApi';



function Perfil(props) {

	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const [publicacoes, setPublicacoes] = useState([]);

	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : getURLApi + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;
	const [isLoaded, setIsloaded] = useState(false);
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

	useEffect(() => {
		async function getAllPublicacoes() {
			api.get(`/publicacoes/usuario/${cookies.volunt3r_user.idUsuario}`, {
				params: { pagina: currentPage, tamanho: 10 },
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setPublicacoes([...publicacoes, ...resposta.data.content]);
				setIsloaded(true);
			}).catch(err => {
				console.log("Deu erro" + err)
			});
		}

		getAllPublicacoes();
	}, [currentPage])


	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexPrimeiroNome = /(^\w+)/
	var primeiroNome = nomeCompleto.match(regexPrimeiroNome);
	var regexUltimoNome = /(\w+$)/
	var ultimoNome = nomeCompleto.match(regexUltimoNome);
	var nomeSobrenome = primeiroNome[1] +" "+ ultimoNome[1];


	return (
		<>

			<div className="feed-container">

				<NewNavBar
					userpic={imageUser}
				/>

				<div className="feed-content">
					<div>
						<CardPerfil icone={cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : getURLApi() + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil} nome={nomeSobrenome} cargo={cookies.volunt3r_user.cargo} cover={cookies.volunt3r_user.imagemCapa == null ? capaPadrao : getURLApi + "/arquivos/imagem/" + cookies.volunt3r_user.imagemCapa} bio={cookies.volunt3r_user.bio} milhas={cookies.volunt3r_user.quantidadeMilhas} />
					</div>


					{
						!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> :

							<div className="feed-cards">

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
													imageUserPosted={getURLApi + "/arquivos/imagem/" + publicacao.usuario.usuarioImagemPerfil}
													areaUserPosted={publicacao.usuario.area}
													titlePost={publicacao.evento.titulo}
													addressPost={publicacao.evento.endereco}
													descriptionPost={publicacao.descricao}
													countLikes={publicacao.numeroLikes}
													countRelatedPosts={publicacao.numeroComentarios}
													dataEvent={publicacao.evento.dataEvento}
													idPost={publicacao.id}
													idLoggedUser={cookies_user.volunt3r_user.idUsuario}
													token={cookies.volunt3r}
													isLikedPost={publicacao.curtido}
													hashtags={publicacao.hashtags}
												/>
											);

										} else {
											return (
												<CardCommentOrPost
													imagePost={publicacao.pathImagem}
													nameUserPosted={publicacao.usuario.nomeUsuario}
													imageUserPosted={`${getURLApi}/arquivos/imagem/` + publicacao.usuario.usuarioImagemPerfil}
													descriptionPost={publicacao.descricao}
													postedIn={publicacao.evento === null ? "" : publicacao.evento.titulo}
													countLikes={publicacao.numeroLikes}
													countComments={publicacao.numeroComentarios}
													idPost={publicacao.id}
													idLoggedUser={cookies_user.volunt3r_user.idUsuario}
													token={cookies.volunt3r}
													isLikedPost={publicacao.curtido}
													hashtags={publicacao.hashtags}
												/>
											);
										}
									})
								}
								<ReactLoading type="spin" color="#06377B" className="loading-spin" />
								<div >
									<p ref={loadMoreRef}>Carregando mais publicações...</p>
								</div>
							</div>
							
					}
				</div>

			</div>
		</>
	);
}

export default Perfil;