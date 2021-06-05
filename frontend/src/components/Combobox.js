import React from 'react';
import '../styles/combo-box-style.css';

function Combobox(props){
    return(
        <>
        <select className="box">
            <option value={props.valor}>{props.nome}</option>
        </select>
        </>
    );
}

export default Combobox;