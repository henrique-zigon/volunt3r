import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function NotFound() {

  return(
  
    <div className="container-notfound">
      <span className="emoji">😀</span>    
      <span>Sucesso! Sua senha foi alterada!</span>

      <Link to="/login" className="back-page">
        Voltar ao Login
      </Link>
    </div>
   
  );
}

export default NotFound;