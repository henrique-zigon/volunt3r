import React from 'react';
import { BiHeart } from 'react-icons/bi';


import './card-feed-style.css';

const CardFeedEvent = (props) => {
  return (
    <div className="feed-card">
      <img className="image-post"
        src={props.imagePost}
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

          <button className="btn-subscribe-post">Quero Participar</button>
        </header>

        <div className="post-information">
          <div className="date-event-post">
            <span className="month">Mar</span>
            <h2 className="day">08</h2>
          </div>

          <div className="content-post-event">
            <h2 className="title">{props.titlePost}</h2>
            <span className="address-event">{props.addressPost}</span>
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


export default CardFeedEvent;