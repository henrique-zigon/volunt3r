import React, { useEffect } from 'react';
import { BiHeart } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

import './style-cardCommentOrPost.css';

import api from '../../api';


const URL = "http://voluntier.eastus.cloudapp.azure.com:81";

const CardCommentOrPost = (props) => {

  const [isLikedCardCommentOrPost, setIstLikedCardCommentOrPost] = useState(false); 

  const [countLikesCardCommentOrPost, setCountCardCommentOrPost] = useState(props.countLikes);

  async function likePostFunction() {
    if(!isLikedCardCommentOrPost) {
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
          setIstLikedCardCommentOrPost(true);
          setCountCardCommentOrPost(countLikesCardCommentOrPost + 1);
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
          setIstLikedCardCommentOrPost(false);
          setCountCardCommentOrPost(countLikesCardCommentOrPost - 1);
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

          <span className="posted-in">Postou em <b>{props.postedIn}</b></span>
        </header>

        <div className="post-information">
          <div className="content-post-event">
            <span className="descrition-event">{props.descriptionPost}</span>
          </div>
        </div>
        <div className="footer-information">
          <div className="like-post">
            <button className="btn-like-post" onClick={likePostFunction}>
              {
                isLikedCardCommentOrPost ? <FaHeart /> : <BiHeart />
              }
            </button>
            <span><b>{countLikesCardCommentOrPost}</b> pessoas curtiram</span>
            {/* <Teste countLikes={props.countLikes}/> */}
          </div>
        </div>
      </div>
    </div>
  );
}



export default CardCommentOrPost;