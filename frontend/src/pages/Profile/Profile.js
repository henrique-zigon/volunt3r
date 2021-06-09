import React from 'react';
import './style.css';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import CardBranco from '../../components/CardBranco';
import Conquista from '../../components/Conquista';

import imgMed from '../../images/Meia Medalha.png';
import MedalhaPerfil from '../../components/MedalhaPerfil';

function Profile() {
    return (
        <>
            <NavBar username="Jon" />
            <Menu />
            <div className="paginaCentroProfile">
                <div className="perfilUsuario">
                    <div className="imgPerfil">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />
                    </div>
                    <div ><MedalhaPerfil className="medalhota" elo="ouro" iconeMedalha={imgMed} /></div>
                    <div className="textoPerfil">
                        <h2>Nome</h2>
                        <h3>Titulo</h3>
                    </div>

                    <img className="imgCapa" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg" />

                    <div className="corpoPublicacoes">
                        <div className="corpoCentral">
                            <div className="publicacoes">
                            </div>
                        </div>

                        <div className="corpoLateral">
                            <CardBranco titulo="Sobre mim" conteudo="aaaaaaaaaaaaaaaaaaaaaaaaaa" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;