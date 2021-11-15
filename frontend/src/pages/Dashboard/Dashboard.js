import React from 'react';
import { useCookies } from 'react-cookie';
import {
    BiUserPlus,
    BiHeart,
    BiUserMinus

} from 'react-icons/bi';

import { getURLApi } from '../../configs/getUrlApi';

import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import NavBarDashboard from '../../components/NavBarDashboard/NavBarDashboard';
import DoughnutDivisaoEngajamento from '../../components/ChartsComponents/DoughnutDivisaoEngajamento';
import LineAcompanhamentoEventoTempo from '../../components/ChartsComponents/LineAcompanhamentoEventoTempo';
import ScatterVoluntariosTempoDeCasa from '../../components/ChartsComponents/ScatterVoluntariosTempoDeCasa';
import BarTurnover from '../../components/ChartsComponents/BarTurnover';
import './styles/dashboard.css';
import AlluvialVoluntarios from '../../components/ChartsComponents/AlluvialVoluntarios';

const Dashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);

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
                        subtitle="Bem-vindo(a) à Dashboard"
                    />

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

                    <div className="principal-charts">

                        <div className="chart">
                            <div className="box-chart-left box">
                                <span className="title">Acompanhamento de um evento durante o tempo</span>
                                <div className="chart-canvas one">
                                    <LineAcompanhamentoEventoTempo />
                             
                                </div>
                            </div>

                            <div className="box-chart-right box">
                                <span className="title">Divisão de engajamento</span>
                                <div className="container-canvas">
                                    <div className="chart-canvas two">
                                        <DoughnutDivisaoEngajamento />
                                    </div>
                                </div>
                            </div>
                        </div>

                
                        <div className="chart one">
                            <div className="box-chart-left box">
                            <span className="title">Perfil Voluntários</span>
                            <div className="container-canvas">
                                <div className="chart-canvas one">
                                     <AlluvialVoluntarios />
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="chart one">
                            <div className="box-chart-left box">
                                <span className="title">Voluntários por tempo de casa</span>
                                <div className="container-canvas">
                                    <div className="chart-canvas one">
                                        <ScatterVoluntariosTempoDeCasa />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>


        </div>
    );
}

export default Dashboard;