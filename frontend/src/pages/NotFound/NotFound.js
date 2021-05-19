import React from 'react';

import './style.css';

function NotFound() {
  return(
  
    <div className="container-notfound">
      <span className="title">404</span>
      <span>Opps.. não encontramos esse recurso</span>
      {/* <Link to="/" className="back-page">
        <BiArrowBack size={20}/>
        Voltar
      </Link> */}
    </div>
   
  );
}

export default NotFound;