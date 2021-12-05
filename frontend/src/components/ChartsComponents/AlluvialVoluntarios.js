import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from "highcharts-react-official";
import api from '../../api';
import ReactLoading from 'react-loading';
import { useCookies } from 'react-cookie';

HighchartsSankey(Highcharts);

const AlluvialVoluntarios = (props) => {


    const [isLoaded, setIsloaded] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
    const [label, setLabel] = useState([])
    const [dataChart, setDataChart] = useState([]);
    const [dataChartAntigo, setDataChartAntigo] = useState([]);

    useEffect(() => {

        api('/dash/aluvial/atual', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            console.log(resposta)
            setDataChart(resposta.data.data.map(dat => [dat.from, dat.to, dat.weight]));
            setDataChartAntigo(resposta.data.dataAntigo.map(dat => [dat.from, dat.to, dat.weight]));
            setIsloaded(true);
        })
    }, [])



    const data = {
        title: {
            text: ""
        },
        series: [
            {
                keys: ["from", "to", "weight"],
                data: props.periodo == 0 ? dataChart.concat(dataChartAntigo) : props.periodo == 1 ? dataChartAntigo : dataChart,
                type: "sankey",
                name: "Sankey demo series"
            }
        ]
    }


    return (
        !isLoaded ? <ReactLoading type="spin" color="#06377B" className="loading-spin" /> : <HighchartsReact highcharts={Highcharts} options={data} />
    );
}


export default AlluvialVoluntarios;