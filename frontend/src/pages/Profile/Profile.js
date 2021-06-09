import React from 'react';
import './style.css';
import NavBar from '../../components/componentes/NavBarUI.js';
import Menu from '../../components/componentes/MenuUI.js';
import CardBranco from '../../components/CardBranco';
import Conquista from '../../components/Conquista';
import { useCookies } from 'react-cookie';
import imgMed from '../../images/Meia Medalha.png';
import MedalhaPerfil from '../../components/MedalhaPerfil';

function Profile() {

   const [cookies] = useCookies(['volunt3r_user']);
//   return(
//     <main className="container">
//       <SideBar 
//         userpic={cookies.volunt3r_user.imagemPerfil}
//         username={cookies.volunt3r_user.nomeUsuario}
//         useremail={cookies.volunt3r_user.email}
//       />
    return (
        <>
            <NavBar username="Jon" />
            <Menu />
            <div className="paginaCentroProfile">
                <div className="perfilUsuario">
                    <div className="imgPerfil">
                        <img src={cookies.volunt3r_user.imagemPerfil} />
                    </div>
                    <div ><MedalhaPerfil className="medalhota" elo="ouro" iconeMedalha={imgMed} /></div>
                    <div className="textoPerfil">
                        <h2>{cookies.volunt3r_user.nomeUsuario}</h2>
                        <h3>Titulo</h3>
                    </div>
                    </div>
                    <img className="imgCapa" src={cookies.volunt3r_user.imagemCapa} />

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
        </>
    );
}

export default Profile;