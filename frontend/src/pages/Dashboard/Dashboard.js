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
import LineFilledChart from '../../components/ChartsComponents/LineChart';
import BarChart from '../../components/ChartsComponents/BarChart';
import ScatterVoluntariosTempoDeCasa from '../../components/ChartsComponents/ScatterVoluntariosTempoDeCasa';
import BarTurnover from '../../components/ChartsComponents/BarTurnover';
import './styles/dashboard.css';
import AlluvialVoluntarios from '../../components/ChartsComponents/AlluvialVoluntarios';

const Dashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
    const [periodoAluvial, setPeriodoAluvial] = useState(0);
    const [perfilConsulta, setPerfilConsulta] = useState("perfil-comparativo");
    const [dataPerfil, setDataPerfil] = useState([]);
    const [dataUsuariosNivel, setDataUsuariosNivel] = useState([]);
    const [dataAderenciaOvertime, setDataAderenciaOvertime] = useState([]);
    const [eventoFiltrar, setEventoFiltrar] = useState("");
    const [dataDistribuicaoCategoria, setDataDistribuicaoCategoria] = useState([]);
    const [dataDistribuicaoArea, setDataDistribuicaoArea] = useState([]);

    useEffect(() => {
        api('/dash/distribuicao-area', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataDistribuicaoArea(resposta.data);
        })
    }, [])

    useEffect(() => {
        api('/dash/distribuicao-categoria', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataDistribuicaoCategoria(resposta.data);
        })
    }, [])

    useEffect(() => {
        api('/dash/aderencia-overtime', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataAderenciaOvertime(resposta.data);
        })
    }, [])

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
                            <span className="indicator">
                                {!dataUsuariosNivel.length ?
                                    0
                                    :
                                    dataUsuariosNivel
                                        .filter(data => data.categoria == "1")
                                        .pop().quantidadeVoluntarios
                                }
                            </span>
                            <div className="icon-box heart">
                                <BiHeart size={30} />
                            </div>
                        </div>
                        <div className="box-leading-indicator">
                            <span className="title">Total de voluntários ativos</span>
                            <span className="indicator positive">
                                {!dataUsuariosNivel.length ?
                                    0
                                    :
                                    dataUsuariosNivel
                                        .filter(data => data.categoria != "0")
                                        .map(data => data.quantidadeVoluntarios)
                                        .reduce(function(acumulador, valorAtual, index, array) {
                                            return acumulador + valorAtual;
                                          })
                                }
                            </span>
                            <div className="icon-box">
                                <BiUserPlus size={30} />
                            </div>
                        </div>
                        <div className="box-leading-indicator">
                            <span className="title">Total de voluntários inativos</span>
                            <span className="indicator">
                               {!dataUsuariosNivel.length ?
                                    0
                                    :
                                    dataUsuariosNivel
                                        .filter(data => data.categoria == "0")
                                        .pop().quantidadeVoluntarios
                                }
                            </span>
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
                                    <option disabled>Selecione o período</option>
                                    <option selected value="perfil-comparativo">Perfil Comparativo</option>
                                    <option value="perfil-ano">Perfil Anual</option>
                                    <option value="perfil-completo">Perfil Completo</option>
                                </select>
                                <div className="chart-canvas one">
                                    {!dataPerfil.length ?
                                        <ReactLoading type="spin" color="#06377B" className="loading-spin" />
                                            :
                                        <LineFilledChart 
                                            fill = {true}
                                            labels = {dataPerfil.map(data => data.label)}
                                            data = {dataPerfil.map(data => data.total)}
                                        />
                                    }
                                </div>
                            </div>

                            <div className="box-chart-right box">
                                <span className="title">Divisão de engajamento por nível</span>
                                
                                <div className="container-canvas">
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
                                </div>
                            </div>
                        </div>

                        <div className="chart">
                        <div className="box-chart-right box">
                                <span className="title">Áreas mais participativas</span>
                                
                                <div className="container-canvas">
                                    <div className="chart-canvas two">
                                        {!dataDistribuicaoArea.length ?
                                            <ReactLoading type="spin" color="#06377B" className="loading-spin" />
                                            :
                                            <DoughnutChart 
                                                labels = {dataDistribuicaoArea.map(data => data.label)}
                                                data = {dataDistribuicaoArea.map(data => data.total)}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="box-chart-left box">
                                <span className="title">Distribuição da participação por categoria</span>
                                <div className="container-canvas">
                                    <div className="chart-canvas one">
                                        <BarChart 
                                            fill={true}
                                            labels = {dataDistribuicaoCategoria.map(data => data.label)}
                                            data = {dataDistribuicaoCategoria.map(data => data.total)}
                                        />
                                    </div>
                                </div>
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
                                    <option disabled>Selecione o período</option>
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
                                <span className="title">Aderencia de eventos x Tempo</span>
                                <select 
                                    className="input-field select" 
                                    name="evento_overtime" 
                                    id="evento_overtime" 
                                    onChange={(e) => setEventoFiltrar(e.target.value)}
                                >
                                    <option disabled>Selecione o evento</option>
                                    {
                                        [...new Set(dataAderenciaOvertime.map(item => item.titulo))]
                                            .map(item => {
                                                return <option value={item}>{item}</option>
                                            })
                                    }
                                </select>
                                <div className="container-canvas">
                                    <div className="chart-canvas one">
                                        <LineFilledChart 
                                            fill={false}
                                            labels={
                                                dataAderenciaOvertime
                                                    .filter(item => item.titulo == eventoFiltrar)
                                                    .sort((a, b) => 
                                                    {   
                                                        let data1 = b.data_fechamento_evento.split("/");
                                                        let data2 = a.data_fechamento_evento.split("/");
                                                        return new Date(data2[2], data2[1], data2[0]) - new Date(data1[2], data1[1], data1[0])
                                                    })
                                                    .map(item => item.data_fechamento_evento)
                                            }
                                            data={
                                                dataAderenciaOvertime
                                                    .filter(item => item.titulo == eventoFiltrar)
                                                    .sort((a, b) => 
                                                    {   
                                                        let data1 = b.data_fechamento_evento.split("/");
                                                        let data2 = a.data_fechamento_evento.split("/");
                                                        return new Date(data1[2], data1[1], data1[0]) - new Date(data2[2], data2[1], data2[0])
                                                    })
                                                    .map(item => item.aderencia)
                                            }
                                        />
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