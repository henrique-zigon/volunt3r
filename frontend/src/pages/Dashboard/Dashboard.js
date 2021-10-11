import React from 'react';

import './styles/dashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import { BiUserPlus, BiUserMinus, BiHeart } from 'react-icons/bi';
import DoughnutDivisaoEngajamento from '../../components/ChartsComponents/DoughnutDivisaoEngajamento';
import LineAcompanhamentoEventoTempo from '../../components/ChartsComponents/LineAcompanhamentoEventoTempo';
import ScatterVoluntariosTempoDeCasa from '../../components/ChartsComponents/ScatterVoluntariosTempoDeCasa';
import BarTurnover from '../../components/ChartsComponents/BarTurnover';
import { useCookies } from 'react-cookie';


const Dashboard = () => {
  const [cookies] = useCookies(['volunt3r_user']);
  return(
    <main className="container">
      <SideBar 
        userpic={process.env.REACT_APP_PUBLIC_URL_API+"/arquivos/imagem/"+cookies.volunt3r_user.imagemPerfil}
        username={cookies.volunt3r_user.nomeUsuario}
        useremail={cookies.volunt3r_user.email}
      />

      <div className="content">
        <HeaderWelcomePageDashboard 
          username={cookies.volunt3r_user.nomeUsuario}
          subtitle="Seus dados estão por aqui!"
        />

        <div className="container-charts">
          <div className="leading-indicators">
            <div className="box-leading-indicator">
              <span className="title">Quantidade de voluntários <strong>N1</strong></span>
              <span className="indicator">50</span>
              <div className="icon-box heart">
                <BiHeart size={30} />
              </div>
            </div>
            <div className="box-leading-indicator">
              <span className="title">Total de voluntários ativos</span>
              <span className="indicator positive">1.125</span>
              <div className="icon-box">
                <BiUserPlus size={30} />
              </div>
            </div>
            <div className="box-leading-indicator">
              <span className="title">Total de voluntários inativos</span>
              <span className="indicator">5</span>
              <div className="icon-box inactive">
                <BiUserMinus size={30} />
              </div>
            </div>
          </div>

          <div className="content-charts">
            <div className="container-chart-left">
              <div className="box-chart-left">
                <span className="title">Acompanhamento de um evento durante o tempo</span>
                <div className="chart-left">
                  <LineAcompanhamentoEventoTempo />
                </div>
              </div>
              <div className="box-chart-left">
                <span className="title">Turnover</span>
                <div className="chart-left">
                  <BarTurnover />
                </div>
              </div>

              <div className="box-chart-left">
                <span className="title">Voluntários tempo de casa</span>
                <div className="chart-left">
                  <ScatterVoluntariosTempoDeCasa />
                </div>
              </div>
            </div>

            <div className="container-chart-right">
              <div className="box-chart-right">
                <span className="title">Divisão de engajamento</span>
                <div className="chart-right">
                  <DoughnutDivisaoEngajamento/> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  );

}

export default Dashboard;