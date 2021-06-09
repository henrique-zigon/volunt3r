import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import {useCookies} from 'react-cookie';
import './criarEventoPage.css';

import api from '../../api';

const CriarEventoPage = () => {


  const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
  const token = cookies.volunt3r;


  let day = new Date().getDay()
  let month = new Date().getMonth()
  let year = new Date().getFullYear()

  let dataPostagem = day + "/" + month  + "/" + year ;

  const [eventoData, setEventoData] = useState({
      tituloEvento : "",
      descricaoEvento : "",
      imagem : "",
      dataPostagem: dataPostagem,
      publicacaoPai: null,
      maxParticipantes: 0,
      categoriaEvento: 0,
      dataEvento : "",
      dataFechamento : "",
      horas : "",
      categoria: 0,
      idUsuario: cookies.volunt3r_user.idUsuario
  });
  
  let history = useHistory();
  

  function handle(e) {
      const newEventoData = {...eventoData }
      newEventoData[e.target.id] = e.target.value;
      setEventoData(newEventoData);

      console.log(newEventoData)
  }

  function submitForm(e) {
      e.preventDefault();
      
      api.post("/eventos/novo", {
       
        titulo: eventoData.tituloEvento,
        descricao: eventoData.descricaoEvento,
        dataPostagem: eventoData,
        pathImagem: eventoData.imagem,
        publicacaoPai: eventoData.publicacaoPai,
        evento: {
          dataEvento: eventoData.dataEvento,
          dataFechamentoEvento: eventoData.dataFechamento,
          maximoParticipantes: eventoData.maxParticipantes,
          horas: eventoData.horas,
          categoria: {
            idCategoria: eventoData.categoriaEvento
          }
        },
        usuario: {
          idUsuario: eventoData.idUsuario
        }
      },
      {
        headers: {
          Authorization: token
        },
      }
      
      ).then((resposta)=>{

        console.log(resposta)
        // setCookie('volunt3r', resposta.data.token.tipo + " " + resposta.data.token.token, { path: '/' });
        // setCookie('volunt3r_user', resposta.data.user, {path: "/"});
        // history.push("/");
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
          subtitle="Vamos criar um evento novo?"
        />

        
        <fieldset className="container-form">
          <form onSubmit={(e) => submitForm(e)}>
  
            <label htmlFor="tituloEvento">
              Título do evento
              <input type="text" name="tituloEvento" id="tituloEvento" onChange={(e) => handle(e)}  />
            </label>

            <label htmlFor="descricaoEvento">
              Descrição do evento
              <input type="text" name="descricaoEvento" id="descricaoEvento" onChange={(e) => handle(e)}  />
            </label>

            <label htmlFor="imagem">
              URL de uma imagem
                <input type="text" name="imagem" id="imagem" onChange={(e) => handle(e)} />
            </label>

            <label htmlFor="dataEvento">
              Data do evento
                <input type="date" name="dataEvento" id="dataEvento" onChange={(e) => handle(e)}  />
            </label>

            <label htmlFor="dataFechamento">
              Data de fechamento
                <input type="date" name="dataFechamento" id="dataFechamento" onChange={(e) => handle(e)}  />
            </label>

            <label htmlFor="horas">
              Quantas horas vale o evento?
                <input type="number" name="horas" id="horas" min="0" step="any" onChange={(e) => handle(e)} />
            </label>

            <label htmlFor="maxParticipantes">
              Máximo de participantes
                <input type="number" name="maxParticipantes" id="maxParticipantes" min="0" step="any" onChange={(e) => handle(e)} />
            </label>

            <label htmlFor="categoriaEvento">
              Categoria do evento
                <select name="categoriaEvento" id="categoriaEvento" onChange={(e) => handle(e)} >
                <option value="" disabled selected>Seleciona uma categoria</option>
                <option value={1}>Doação</option>
              </select>
            </label>

            <button className="btn-submit-form" type="submit">Enviar</button>
            
          </form>
        </fieldset>
        
      </div>
    </main>
  );
}

export default CriarEventoPage;