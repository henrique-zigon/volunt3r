import React, { useEffect } from 'react';
import { BiHeart, BiComment } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

import './style-cardCommentOrPost.css';

import api from '../../api';


const CardCommentOrPost = (props) => {

  const [isLikedCardCommentOrPost, setIstLikedCardCommentOrPost] = useState(props.isLikedPost ? true : false); 

  const [countLikesCardCommentOrPost, setCountCardCommentOrPost] = useState(props.countLikes);

  const [stateCommentContainer, setStateCommentContainer] = useState("");


  let isShowComments = false;

  function showOrHiddenComments() {
  
    console.log(isShowComments)
    if(!isShowComments) {
      setStateCommentContainer("hidden-comments");
      
      isShowComments = true;
    } else {
      setStateCommentContainer("");
      isShowComments = false;
    }
    console.log(stateCommentContainer)
  }

  // const [countCommentsCardCommentOrPost, setCountCommentsCardCommentOrPost] = useState(props.coun)

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
    <div className="feed-card card-comment-or-post">
      <div className="principal-content-card">

      
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
              props.postedIn === "" ? <span className="posted-in">Postou <b>Postou há 1h</b></span> : <span className="posted-in">Postou em <b>{props.postedIn}</b></span>
            }
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
            <div className="like-post">
              <button className="btn-comment-post" >
                {
                  <BiComment onClick={showOrHiddenComments}/>
                }
              </button>
              <span><b>{countLikesCardCommentOrPost}</b> comentários</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden-line line"></div> */}
      <div className={`${stateCommentContainer} container-comments`}>
        <div className="user-comment">
          <div className="icon-user">
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" /> 
          </div>
          <div className="box-user-comment">
              <span className="name-user-comment">Gabriel Ronny</span>
              <span className="comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quae magnam expedita maiores eos quis hic iure, eveniet sit voluptates ea commodi nesciunt delectus fugiat similique veniam repellat ex repellendus!</span>
          </div>
        </div>
      </div>
    </div>
  );
}



export default CardCommentOrPost;