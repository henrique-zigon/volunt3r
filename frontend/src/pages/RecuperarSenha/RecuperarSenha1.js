import React, { useState } from 'react';
import '../global-pages.css';
import '../Login/style.css';
import RecuperarSenhaImage from '../../images/RecuperarSenha.png';
import { BiEnvelope, BiKey } from 'react-icons/bi';
import InputForm from '../../components/InputForm/InputForm';


function RecuperarSenha() {

    return (
		<div className="container">
			<div className="content">
            <img src={RecuperarSenhaImage} aria-hidden alt="Imagem de recuperação de senha" />
			</div>
			<div className="contain-form">
				<div className="information-page">
					<h2 className="title">Olá, vamos recuperar a sua senha?</h2>
					<span className="subtitle">Qual o seu e-mail?</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>
					<InputForm 
						type="email"
						id="email"
						name="email"
						label="Seu email"
						icon={<BiEnvelope  className="icon-input-group"/>}
						function={(e) => handle(e)}
					/>
				
					<button type="submit" className="btn-new-submit">Continuar</button>
				</form>

			</div>
		</div>

	);
}

export	default RecuperarSenha;