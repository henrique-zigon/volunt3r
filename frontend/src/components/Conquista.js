import React from 'react';
import Medalha from '../components/Medalha';
import '../styles/conquista-style.css';
import ProgressBar from "@ramonak/react-progress-bar";
import medalha1 from '../images/Group 13.png';
import medalha2 from '../images/Group 14.png';
import medalha3 from '../images/Meia Medalha.png';

function Conquista(props) {
    return (
        <>
            <div className="fundoConquista">


                <div className="medalha" >
                    <Medalha borda={false} iconeMedalha={props.icone} alt="Medalha de ouro de doação de sangue" elo={props.elo} />
                </div>

                <div className="corpoConquista">
                    <div className="tituloConquista">{props.titulo}</div>
                    <ProgressBar completed={props.completo} bgColor="#FECE21" isLabelVisible={false} height="13px" margin="3%"/>
                    <div className="textoConquista">{props.conteudo}</div>
                </div>

            </div>
        </>
    );
}

export default Conquista;