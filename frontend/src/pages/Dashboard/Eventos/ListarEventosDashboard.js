import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BiEdit, BiX } from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import '../styles/eventos.css';
import api from '../../../api';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import InputForm from '../../../components/InputForm/InputForm';


const ListarEventosDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [eventos, setEventos] = useState([]);

	useEffect(() => {

		api("/eventos", {
			method: "GET",
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setEventos(resposta.data.content)
		})
	}, [])


	function generateQrCode(idEvento) {
		// Para gerar o QRCODE
	}

	return (

		<div className="container-dashboard">
			<NavBarDashboard
				userpic={process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil}
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

					<div className="content-list-users">
						<table>
							<thead>
								<tr>
									<td>Descrição</td>
									<td>Data Término</td>
									<td>Qtd Comentarios</td>
									<td>Qtd Likes</td>
									<td>Qtd Inscritos</td>
									<td>Gerar QRCODE</td>
									<td>Editar</td>
									<td>Excluir</td>
								</tr>
							</thead>
							<tbody>

								{
									eventos.map(evento => {
										return (
											<tr>
												<td>{ evento.evento.titulo.substr(0, 25)+"..." }</td>
												<td>{ evento.evento.dataFechamentoEvento }</td>
												<td>{ evento.numeroComentarios }</td>
												<td>{ evento.numeroLikes }</td>
												<td>{ evento.evento.numeroInscritos }</td>
												<td>
													<button type="button" className="generate-qrcode" onClick={(e) => generateQrCode(evento.evento.id)}>
														Gerar QR Code
													</button>
												</td>
												<td>
													<button type="button">
														<BiEdit className="icon-table edit" />
													</button>
												</td>
												<td>
													<button type="button">
														<BiX className="icon-table close "/>
													</button>
												</td>
											</tr>

										);
									
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
}


export default ListarEventosDashboard;