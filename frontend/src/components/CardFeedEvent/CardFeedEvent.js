import React from 'react';
import { BiHeart } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

import api from '../../api';
import './card-feed-style.css';

const URL = "http://voluntier.eastus.cloudapp.azure.com:81";

const CardFeedEvent = (props) => {

  let months = ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"]
  
  let monthEvent = months[parseInt(props.dataEvent.split("/")[1]) -1 ];
  let dayEvent = props.dataEvent.split("/")[0];
  
  const [isLiked, setIsLiked] = useState(false); 

  const [countLikes, setCountLikes] = useState(props.countLikes);

  async function likePostFunction() {
    if(!isLiked) {
      await api("/gostei", {
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
          setIsLiked(true);
          setCountLikes(countLikes + 1);
        }      
      }).catch(err => {
        console.error(err);
      });
    } else {

      await api("/gostei", {
        method: "DELETE",
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
          setIsLiked(false);
          setCountLikes(countLikes - 1);
        }      
      }).catch(err => {
        console.error(err);
      });
    }
  }


  return (
    <div className="feed-card">
      <img className="image-post"
        src={`${URL}/arquivos/imagem/${props.imagePost}`}
        alt={props.titlePost}
      />

      <div className="information-card">
        <header className="header-card">
          <div className="user-posted">
            <img
              src={props.imageUserPosted}
              alt={props.nameUserPosted}
            />

            <div className="information-user">
              <span className="user-posted-name">{props.nameUserPosted}</span>
              <span className="area-user-posted">{props.areaUserPosted}</span>
            </div>
          </div>

          <button onClick={props.onClick} className="btn-subscribe-post">Quero Participar</button>
        </header>

        <div className="post-information">
          <div className="date-event-post">
            <span className="month">{monthEvent}</span>
            <h2 className="day">{dayEvent}</h2>
          </div>

          <div className="content-post-event">
            <h2 className="title">{props.titlePost}</h2>
            <span className="address-event">{props.addressPost}</span>
            <span className="descrition-event">{props.descriptionPost}</span>
          </div>
        </div>
        <div className="footer-information">
          <div className="like-post">
            <button className="btn-like-post" onClick={likePostFunction}>
              {
                isLiked ? <FaHeart /> : <BiHeart />
              }
            </button>
            <span><b>{countLikes}</b> pessoas curtiram</span>
          </div>
        </div>
      </div>
    </div>
  );
}




export default CardFeedEvent;