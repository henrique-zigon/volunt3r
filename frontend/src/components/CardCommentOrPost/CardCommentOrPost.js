import React, { useState } from 'react';
import { BiHeart, BiComment, BiSend } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';

import { getURLApi } from '../../configs/getUrlApi';

import './style-cardCommentOrPost.css';

import api from '../../api';
import InputForm from '../InputForm/InputForm';



const CardCommentOrPost = (props) => {

  const [isLikedCardCommentOrPost, setIstLikedCardCommentOrPost] = useState(props.isLikedPost ? true : false);
  const [countLikesCardCommentOrPost, setCountCardCommentOrPost] = useState(props.countLikes);
  const [countCommentsCardCommentOrPost, setCountCommentsCardCommentOrPost] = useState(props.countComments);
  const [paginationComments, setPaginationComments] = useState(0);
  const [stateCommentContainer, setStateCommentContainer] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [isShowComments, setIsShowComments] = useState(false);

  const { addToast } = useToasts();

  async function newComment(e) {
    e.preventDefault();
    let comentario = e.target.comentario.value;

    if(comentario === "") {
      addToast('Opps ... Preencha o seu comentário!', { appearance: 'success', autoDismiss: true })
    } else {
      await api(`/publicacoes/comentarios/${props.idPost}`, {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': props.token
        },
        data: comentario
      }).then(resposta => {
        if(resposta.status === 201) {
          getComentarios();
          e.target.comentario.value = ""
          addToast('Comentário registrado com sucesso!', { appearance: 'success', autoDismiss: true })
        }
      }).catch(err => {
        console.error(err);
      })
    }
  }

  function showOrHiddenComments() {
    if (!isShowComments) {
      getComentarios();
      setStateCommentContainer("hidden-comments");
      setIsShowComments(true);
    } else {
      setStateCommentContainer("");
      setIsShowComments(false);
    }
  }

  async function getComentarios() {
    await api.get(`/publicacoes/${props.idPost}/comentarios`, {
      params: { pagina: 0, tamanho: 10 },
      headers: { 'Authorization': props.token }
    }).then(resposta => {
      if (resposta.status === 200) {
        setComentarios(resposta.data.content)
      }
    })
  }



  async function likePostFunction() {
    if (!isLikedCardCommentOrPost) {
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
        if (resposta.status === 201) {
          setIstLikedCardCommentOrPost(false);
          setCountCardCommentOrPost(countLikesCardCommentOrPost - 1);
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
    <div className="feed-card card-comment-or-post" onClick={clickPost}>
      <div className="principal-content-card">
        <img className="image-post"
          src={`${getURLApi()}/arquivos/imagem/${props.imagePost}`}
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
              props.postedIn === "" ? <span className="posted-in">Postou <b> há 1h</b></span> : <span className="posted-in">Postou em <b>{props.postedIn}</b></span>
            }
          </header>

          <div className="post-information">
            <div className="content-post-event">
              <span className="descrition-event">{props.descriptionPost}</span>
              <span className="hashtags">{props.hashtags}</span>
            </div>
          </div>
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
            <button className="btn-comment-post" onClick={showOrHiddenComments}> <BiComment /> </button>
            <span><b>{countCommentsCardCommentOrPost}</b> comentários</span>
          </div>
        </div>
      {/* <div className="hidden-line line"></div> */}
      <div className={`${stateCommentContainer} container-comments`}>
        <div className="new-comment">
            <form action="" onSubmit={(e) => newComment(e)}>
              <InputForm 
                type="text"
                id="comentario"
                name="comentario"
                label="Digite um comentário"
              />
              <button className="send-new-comment"> <BiSend /> </button>
            </form>
        </div>
        {
          comentarios.length === 0 ? <div>Não há comentários!</div>
            :
            comentarios.map(comentario => {
              return (
                <div className="user-comment">
                  <div className="icon-user">
                    <img src={props.imageUserPosted} />
                  </div>
                  <div className="box-user-comment">
                    <span className="name-user-comment">{comentario.usuario.nome}</span>
                    <span className="comment">{comentario.descricao}</span>
                  </div>
                </div>
              );
            })
        }

        {/* <button className="show-more">Ver mais</button> */}

      </div>
    </div>
  );
}



export default CardCommentOrPost;
