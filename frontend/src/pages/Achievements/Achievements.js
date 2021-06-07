import React from 'react';
import NavBar from '../../components/componentes/NavBarUI';
import './style.css';
import CardBranco from '../../components/CardBranco';
import Conquista from '../../components/Conquista';
import Medalha from '../../components/Medalha';
import medalha3 from '../../images/Meia Medalha.png';

function Achievements(){
    return(
        <>

        <div className="paginaCentroAchievements">

        <div className="perfilUsuario">
            <div className="imgPerfil">
                <img className='aaaa' src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />
            </div>

            <div className="textoPerfil">
                <h2>Nome</h2>
                <h3>Titulo</h3>
            </div>
        </div>

        <img className="imgCapa" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />
        
       

        <div className="corpoConquistas">
            <div className="corpoCentral">
                <CardBranco titulo="Minhas Medalhas" />
               
                <div className='textevermelho'>aaaaaaaaaaaa</div>
                

            </div>

            <div className="corpoLateral">
                <CardBranco titulo="Estatísticas" />
                <div className="estatisticas">
                    <div className="estatisticas1">
                    <CardBranco titulo="5" conteudo="Streak" />
                    <CardBranco titulo="Mentor" conteudo="Ranking" />
                    </div>

                    <div className="estatisticas2">
                    <CardBranco titulo="253h" conteudo="Horas participadas" />
                    <CardBranco titulo="48" conteudo="Eventos participados" />
                </div>
                </div>
            </div>
        </div>

        </div>

        </>
    );
}

export default Achievements;