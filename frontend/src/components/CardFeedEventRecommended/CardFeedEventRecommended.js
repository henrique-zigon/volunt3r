import React, { useEffect } from 'react';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';


import { getURLApi } from '../../configs/getUrlApi';
import api from '../../api';
import './card-feed-event-recommended-style.css';

const CardFeedEventRecommended = (props) => {

  let months = ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"]

  let monthEvent = months[parseInt(props.dataEvent.split("/")[1]) - 1];
  let dayEvent = props.dataEvent.split("/")[0];

  const { addToast } = useToasts();

  async function clickPost() {
    await api("/cliques/novo", {
      method: "POST",
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json'
      },
      data: {
        fkUsuario: {
          idUsuario: props.idLoggedUser
        },
        fkPublicacao: {
          id: props.idPost
        }
      }
    }).then(resposta => {
      if(resposta.status === 201) {
        console.log("OK")
      }
    }).catch(err => {
      console.error(err)
    });
  }


  return (
    <div className="feed-card-recommended" onClick={clickPost}>
      <img className="image-post-recommended"
        src={`${getURLApi()}/arquivos/imagem/${props.imagePost}`}
        alt={props.titlePost}
      />

      <div className="information-card-recommended">
        <header className="header-card">
        <div className="content-post-event">
            <h2 className="title-recommended">{props.titlePost}</h2>
          </div>
        </header>

        <div className="post-information-recommended">
          <div className="date-event-post-recommended">
            <span className="month">{monthEvent}</span>
            <h2 className="day">{dayEvent}</h2>
          </div>
          
        </div>
      </div>
    </div>
  );
}




export default CardFeedEventRecommended;