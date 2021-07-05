import React from 'react';

import './card-shop.css';

const CardShop = (props) => {
  return (
    <div className="shop-card">
      <img
        className="course-image"
        src={props.image}
        alt={props.title}
      />

      <div className="information-card-shop">
        <div className="principal-information-course">
          <div className="info-course">
            <span className="title">{props.title}</span><br />
            <span className="prince-and-temp">{props.prince} Milhas - {props.time} horas</span>
          </div>
          <button className="btn-buy">Comprar</button>
        </div>
        <span className="description-courses">{props.description}</span>
      </div>
    </div>
  );
}

export default CardShop;

