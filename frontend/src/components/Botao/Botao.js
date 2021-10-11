import React from "react";
import './botao-style.css';
import { BiEdit } from 'react-icons/bi';
import { FaEdit } from "react-icons/fa";
import { BiEditAlt } from 'react-icons/bi';
import { BiQuestionMark } from 'react-icons/bi';

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


const ICONS = [
    BiQuestionMark, 
    BiEdit,
    BiEditAlt,
];

const TYPE = ["btn--text", "btn--icon", "btn--texticon"];

const Botao = (props) => {

  const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0];

  const checkButtonType = TYPE.includes(props.buttonType) ? props.buttonType : TYPE[0];

  const checkButtonSize = SIZE.includes(props.buttonSize) ? props.buttonSize : SIZE[0];

  const checkButtonIcon = ICONS.includes(props.buttonIcon) ? ICONS[ICONS.find(props.buttonIcon)[1]] : ICONS[0][1];

  // const iconTeste= "edit";

  return (
    
    <button className={`btn ${checkButtonStyle} ${checkButtonType} ${checkButtonSize} ${checkButtonType}`}
        onClick={props.onClick}
        type={props.type}>
        <div>
            <span className={props.buttonType==="btn--icon" ? "hide" : ""}>
              {props.children}
            </span>
            {/* <span> <BiEdit /></span> */}
            
            {props.buttonIcon==="edit" ? <FaEdit />: ""}
            {/* <BiEdit size="15px" className={props.buttonType==="btn--text" ? "hide" : ""}/> */}
        </div>
    </button>
  );
};

export default Botao;