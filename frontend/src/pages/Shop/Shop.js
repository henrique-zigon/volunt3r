import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';


import NewNavBar from '../../components/NewNavBar/NewNavBar';
import InputForm from '../../components/InputForm/InputForm';

import api from "../../api";
import './style.css';
import CardShop from '../../components/CardShop/CardShop';

import UserImage from '../../components/UserImage/UserImage';
import avatarPadrao from '../../images/avatar_padrao.png';

function Shop() {
	const [cookies] = useCookies(['volunt3r']);
	const [courses, setCourses] = useState([]);
	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/cursos", {
				headers: { 'Authorization': cookies.volunt3r }
			});
			setCourses(resposta.data);
		}

		getAllCards();
	}, [])

	return (
		<>
			<div className="feed-container">

				<UserImage imagem={imageUser} nome={cookies.volunt3r_user.nomeUsuario} />

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
					</div>
				</div>

			</div>
		</>
	);
}

export default Shop;