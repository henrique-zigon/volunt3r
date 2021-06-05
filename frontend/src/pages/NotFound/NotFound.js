import React from 'react';

import './style.css';
import img404 from '../../images/404.png';

function NotFound() {
  return(
  
    <div className="container-notfound">
      <img src= {img404} alt="404"></img>
      {/* <span className="title">404</span> */}
      <span>Opps.. não encontramos esse recurso</span>
      {/* <Link to="/" className="back-page">
        <BiArrowBack size={20}/>
        Voltar
      </Link> */}
    </div>
   
  );
}

export default NotFound;