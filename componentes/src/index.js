import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Card from './CardCatalogo.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <React.StrictMode>
    <Card />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
