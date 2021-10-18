import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardPerfil from '../../components/CardPerfil/CardPerfil'
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';
import capaPadrao from '../../images/capa_padrao.png';
import './style.css';
import CardCommentOrPost from '../../components/CardCommentOrPost/CardCommentOrPost';
import CardFeedEvent from '../../components/CardFeedEvent/CardFeedEvent';


function Perfil(props) {

	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const [publicacoes, setPublicacoes] = useState([]);

	useEffect(() => {
		async function getAllPublicacoes() {
			api.get(`/publicacoes/usuario/${cookies.volunt3r_user.idUsuario}`, {
				params: { pagina: 0, tamanho: 10 },
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setPublicacoes(resposta.data.content.reverse());
				console.log(resposta.data)
			}).catch(err => {
				console.log("Deu erro" + err)
			});
		}

		getAllPublicacoes();
	}, [])


	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexNomeSobrenome = /(\w+\s\w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);


	return (
		<>

			<div className="perfil-container">


				<div className="perfil-content">
					<NewNavBar />
					<div>
						<CardPerfil icone={cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil} nome={NomeSobrenome[1]} cargo={cookies.volunt3r_user.cargo} cover={cookies.volunt3r_user.imagemCapa == null ? capaPadrao : process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + cookies.volunt3r_user.imagemCapa} bio={cookies.volunt3r_user.bio} milhas={cookies.volunt3r_user.quantidadeMilhas} />
					</div>
					<div className="feed-cards">

						{/* <span className="not-content">
							Olá, Ainda não temos posts
						</span> */}

						{
							publicacoes.map((publicacao) => {
								console.log(publicacao);
								if (publicacao.publicacaoEvento) {
									return (
										<CardFeedEvent
											/*onClick={() => {
												setPublicacaoSelecionada(publicacao);
												abrirModal();
											}}*/
											imagePost={publicacao.pathImagem}
											nameUserPosted={publicacao.usuario.nomeUsuario}
											imageUserPosted={process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + publicacao.usuario.usuarioImagemPerfil}
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
											imageUserPosted={`${process.env.REACT_APP_PUBLIC_URL_API}/arquivos/imagem/` + publicacao.usuario.usuarioImagemPerfil}
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
					</div>


				</div>

			</div>
		</>
	);
}

export default Perfil;