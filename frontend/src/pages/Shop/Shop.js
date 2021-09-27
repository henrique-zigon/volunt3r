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
	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : process.env.REACT_APP_PUBLIC_URL_API+"/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;

	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/cursos", { params: {pagina : 0, tamanho: 10},
				headers: { 'Authorization': cookies.volunt3r }
			});
			setCourses(resposta.data.content);
		}

		getAllCards();
	}, [])

	function filtrarLoja(e){
	
		const cursosFiltrados = api.post(`/cursos/filtroLoja/${e}`);
		
		
	}

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

					<div className="description-page">
						<span className="title">Loja</span>
						<span className="description">Que tal trocar as suas milhas?</span>
					</div>


					<div className="search-itens">
						<InputForm  onkeyup={filtrarLoja()}
							type="text"
							id="filtroLoja"
							name="filtroLoja"
							label="Pesquise um curso"

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