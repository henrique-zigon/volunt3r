import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function NotFound() {
  return(
  
    <div className="container-notfound">
      <span className="emoji">😉</span>
      <span>Enviamos um e-mail para você!</span>
    </div>
   
  );
}

export default NotFound;