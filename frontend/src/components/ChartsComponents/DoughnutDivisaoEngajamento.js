import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

import ReactLoading from 'react-loading';
import api from '../../api';

const DoughnutDivisaoEngajamento = () => {

    const [isLoaded, setIsloaded] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [label, setLabel] = useState([])
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {

        api('/dash', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
			setDataChart(resposta.data.map(a => (a.quantidadeVoluntarios)));
			setLabel(resposta.data.map(a => (a.categoria)));
			setIsloaded(true);
        })
    }, [])


	const state = {
		chartData: {
			labels: label,
			datasets: [{
				data: dataChart,
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(54, 205, 86)',
				]
			}],
		}
	}

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		}
	}

	return (
		!isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> : <Doughnut data={state.chartData} options={options} />
	);
}

export default DoughnutDivisaoEngajamento;