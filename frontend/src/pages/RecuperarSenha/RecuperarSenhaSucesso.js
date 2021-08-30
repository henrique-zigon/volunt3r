import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function NotFound() {
  return(
  
    <div className="container-notfound">
      <span>😀</span>    
      <span>Sucesso! Sua senha foi resetada!</span>

      <Link to="/login" className="back-page">
        IR PARA O LOGIN
      </Link>
    </div>
   
  );
}

export default NotFound;