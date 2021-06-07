import React from 'react';
import Medalha from '../components/Medalha';
import Barra from '../components/Barra';
import '../styles/conquista-style.css';
import medalha1 from '../images/Group 13.png';
import medalha2 from '../images/Group 14.png';
import medalha3 from '../images/Meia Medalha.png';

function Conquista(props) {
    return (
        <>
            <div className="fundoConquista">


                <div className="medalha" >
                    <Medalha borda={false} iconeMedalha={medalha3} alt="Medalha de ouro de doação de sangue" elo="Ouro" />
                </div>

                <div className="corpoConquista">
                    <div className="tituloConquista">{props.titulo}</div> <span></span>
                    <Barra />
                    <div className="textoConquista">{props.conteudo}</div>
                </div>

            </div>
        </>
    );
}

export default Conquista;