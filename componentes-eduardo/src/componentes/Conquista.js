import React from 'react';
import Medalha from './Medalha';
import Barra from './Barra';

function Conquista(props) {
    return (
        <>
            <div className="fundoConquista">


                <div className="medalha" >
                    <Medalha borda={true} iconeMedalha="../imagens/vaadin_medal.png" alt="Medalha de ouro de doação de sangue" elo="Ouro" />
                </div>

                <div className="corpoConquista">
                    <div className="tituloConquista">{props.titulo}</div> <span></span>
                    <Barra completo="" />
                    <div className="textoConquista">{props.conteudo}</div>
                </div>

            </div>
        </>
    );
}

export default Conquista;