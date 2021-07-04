import React from 'react';
import './input-style.css';

const InputForm = (props) => {
  return (
    <div className="input-group">
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        <input 
          className="input-field" 
          type={props.type} 
          name={props.name} 
          id={props.id} 
          onChange={props.function}
        />
        <div className="underline"></div>
        {props.icon}
      </label>
    </div>
  );
}

// onChange={(e) => handle(e)} 


export default InputForm;