import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BiEdit, BiX } from 'react-icons/bi';
import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import SideBar from '../../../components/SideBar/SideBar';

import '../styles/ListarUsuariosDashboard.css';
import api from '../../../api';


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



  return (
    <main className="container">
      <SideBar
        userpic={process.env.REACT_APP_PUBLIC_URL_API + "/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil}
        username={cookies.volunt3r_user.nomeUsuario}
        useremail={cookies.volunt3r_user.email}
      />

      <div className="content">
        <HeaderWelcomePageDashboard
          username={cookies.volunt3r_user.nomeUsuario}
          subtitle="Todos os usuários estão aqui!"
        />

        <div className="container-list-users">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                {/* <th>E-mail</th> */}
                <th>Area</th>
                <th>Quantidade de Milhas</th>
                <th>Tipo</th>
                {/* <th>Editar</th>
                <th>Desativar</th> */}
              </tr>
            </thead>

            <tbody>

              {
                users.map(user => {
                  return (
                    <tr>
                      <td>{user.nomeUsuario}</td>
                      {/* <td>{user.email}</td> */}
                      <td>{user.area}</td>
                      <td>{user.quantidadeMilhas}</td>
                      <td>{user.tipoUsuario}</td>
                      {/* <td><BiEdit size={25}/></td>
                      <td><BiX size={25}/></td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>

  );
}


export default ListarUsuariosDashboard;