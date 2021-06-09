import React from 'react';
import './style.css';
import CardBranco from '../../components/CardBranco';
import Conquista from '../../components/Conquista';
import Medalha from '../../components/Medalha';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import medalha1 from '../../images/Group 13.png';
import medalha2 from '../../images/Group 14.png';
import medalha3 from '../../images/Meia Medalha.png';

function Achievements() {
    return (
        <>

            <NavBar username="Jon" />
            <Menu />
            <div className="paginaCentroAchievements">

                <div className="perfilUsuario">
                    <div className="imgPerfil">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />
                    </div>

                    <div className="textoPerfil">
                        <h2>Nome</h2>
                        <h3>Titulo</h3>
                    </div>
                </div>

                <img className="imgCapa" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />



                <div className="corpoConquistas">
                    <div className="corpoCentral">
                        <h2 className="tituloConquistas"> Minhas Medalhas </h2>
                        <div className="conquistas">

                            <div className="conquista">
                                <Conquista icone={medalha3} titulo="Doação de sangue" conteudo="UAU! Com mais 3 vc bate o recorde!" completo="80" total="15px" elo="Ouro" />
                            </div>

                            <div className="conquista">
                                <Conquista icone={medalha2} titulo="Doação de cestas" conteudo="Você precisa doar mais 15 cestas, está indo muito bem!" completo="50" elo="Prata" />
                            </div>

                            <div className="conquista">
                                <Conquista icone={medalha1} titulo="Mentorias" conteudo="Você já fez 2 mentorias, mais 3 e subimos de elo \o/" completo="40" elo="Bronze" />
                            </div>

                        </div>
                    </div>

                    <div className="corpoLateral">
                        <div className="corpoEstatisticas">

                            <h2 className="tituloEstatisticas">Estatísticas</h2>

                            <div className="estatisticas">
                                <div className="estatistica">
                                    <CardBranco titulo="5" conteudo="Streak" />
                                </div>

                                <div className="estatistica">
                                    <CardBranco titulo="253h" conteudo="Horas participadas" />
                                </div>

                                <div className="estatistica">
                                    <CardBranco titulo="Doador" conteudo="Ranking" />
                                </div>

                                <div className="estatistica">
                                    <CardBranco titulo="48" conteudo="Eventos participados" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Achievements;