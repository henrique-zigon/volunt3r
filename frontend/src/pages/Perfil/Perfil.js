import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import NewNavBar from '../../components/NewNavBar/NewNavBar';
import CardPerfil from '../../components/CardPerfil/CardPerfil'
import api from "../../api.js";
import avatarPadrao from '../../images/avatar_padrao.png';
import capaPadrao from '../../images/capa_padrao.png';
import './style.css';


function Perfil(props) {

	const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const [publicacoes, setPublicacoes] = useState([]);

	// Foto de Perfil
	var nomeCompleto = cookies.volunt3r_user.nomeUsuario;
	var regexNomeSobrenome = /(\w+ \w+)/
	var NomeSobrenome = nomeCompleto.match(regexNomeSobrenome);

	return (
		<>

			<div className="perfil-container">

				
				<div className="perfil-content">
					<NewNavBar />
                    <div>
                        {/* cookies.volunt3r_user.imagemPerfil == null ? avatarPadrao : "http://voluntier.eastus.cloudapp.azure.com:81/arquivos/imagem/" + cookies.volunt3r_user.imagemPerfil */}
                    <CardPerfil icone={avatarPadrao} nome={NomeSobrenome[1]} cargo={cookies.volunt3r_user.cargo} cover ={capaPadrao}/>
                    </div>
                    

                    </div>

</div>
</>
);
}

export default Perfil;