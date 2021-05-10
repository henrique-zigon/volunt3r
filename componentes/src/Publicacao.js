import React, { Component } from 'react'
import Publicacao from './PublicacaoUI';
import "./publicacao-style.css";
import img1 from "./assets/imagem1.jpg";
import img3 from "./assets/imagem3.jpg";
import img2 from "./assets/imagem2.jpg";
import img5 from "./assets/imagem5.jpg";
import imgLonga from "./assets/imagemLonga.jpg";
import imgLike from "./assets/heart.png";
import imgComment from "./assets/comment.png";

export default class Cards extends Component {
    render() {
        return (
            <div className="container-publicacao">
                <Publicacao imgIconUser={img1} imgsrc={img5} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Giovanna Oliveira" time="1h" desc="Dolor amet ex officia voluptate incididunt duis nostrud cillum commodo excepteur tempor labore sint. Adipisicing irure esse laboris fugiat duis ex nostrud culpa proident irure. Quis veniam cupidatat proident esse ex tempor dolore elit commodo irure commodo officia. Cillum ipsum pariatur pariatur velit amet. Excepteur veniam laborum elit cillum occaecat eu cupidatat. Deserunt est quis irure adipisicing fugiat aliqua deserunt duis ad pariatur tempor reprehenderit." tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgsrc={img3} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Livia Losinkas" time="1h" desc="Dolor amet ex officia voluptate incididunt duis nostrud cillum commodo excepteur tempor labore sint. Adipisicing irure esse laboris fugiat duis ex nostrud culpa proident irure. Quis veniam cupidatat proident esse ex tempor dolore elit commodo irure commodo officia. Cillum ipsum pariatur pariatur velit amet. Excepteur veniam laborum elit cillum occaecat eu cupidatat. Deserunt est quis irure adipisicing fugiat aliqua deserunt duis ad pariatur tempor reprehenderit." tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Livia M Losinskas" time="1h" desc="Dolor amet ex officia voluptate incididunt duis nostrud cillum commodo excepteur tempor labore sint. Adipisicing irure esse laboris fugiat duis ex nostrud culpa proident irure. Quis veniam cupidatat proident esse ex tempor dolore elit commodo irure commodo officia. Cillum ipsum pariatur pariatur velit amet. Excepteur veniam laborum elit cillum occaecat eu cupidatat. Deserunt est quis irure adipisicing fugiat aliqua deserunt duis ad pariatur tempor reprehenderit." tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Livia M Losinskas" time="1h" desc="Dolor amet ex officia voluptate incididunt duis nostrud cillum commodo excepteur tempor labore sint. " tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgsrc={imgLonga} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Giovanna Oliveira" time="1h" desc="Dolor amet ex officia voluptate incididunt duis nostrud cillum commodo excepteur tempor labore sint. Adipisicing irure esse laboris fugiat duis ex nostrud culpa proident irure. Quis veniam cupidatat proident esse ex tempor dolore elit commodo irure commodo officia. Cillum ipsum pariatur pariatur velit amet. Excepteur veniam laborum elit cillum occaecat eu cupidatat. Deserunt est quis irure adipisicing fugiat aliqua deserunt duis ad pariatur tempor reprehenderit." tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgsrc={imgLonga} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Giovanna Oliveira" time="1h" tags="#Gratidão #AmoCães" />
                <Publicacao imgIconUser={img1} imgsrc={imgLonga} imgIconLike={imgLike} imgIconComment={imgComment} likes="10" comments="5" userName="Fernanda Domingos F" time="1h" />
            </div>
        );
    }
}
