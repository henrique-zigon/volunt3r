import React, { useEffect } from 'react';
import { BiHeart, BiRepost} from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Botao from '../../components/Botao/Botao';
import PessoasInteressadas from '../../components/PessoasInteressadas/PessoasInteressadas';

import api from '../../api';
import './card-feed-style.css';

const CardFeedEvent = (props) => {

  let months = ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"]

  let monthEvent = months[parseInt(props.dataEvent.split("/")[1]) - 1];
  let dayEvent = props.dataEvent.split("/")[0];

  const { addToast } = useToasts();

  const [isLikedCardFeedEvent, setIsLikedCardFeedEvent] = useState(props.isLikedPost ? true : false);
  const [countLikesCardFeedEvent, setCountLikesCardFeedEvent] = useState(props.countLikes);
  const [countCommentsCardFeedEvent, setCountCommentsCardFeedEvent] = useState(props.countRelatedPosts)
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribe ? true : false)

  async function inscrever() {
    if (!isSubscribed) {
      await api("/eventos/inscrever", {
        method: "POST",
        headers: {
          'Authorization': props.token
        },
        data: {
          fkUsuario: props.idLoggedUser,
          fkEvento: props.idEvent,
          status_UE: "pendente"
        }

      }).then(resposta => {
        if (resposta.status === 201) {
          addToast('Inscrito com sucesso! 😀', { appearance: 'success', autoDismiss: true })
          setIsSubscribed(true);
        }
      }).catch((e) => {
        if (e.response.status === 400) {
          addToast('Você já está inscrito!', { appearance: 'warning', autoDismiss: true })
        }
        if (e.response.status === 500) {
          addToast('Erro ao se inscrever... 😥', { appearance: 'error', autoDismiss: true })
        }
      });
    } else {
      await api("/eventos/inscrever", {
        method: "POST",
        headers: {
          'Authorization': props.token
        },
        data: {
          fkUsuario: props.idLoggedUser,
          fkEvento: props.idEvent,
        }
      }).then(resposta => {
        if (resposta.status === 200) {
          addToast('Inscrição Cancelada! 😟', { appearance: 'success', autoDismiss: true })
          setIsSubscribed(false);
        }
      }).catch(e => {
        
        addToast('Opps ... Ocorreu algum erro 😥', { appearance: 'error', autoDismiss: true })
      })
    }
  }

  async function likePostFunction() {
    if (!isLikedCardFeedEvent) {
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
        if (resposta.status === 201) {
          setIsLikedCardFeedEvent(true);
          setCountLikesCardFeedEvent(countLikesCardFeedEvent + 1);
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
        if (resposta.status === 201) {
          setIsLikedCardFeedEvent(false);
          setCountLikesCardFeedEvent(countLikesCardFeedEvent - 1);
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }


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
    <div className="feed-card" onClick={clickPost}>
      <img className="image-post"
        src={`${process.env.REACT_APP_PUBLIC_URL_API}/arquivos/imagem/${props.imagePost}`}
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
          {

            isSubscribed === true ? <Botao onClick={inscrever} children="PARTICIPANDO" buttonSize="btn--long" buttonStyle="btn--primary--outline"/> 
              : <Botao onClick={inscrever} children="QUERO PARTICIPAR" buttonSize="btn--long"/>
          }


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
                isLikedCardFeedEvent ? <FaHeart /> : <BiHeart />
              }
            </button>
            <span><b>{countLikesCardFeedEvent}</b> pessoas curtiram</span>
          </div>
          <div className="like-post">
            <button className="btn-comment-post" >
              {
                <BiRepost />
              }
            </button>
            <span><b>{countCommentsCardFeedEvent}</b> postagens relacionadas</span>
          </div>
          <PessoasInteressadas inscritos={props.inscritos}/>
        </div>
      </div>
    </div>
  );
}




export default CardFeedEvent;