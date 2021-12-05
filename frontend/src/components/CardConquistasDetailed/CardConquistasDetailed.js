import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../../api';
import './card-conquista-detailed-style.css';
import Conquista from '../../components/Conquista/Conquista';
import { getURLApi } from '../../configs/getUrlApi';
import medalhaPadrao from '../../images/disabled_medal.PNG';


const CardConquistasDetailed = (props) => {

    const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const [ranques, setRanques] = useState([]);

	useEffect(() => {
		async function getAllRanques() {
			api.get(`/ranques/${cookies.volunt3r_user.idUsuario}`, {
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setRanques(resposta.data.reverse());
				console.log(resposta.data)
			}).catch(err => {
				console.log("Deu erro" + err)
			});
		}

		getAllRanques();
	}, [])

    return(
            <div className="user-medals-detailed">
                <span>Meu progresso</span>
                <div className="medals-detailed-scroll">
                {
							ranques.map((ranque) => {
								console.log(ranque);
									return (
                                        <Conquista
                                        show="all" progressoAtingido={ranque.contagem} progressoMaximo={ranque.qtdDoProximoNivel} categoria={ranque.nomeCategoria} icone= {ranque.imagem == null ? medalhaPadrao :`${getURLApi()}/arquivos/imagem/${ranque.imagem}`}/>
                                        );
                                })
                            }
                  </div>
            </div>
    );
}

export default CardConquistasDetailed;

