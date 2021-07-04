import React from 'react';
import { useState } from 'react';
import './input-style.css';

const SelectForm = (props) => {


  const [selectOptions, setSelectOptions] = useState([]);

  setSelectOptions(props.selectOptions);

  return(
    <div className="input-group">
      <label htmlFor={props.id}>
        <span>{props.label}</span>

        <select 
          className="input-field select" 
          name={props.name} 
          id={props.id} 
          onChange={props.funcion}
        >
          <option disabled selected>{props.hint}</option>
          {

            // selectOptions.map((option) => {
            //   console.log(option)
            // })
            // options.map((option) => {
            //   console.log(option);
            // })

          }
        </select>
        <div className="underline"></div>
        {props.icon}
      </label>
    </div>


  );
}

export default SelectForm;