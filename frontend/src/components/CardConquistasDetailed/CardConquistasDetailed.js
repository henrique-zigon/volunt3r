import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../../api';
import './card-conquista-detailed-style.css';
import Conquista from '../../components/Conquista/Conquista';


const CardConquistasDetailed = (props) => {

    const [cookies] = useCookies(['volunt3r']);
	const [cookies_user] = useCookies(['volunt3r_user']);

	const [ranques, setRanques] = useState([]);

	useEffect(() => {
		async function getAllRanques() {
			api.get(`/ranque/${cookies.volunt3r_user.idUsuario}`, {
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
                                        show="all" progressoAtingido={ranque.contagem} progressoMaximo={ranque.limiteOuro} />
                                        );
                                })
                            }
{/* 
                    <Conquista show="all" progressoAtingido={5} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={3} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={10} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={18} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={4} progressoMaximo={20}/>
                    <Conquista show="all" progressoAtingido={5} progressoMaximo={20}/> */}
                </div>
            </div>
    );
}

export default CardConquistasDetailed;

