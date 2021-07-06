import Reac from 'react';
import { BiHeart } from 'react-icons/bi';
import './style-cardCommentOrPost.css';

const CardCommentOrPost = (props) => {
  return (
    <div className="feed-card">
      <img className="image-post"
        src={`http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/${props.imagePost}`}
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
            <button className="btn-like-post">
              <BiHeart />
            </button>
            <span><b>{props.countLikes}</b> pessoas curtiram</span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CardCommentOrPost;