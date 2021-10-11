import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import './styles/relatorioPage.css';
import api from '../../api';
import TransformFile from '../../utils/TransformFile';
import { useCookies } from 'react-cookie';

const RelatorioPage = () => {


  const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);

  const token = cookies.volunt3r;

  async function getArquivoFuncionariosTxt () {
  
    api.get("arquivos/funcionarios-txt", {
      headers: {
        Authorization: token
      }
    }).then((response) => {

      let blob = new Blob([response.data], {
        type: "application/txt"
      })

      let url = window.URL.createObjectURL(blob);
      TransformFile(url, "funcionarios.txt")
      
      console.log(response.data);
    })
  }

  async function getArquivoFuncionariosCSV () {
  
    api.get("arquivos/funcionarios-csv", {
      headers: {
        Authorization: token
      }
    }).then((response) => {

      let blob = new Blob([response.data], {
        type: "text/csv"
      })

      let url = window.URL.createObjectURL(blob);
      TransformFile(url, "funcionarios.csv")
      
      console.log(response.data);
    })
  }

  async function getArquivoEventosTXT () {
  
    api.get("arquivos/eventos-txt", {
      headers: {
        Authorization: token
      }
    }).then((response) => {

      let blob = new Blob([response.data], {
        type: "application/txt"
      })

      let url = window.URL.createObjectURL(blob);
      TransformFile(url, "eventos.txt")
      
      console.log(response.data);
    })
  }


  async function getArquivoEventosCSV () {
  
    api.get("arquivos/eventos-csv", {
      headers: {
        Authorization: token
      }
    }).then((response) => {

      let blob = new Blob([response.data], {
        type: "text/csv"
      })

      let url = window.URL.createObjectURL(blob);
      TransformFile(url, "eventos.csv")
      
      console.log(response.data);
    })
  }


  return(
    <main className="container">
      <SideBar 
        userpic={cookies.volunt3r_user.imagemPerfil}
        username={cookies.volunt3r_user.nomeUsuario}
        useremail={cookies.volunt3r_user.email}
      />
      <div className="content">
        <HeaderWelcomePageDashboard
          username={cookies.volunt3r_user.nomeUsuario}
          subtitle="Vamos exportar ou importar dados?"
        />

        <div className="buttons-group">
          <button className="button" onClick={getArquivoEventosTXT}>
            Exportar Eventos .TXT
          </button>
          <button className="button" onClick={getArquivoEventosCSV}>
            Exportar Eventos .CSV
          </button>
          <button className="button" onClick={getArquivoFuncionariosTxt}>
            Exportar Funcionários .TXT
          </button>
          <button className="button" onClick={getArquivoFuncionariosCSV}>
            Exportar Eventos .CSV
          </button>
        </div>
      </div>
    </main>
    
  );
}


export default RelatorioPage;