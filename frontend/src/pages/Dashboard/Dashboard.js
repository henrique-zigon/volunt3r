import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {
    BiUserPlus,
    BiHeart,
    BiUserMinus

} from 'react-icons/bi';
import api from '../../api';
import { getURLApi } from '../../configs/getUrlApi';

import ReactLoading from 'react-loading';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import NavBarDashboard from '../../components/NavBarDashboard/NavBarDashboard';
import DoughnutChart from '../../components/ChartsComponents/DoughnutChart';
import LineAcompanhamentoEventoTempo from '../../components/ChartsComponents/LineAcompanhamentoEventoTempo';
import LineFilledChart from '../../components/ChartsComponents/LineFilledChart';
import ScatterVoluntariosTempoDeCasa from '../../components/ChartsComponents/ScatterVoluntariosTempoDeCasa';
import BarTurnover from '../../components/ChartsComponents/BarTurnover';
import './styles/dashboard.css';
import AlluvialVoluntarios from '../../components/ChartsComponents/AlluvialVoluntarios';
import WordCloud from '../../components/ChartsComponents/WordCloud';

const Dashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
    const [periodoAluvial, setPeriodoAluvial] = useState(0);
    const [perfilConsulta, setPerfilConsulta] = useState("perfil-comparativo");
    const [dataPerfil, setDataPerfil] = useState([]);
    const [dataUsuariosNivel, setDataUsuariosNivel] = useState([]);

    useEffect(() => {

        api('/dash', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataUsuariosNivel(resposta.data);
			// setDataChart(resposta.data.map(a => (a.quantidadeVoluntarios)));
			// setLabel(resposta.data.map(a => (a.categoria)));
        })
    }, [])

    useEffect(() => {

        api(`/dash/${perfilConsulta}`, {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            console.log(resposta.data.map(d => d.label));
			setDataPerfil(resposta.data);
        })
    }, [perfilConsulta])

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
                                <span className="title">Distribuição de perfil em 2021</span>
                                <select 
                                    className="input-field select" 
                                    name="distribuicao_perfil" 
                                    id="distribuicao_perfil" 
                                    onChange={(e) => setPerfilConsulta(e.target.value)}
                                >
                                    <option disabled selected>Selecione o período</option>
                                    <option selected value="perfil-comparativo">Perfil Comparativo</option>
                                    <option value="perfil-ano">Perfil Anual</option>
                                    <option value="perfil-completo">Perfil Completo</option>
                                </select>
                                <div className="chart-canvas one">
                                    {!dataPerfil.length ?
                                        <ReactLoading type="spin" color="#06377B" className="loading-spin" />
                                            :
                                        <LineFilledChart 
                                            labels = {dataPerfil.map(data => data.label)}
                                            data = {dataPerfil.map(data => data.total)}
                                        />
                                    }
                                </div>
                            </div>

                            <div className="box-chart-right box">
                                <span className="title">Divisão de engajamento</span>
                                {/*Está faltando valores no banco da AWS para plotar esse jovem aqui */}
                                {/* <div className="container-canvas">
                                    <div className="chart-canvas two">
                                        {!dataUsuariosNivel.length ?
                                            <ReactLoading type="spin" color="#06377B" className="loading-spin" />
                                            :
                                            <DoughnutChart 
                                                labels = {dataUsuariosNivel.map(data => data.categoria)}
                                                data = {dataUsuariosNivel.map(data => data.quantidadeVoluntarios)}
                                            />
                                        }
                                    </div>
                                </div> */}
                            </div>
                        </div>

                
                        <div className="chart one">
                            <div className="box-chart-left box">
                                <span className="title">Fluxo dos níveis dos usuários</span>
                                <select 
                                    className="input-field select" 
                                    name="ano_aluvial" 
                                    id="ano_aluvial" 
                                    onChange={(e) => setPeriodoAluvial(e.target.value)}
                                >
                                    <option disabled selected>Selecione o período</option>
                                    <option selected value="0">Todos</option>
                                    <option value="1">2019-2020</option>
                                    <option value="2">2020-2021</option>
                                </select>
                            <div className="container-canvas">
                                <div className="chart-canvas one">
                                     <AlluvialVoluntarios periodo={periodoAluvial}/>
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

                        
                        <div className="chart one">
                            <div className="box-chart-left box">
                                <span className="title">Hashtags mais usadas</span>
                                <div className="container-canvas">
                                    <div className="chart-canvas one">
                                        <figure class="highcharts-figure">
                                        <div id="container"></div>
                                        <WordCloud grafico={'container'}/>
                                        </figure>
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