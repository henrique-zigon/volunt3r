import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import img404 from '../../images/404.png';

function NotFound() {
  return(
  
    <div className="container-notfound">
      <img src= {img404} alt="404"></img>
      {/* <span className="title">404</span> */}
      <span>Opps.. não encontramos esse recurso</span>

      <Link to="/" className="back-page">
        Voltar ao feed =)
      </Link>
    </div>
   
  );
}

export default NotFound;