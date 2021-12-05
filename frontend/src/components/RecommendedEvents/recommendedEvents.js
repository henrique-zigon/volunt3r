import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';
import api from "../../api.js";
import CardFeedEventRecommended from '../../components/CardFeedEventRecommended/CardFeedEventRecommended'
import './recommended-event-style.css';

import { getURLApi } from '../../configs/getUrlApi';


function RecommendedEvents() {
	const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);
	const [cookies_user] = useCookies(['volunt3r_user']);
	const [eventosRecommended, setEventosRecommended] = useState([]);
	const { addToast } = useToasts();


	const [isLoaded, setIsloaded] = useState(false);

	useEffect(() => {
		async function getAllRecommended() {
			api.get(`/publicacoes/recomendados`, {
				headers: { 'Authorization': cookies.volunt3r }
			}).then(resposta => {
				setEventosRecommended(resposta.data.reverse());
				setIsloaded(true);
			}).catch(err => {
				console.log("Deu erro" + err)
			});
		}

		getAllRecommended();
	}, [])

    return (

		<>			
				
					<div className="description-page">
						<span className="title">Eventos Recomendados</span>
						<span className="description">Achamos que você pode gosta🤩</span>
					</div>
                    <div className="recommended">
                    <div className="horizontal-scroll">
                    {
							eventosRecommended.map((eventoRecommended) => {
								console.log(eventoRecommended);
                                
                                console.log(eventoRecommended.dataEvent);
                                // if (eventoRecommended.publicacaoEvento) {
									return (
                                        <CardFeedEventRecommended
                                            
												imagePost={eventoRecommended.pathImagem}
												titlePost={eventoRecommended.titulo.split("Evento de")[1].substr(0, 15) + "..."}
												
												dataEvent={'20/05/2021'}
												// idLoggedUser={cookies_user.volunt3r_user.idUsuario}
												// token={cookies.volunt3r}
												// isLikedPost={eventoRecommended.curtido}
												// isSubscribe={eventoRecommended.evento.inscrito}
												// idEvent={eventoRecommended.evento.id}
											/>);
                            // }
                        })
                            }
                            </div>

</div>
		</>
	);
}

export default RecommendedEvents;