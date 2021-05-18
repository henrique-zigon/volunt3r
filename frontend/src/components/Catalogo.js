import React from 'react';
import CardCatalogo from '../components/CardCatalogoUI';
import Botao from '../components/Botao';

export default function Catalogo(){
    return(
        <>
            <div className = "container">
                <div className = "itens">
                    <CardCatalogo titulo = "Doação de alimentos" subtitulo = "AlimentosSA" tempo = "14/03 - 14h" descricao = "Lorum ipsum baba sdjao s jdioas ajajaajsio  sjidjs mjiod"/>
                </div>
            </div>    
        </>
    );
}