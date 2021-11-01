import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BiEdit, BiX } from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import '../styles/ListarUsuariosDashboard.css';
import api from '../../../api';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import InputForm from '../../../components/InputForm/InputForm';


const ListarUsuariosDashboard = () => {
	const [cookies] = useCookies(['volunt3r_user']);
	const [users, setUsers] = useState([]);

	useEffect(() => {

		api("/usuarios", {
			method: "GET",
			headers: {
				'Authorization': cookies.volunt3r
			}
		}).then(resposta => {
			setUsers(resposta.data)
		})
	}, [])


	function desativarUsuario(id) {
		console.log(id)
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
						label="Filtrar usuário"
					/>

					<div className="content-list-users">
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

										console.log(user)

										return (
											<tr>
												<td>{user.nomeUsuario.split(" ")[0] + " " + user.nomeUsuario.split(" ")[1]}</td>
												<td>{ user.email }</td>
												<td className={user.statusUsuario == 1 ? "activateduser" : "desactiveUser"}>
													{ user.statusUsuario == 1 ? "Ativado" : "Desativado" }
												</td>
												<td>
													<button type="button" onClick={(e) => desativarUsuario(user.idUsuario)}>
														<BiEdit className="icon-table edit" />
													</button>
												</td>
												<td>
													<button type="button" onClick={(e) => desativarUsuario(user.idUsuario)}>
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



		// <main className="container">
		//   <SideBar
		//     userpic={process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil}
		//     username={cookies.volunt3r_user.nomeUsuario}
		//     useremail={cookies.volunt3r_user.email}
		//   />

		//   <div className="content">
		//     <HeaderWelcomePageDashboard
		//       username={cookies.volunt3r_user.nomeUsuario}
		//       subtitle="Todos os usuários estão aqui!"
		//     />


		//   </div>
		// </main>

	);
}


export default ListarUsuariosDashboard;