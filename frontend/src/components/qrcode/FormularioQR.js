import React from "react";
import api from '../../api';
import { useState } from 'react';
import InputForm from '../InputForm/InputForm';
import { useToasts } from 'react-toast-notifications';

const FormularioQR = (props) => {
	const { addToast } = useToasts();
  const idEvento = props.match.params.idEvento;

  const [emailUsuario, setEmailUsuario] = useState("");
  
  function handle(e) {
    console.log(e.target.value);
		setEmailUsuario(e.target.value);
	}
  function handleSubmit(e) {
      e.preventDefault();
      api.post("/eventos/confirmar-presenca/"+idEvento, emailUsuario, { 
        headers: { 
          'Content-Type': 'text/plain'
        }
      })
			.then(resposta => {
				if (resposta.status === 201) {
					addToast('aeee milhas!', {appearance: 'success', autoDismiss: true})
				}
			}).catch((e) => {
					addToast('Ops...', {appearance: 'error', autoDismiss: true})
			});
      console.log("Id evento: "+idEvento);
  }  

  return (
      <form onSubmit={handleSubmit}>
        <InputForm
						type="text"
						id="email"
						name="email"
						label="Seu email"
						function={(e) => handle(e)}
					/>
        <input type="submit" value="Enviar" />
      </form>
  );

};

export default FormularioQR;