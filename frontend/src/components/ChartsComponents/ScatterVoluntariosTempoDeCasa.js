import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';
import api from '../../api';

import ReactLoading from 'react-loading';

const ScatterVoluntariosTempoDeCasa = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);

    const [dataChart, setDataChart] = useState([]);

    const [isLoaded, setIsloaded] = useState(false);


    useEffect(() => {

        api('/dash/score', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataChart(resposta.data.map(s => ({ x: s.tempoCasa, y: s.score })));
            setIsloaded(true);
        })

    }, [])

    const state = {
        datasets: [{
            data: dataChart,
            backgroundColor: 'rgb(54, 162, 235)'
        }],

    }

   

    return (
        !isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> : <Scatter data={state}  />
    );
}

export default ScatterVoluntariosTempoDeCasa;