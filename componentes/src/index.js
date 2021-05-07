import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Cards from './CardCatalogo.js';
import Feed from './Publicacao.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <React.StrictMode>
    <Cards />
    <Feed />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
