import React from "react";
import api from '../../../api';
import { useState } from 'react';
import InputForm from '../../../components/InputForm/InputForm';
import { useToasts } from 'react-toast-notifications';
import { useParams, useHistory } from "react-router";

const FormularioQR = (props) => {
	const { addToast } = useToasts();

	let { idEvento } = useParams();
	const history = useHistory();
	// const idEvento = props.match.params.idEvento;
	const [emailUsuario, setEmailUsuario] = useState("");



	function handle(e) {
		setEmailUsuario(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		api.post(`/eventos/confirmar-presenca/${idEvento}`, emailUsuario, {
			headers: {
				'Content-Type': 'text/plain'
			}
		}).then(resposta => {
			if (resposta.status === 201) {
				addToast('Parabéns você ganhou milhas aeeee!', { appearance: 'success', autoDismiss: true });
				e.target.email.value = "";
				history.push("/");
			}
		}).catch((e) => {
			console.error(e);
		
			addToast('Opss... você não se inscreveu nesse evento!', { appearance: 'error', autoDismiss: true })
		});
	}

	return (

		<div className="container-qrcode-form">
			<span>Olá, Confirme sua presença utilizando o seu e-mail 😉</span>
			<form onSubmit={handleSubmit}>
				<InputForm
					type="text"
					id="email"
					name="email"
					label="Seu email"
					function={(e) => handle(e)}
				/>

				<button type="submit" className="btn-new-submit">Confirmar presença</button>
			</form>

		</div>

	);

};

export default FormularioQR;