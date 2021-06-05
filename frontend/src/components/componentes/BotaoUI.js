import React from "react";
import "../css/button-style.css";

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline"
];

const textButton = "btn";

const SIZES = ["btn--medium", "btn--large"];

export const Botao = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {

  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={textButton ,checkButtonStyle, checkButtonSize}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
