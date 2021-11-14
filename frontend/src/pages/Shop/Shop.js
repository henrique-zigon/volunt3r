import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import ReactLoading from 'react-loading';

import NewNavBar from '../../components/NewNavBar/NewNavBar';
import InputForm from '../../components/InputForm/InputForm';

import api from "../../api";
import './style.css';
import CardShop from '../../components/CardShop/CardShop';

import UserImage from '../../components/UserImage/UserImage';
import avatarPadrao from '../../images/avatar_padrao.png';
import { getURLApi } from '../../configs/getUrlApi';

function Shop() {
	const [cookies] = useCookies(['volunt3r']);
	const [courses, setCourses] = useState([]);
	const imageUser = cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : getURLApi + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil;
	const [isLoaded, setIsloaded] = useState(false);

	function handleSearch(e) {
		let filtro = e.target.value
		api.get(`/cursos/filtroLoja/${filtro}`, {
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setCourses(resposta.data.content);
		}).catch(err => {
			console.log(err)
		});
	}


	useEffect(() => {

		async function getAllCards() {
			const resposta = await api.get("/cursos", {
				params: { pagina: 0, tamanho: 10 },
				headers: { 'Authorization': cookies.volunt3r }
			});
			setCourses(resposta.data.content);
			setIsloaded(true);
		}

		getAllCards();
	}, [])


	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexNomeSobrenome = /(\w+\s\w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (

		<>
			<div className="feed-container">
				<NewNavBar 
					userpic={imageUser}
				/>

				<div className="feed-content">
					<div className="description-page">
						<span className="title">Loja</span>
						<span className="description">Que tal trocar as suas milhas?</span>
					</div>

					<div className="search-itens">
						<InputForm
							type="text"
							id="filtro"
							name="filtro"
							label="Pesquise um curso"

							function={(e) => handleSearch(e)}
						/>
					</div>

					{
						!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> :
						
						<div className="shop-cards">

							{
								courses.map((course) => {

									return (
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
					}

				</div>

			</div>
		</>
	);
}

export default Shop;