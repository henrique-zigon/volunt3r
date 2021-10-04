import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

function RecuperarSenhaInvalido() {

  //fazer ligação com a api
const history =  useHistory();

window.setTimeout(function sair() {
  setTimeout(() => {
    history.push("/login");
  }, 5000);
})

  return(

    <div className="container-notfound">
      <span className="emoji">🤔</span>
      <span>Link inválido ou expirado.</span>
    </div>
   
  );
}

export default RecuperarSenhaInvalido;