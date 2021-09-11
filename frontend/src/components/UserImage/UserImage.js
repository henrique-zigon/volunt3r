import React from "react";
import "../UserImage/UserImage.css"


function UserImage(props){
    return(

        <div className="userImage">
            <img className="imagem" src={props.imagem}/>
            <span className="nome">{props.nome}</span>
        </div>

    );
}

export default UserImage;