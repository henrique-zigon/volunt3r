import React from "react";
import './botao-style.css';


const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--disabled--solid",
  "btn--disabled--outline"
];

const SIZE = [
    "btn--big",
    "btn--medium",
    "btn--long",
  ];


const TYPE = ["btn--text", "btn--icon", "btn--texticon"];

const Botao = (props) => {

  const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0];

  const checkButtonType = TYPE.includes(props.buttonType) ? props.buttonType : TYPE[0];

  const checkButtonSize = SIZE.includes(props.buttonSize) ? props.buttonSize : SIZE[0];


  return (
    
    <button className={`btn ${checkButtonStyle} ${checkButtonType} ${checkButtonSize} ${checkButtonType}`}
        onClick={props.onClick}
        type={props.type}>
        <div className="btn-content">
            <span className={props.buttonType==="btn--icon" ? "hide" : ""}>
              {props.children}
            </span>
            <span className={`icon ${props.buttonType==="btn--text" ? "hide" : ""}`}>
              {props.icone}
            </span> 
            
        </div>
    </button>
  );
};

export default Botao;