import React from "react";
import './milhas-style.css';
import milhasIcone from '../../images/milhas.png';


const Milhas = (props) => {

    return (
        <div className="milhas-container">
            <div className="milhas-content">
                    <img className="milhas-icon" src={milhasIcone}></img>
                    <span className="milhas-number">{props.milhas}</span>
            </div>
        </div>
    );
  };

export default Milhas;