import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function NotFound() {
  return(
  
    <div className="container-notfound">
      <span>😉</span>
      <span>Nome, enviamos um e-mail para você!</span>

      <Link to="/" className="back-page">
        Voltar ao feed =)
      </Link>
    </div>
   
  );
}

export default NotFound;