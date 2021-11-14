import React, {useState} from 'react';
import api from '../../../api';
import { useCookies } from 'react-cookie';

import HeaderWelcomePageDashboard from '../../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import NavBarDashboard from '../../../components/NavBarDashboard/NavBarDashboard';
import { getURLApi } from '../../../configs/getUrlApi';
import '../styles/relatorioPage.css';
import TransformFile from '../../../utils/TransformFile';

const RelatorioGeral = () => {
	const [cookies] = useCookies(['volunt3r']);

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
						subtitle="Que tal baixar alguns relatórios?"
					/>

					<div className="content-reports">

						<div className="report">
							<span>Voluntários</span>

							<div className="buttons-report">
								<button className="button" onClick={getArquivoFuncionariosCSV}>
									Exportar Voluntários em .csv
								</button>
								<button className="button" onClick={getArquivoFuncionariosTxt}>
									Exportar Funcionários .TXT
								</button>
							</div>
						</div>


						<div className="report">
							<span>Eventos</span>

							<div className="buttons-report">
							<button className="button" onClick={getArquivoEventosTXT}>
								Exportar Eventos .txt
							</button>
							<button className="button" onClick={getArquivoEventosCSV}>
								Exportar Eventos .csv
							</button>
							</div>
						</div>
						
					</div>
				</div>
			</main>
		</div>
	);
}


export default RelatorioGeral;

