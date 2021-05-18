import React from 'react';

import "../styles/button-style.css";

const Botao = props => {
  //criar set de tamanhos e os caraio pra ficar show de bola :)
    return (
        <button onClick={props.onClick} className = "button">{props.action}</button>
    );
}

export default Botao;