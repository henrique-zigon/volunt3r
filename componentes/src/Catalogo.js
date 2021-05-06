import React from 'react';
import CardCatalogo from './CardCatalogoUI';
import Botao from './Botao';

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