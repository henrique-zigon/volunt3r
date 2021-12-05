import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';

import api from '../../api';
import './card-conquista-icones-style.css';
import Conquista from '../../components/Conquista/Conquista';
import { getURLApi } from '../../configs/getUrlApi';

const CardConquistasIcones = (props) => {
    let location = useLocation().pathname;

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

    return (
        <div className="user-medals">
            <span>Minhas medalhas</span>
            <div className="user-medals-info">
                <div className={
                    location === "/perfil" ? "user-medals-slots slots-preview" : "user-medals-slots"
                }>
                    {
							ranques.map((ranque) => {
								console.log(ranque);
									return (
                                        <Conquista
                                        show="icone" categoria={ranque.nomeCategoria} icone= {`${getURLApi()}/arquivos/imagem/${ranque.imagem}`}/>
                                        );
                                })
                            }
                </div>
                <Link to="/perfil-conquistas">
                    <span className={
                        location === "/perfil-conquistas" ? "hide" : "linkagem"
                    }>Ver mais</span>
                </Link>
            </div>
        </div>
    );
}

export default CardConquistasIcones;