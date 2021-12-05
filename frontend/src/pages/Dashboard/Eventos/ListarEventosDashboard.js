import React, { useRef, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BiEdit, BiX } from 'react-icons/bi';
import ReactLoading from 'react-loading';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import '../styles/eventos.css';
import api from '../../../api';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import InputForm from '../../../components/InputForm/InputForm';
import { getURLApi } from '../../../configs/getUrlApi';
import { useHistory } from 'react-router';

const ListarEventosDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [eventos, setEventos] = useState([]);
	const [isLoaded, setIsloaded] = useState(false);
	const history = useHistory();
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
		api("/eventos", {
			method: "GET",
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setEventos([...eventos, ...resposta.data.content]);
			setIsloaded(true);
		});
	}, [currentPage])


	function generateQrCode(idEvento, nomeEvento) {
		history.push(`/dashboard/eventos/QRCode/${idEvento}`, nomeEvento)
	}

	return (

		<div className="container-dashboard">
			<NavBarDashboard
				userpic={getURLApi() + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil}
				username={cookies.volunt3r_user.nomeUsuario}
			/>

			<main className="content-dashboard">
				<div className="subcontent-controller">

					<HeaderWelcomePageDashboard
						username={cookies.volunt3r_user.nomeUsuario}
						subtitle="Aqui está a lista de usuários!"
					/>

					<InputForm
						type="filtro"
						id="filtro"
						name="filtro"
						label="Filtrar evento"
					/>

					{
						!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> :
							<div className={!isLoaded ? "content-list-users" : "content-list loaded"}>
								<table>
									<thead>
										<tr>
											<td>Descrição</td>
											<td>Data Término</td>
											<td>Qtd Comentarios</td>
											<td>Qtd Likes</td>
											<td>Qtd Inscritos</td>
											<td>Gerar QRCODE</td>
											{/* <td>Editar</td>
											<td>Excluir</td> */}
										</tr>
									</thead>
									<tbody>

										{
											eventos.map(evento => {
												return (
													<tr>
														<td>{evento.evento.titulo.substr(0, 25) + "..."}</td>
														<td>{evento.evento.dataFechamentoEvento}</td>
														<td>{evento.numeroComentarios}</td>
														<td>{evento.numeroLikes}</td>
														<td>{evento.evento.numeroInscritos}</td>
														<td>
															<button type="button" className="generate-qrcode" onClick={(e) => generateQrCode(evento.evento.id, evento.evento.titulo)}>
																Gerar QR Code
															</button>
														</td>
														{/* <td>
															<button type="button">
																<BiEdit className="icon-table edit" />
															</button>
														</td> */}
														{/* <td>
															<button type="button">
																<BiX className="icon-table close " />
															</button>
														</td> */}
													</tr>

												);

											})
										}
									</tbody>
								</table>
								<ReactLoading type="spin" color="#06377B" className="loading-spin" />
							</div>
					}
<div >
					<p ref={loadMoreRef}>Carregando mais publicações...</p>
				</div>
				</div>
			</main>
		</div>
	);
}


export default ListarEventosDashboard;