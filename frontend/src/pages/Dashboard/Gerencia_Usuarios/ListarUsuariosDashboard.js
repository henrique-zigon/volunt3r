import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BiEdit, BiX } from 'react-icons/bi';
import ReactLoading from 'react-loading';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import api from '../../../api';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import InputForm from '../../../components/InputForm/InputForm';
import { getURLApi } from '../../../configs/getUrlApi';

const ListarUsuariosDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [users, setUsers] = useState([]);

	const [isLoaded, setIsloaded] = useState(false);

	async function getUsers() {
		await api("/usuarios", {
			method: "GET",
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setUsers(resposta.data)
			setIsloaded(true);
		})
	}

	useEffect(() => {
		getUsers();
	}, [])


	function desativarUsuario(nomeUsuario, id) {
		let confirm = window.confirm(`Você deseja desativar o usuário: ${nomeUsuario}`)
		if(confirm) {
			api(`usuarios/desativar/${id}`, {
				method: "DELETE",
				headers: {
					'Authorization': cookies.volunt3r,
					'token': cookies.volunt3r
				}
			}).then(resposta => {
				if(resposta.status === 200) {
					getUsers()
				}
			});
		}
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
						label="Filtrar usuário"
					/>
					{
						!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> :
							<div className={!isLoaded ? "content-list" : "content-list loaded"}>

								<table>
									<thead>
										<tr>
											<td>Nome</td>
											<td>E-mail</td>
											<td>Status</td>
											<td>Editar</td>
											<td>Desativar</td>
										</tr>
									</thead>
									<tbody>

										{
											users.map(user => {
												return (
													<tr>
														<td>{user.nomeUsuario.split(" ")[0] + " " + user.nomeUsuario.split(" ")[1]}</td>
														<td>{user.email}</td>
														<td className={user.statusUsuario == 1 ? "activateduser" : "desactiveUser"}>
															{user.statusUsuario == 1 ? "Ativado" : "Desativado"}
														</td>
														<td>
															<button type="button">
																<BiEdit className="icon-table edit" />
															</button>
														</td>
														<td>
															<button type="button" onClick={(e) => desativarUsuario(user.nomeUsuario, user.idUsuario)}>
																<BiX className="icon-table close " />
															</button>
														</td>
													</tr>

												);

											})
										}
									</tbody>
								</table>
							</div>
					}
				</div>
			</main>
		</div>
	);
}


export default ListarUsuariosDashboard;