import React, { Component, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';


import NewNavBar from '../../components/NewNavBar/NewNavBar';
import InputForm from '../../components/InputForm/InputForm';


import api from "../../api";
import './style.css';
import CardShop from '../../components/CardShop/CardShop';
// import '../../styles/combo-box-style.css';

// import CardCatalogo from '../../components/CardCatalogo';
// import Combobox from '../../components/Combobox';
// import NavBar from '../../components/componentes/NavBarUI';
// import Menu from '../../components/componentes/MenuUI.js';
function Shop() {
	const [cookies] = useCookies(['volunt3r']);
	const [courses, setCourses] = useState([]);

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/cursos", {
				headers: { 'Authorization': cookies.volunt3r }
			});
			console.log(resposta.data);
			setCourses(resposta.data);
		}

		getAllCards();
	}, [])
	return (

		<>

			<div className="feed-container">
				<div className="feed-content">
					<NewNavBar />

					<div className="description-page">
						<span className="title">Loja</span>
						<span className="description">Que tal trocar as suas milhas?</span>
					</div>


					<div className="search-itens">
						<InputForm
							type="text"
							id="categoriaCurso"
							name="categoriaCurso"
							label="Categoria do curso"

						// function={(e) => handleSearch(e)}
						/>
						<InputForm
							type="text"
							id="ordernarPor"
							name="ordernarPor"
							label="Ordernar por"

						// function={(e) => handleSearch(e)}
						/>
					</div>


					<div className="shop-cards">

						{
							courses.map((course) => {

								return(
									<CardShop 
										title={course.titulo}
										image={course.imagem}
										prince={course.preco}
										time={course.duracao}
										description={course.descricao}
									/>

								);
							})


						}

						

						{/* <span className="not-content">
							Olá, Ainda não temos posts
						</span> */}

						{
							// eventos.map((evento) => {

							// 	if (evento.publicacaoEvento) {
							// 		return (
							// 			<CardFeedEvent
							// 				/*onClick={() => {
							// 					setPublicacaoSelecionada(publicacao);
							// 					abrirModal();
							// 				}}*/
							// 				imagePost={evento.pathImagem}
							// 				nameUserPosted={evento.usuario.nomeUsuario}
							// 				imageUserPosted={evento.usuario.usuarioImagemPerfil}
							// 				areaUserPosted={evento.usuario.area}
							// 				titlePost={evento.titulo}
							// 				addressPost={evento.evento.endereco}
							// 				descriptionPost={evento.descricao}
							// 				countLikes={evento.numeroLikes}
							// 				dataEvent={evento.evento.dataEvento}
							// 			/>
							// 		);

							// 	}
							// })
						}
						{/* <ModalPublicacao exibeModal={modal} funcao={setModal} publicacaoSelecionada={publicacaoSelecionada} /> */}
					</div>
				</div>

			</div>



			{/* <NavBar />
			<Menu />
			<div className="pagina">
				<div className="paginaCentro">
					<h2 className="titulo">Loja</h2>
					<h4 className="subtitulo">Troque suas<span className="textoAzul"> milhas</span> por cursos incríveis!</h4>

					<div className="filtros">
						<b className="filtro1">Categoria</b> <Combobox valor="Todas" nome="Todas" />
						<b className="filtro2">Ordenar por</b> <Combobox valor="Preço" nome="Preço" />

					</div>

					<div className="eventos">
						<CardCatalogo info={cards} isEvento={false} />
					</div>

				</div>

			</div> */}

		</>

	);
}

export default Shop;