import React from "react";
import './botao-style.css';
import { BiEdit } from 'react-icons/bi';


const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--disabled--solid",
  "btn--disabled--outline"
];

const SIZE = [
    "btn--medium",
    "btn--long",
  ];

const TYPE = ["btn--text", "btn--icon", "btn--texticon"];

const Botao = (props) => {

  const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0];

  const checkButtonType = TYPE.includes(props.buttonType) ? props.buttonType : TYPE[0];

  const checkButtonSize = SIZE.includes(props.buttonSize) ? props.buttonSize : SIZE[0];

  return (
    <button className={`btn ${checkButtonStyle} ${checkButtonType} ${checkButtonSize}`}
        onClick={props.onClick}
        type={props.type}>
        <div>
            <span className={props.buttonType==="btn--icon" ? "hide" : ""}>
            {props.children}
            </span>
            <BiEdit size="15px" className={props.buttonType==="btn--text" ? "hide" : ""}/>
        </div>
    </button>
  );
};

export default Botao;