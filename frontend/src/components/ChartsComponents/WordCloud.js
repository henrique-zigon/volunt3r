import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import HighchartsWordCLoud from "highcharts/modules/wordcloud";
import HighchartsReact from "highcharts-react-official";
import api from '../../api';
import ReactLoading from 'react-loading';
import { useCookies } from 'react-cookie';

HighchartsWordCLoud(Highcharts);

const WordCloud = (props) => {

    
    const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);

    const [dataChart, setDataChart] = useState([]);

    const [isLoaded, setIsloaded] = useState(false);


    useEffect(() => {

        api('/publicacoes/hashtagsWordCloud', {
            method: "GET",
            headers: {
                'Authorization': cookies.volunt3r
            }
        }).then(resposta => {
            setDataChart(resposta.data);
        })

    }, [])

  
    const data = {
        title: {
            text: ""
        },
        series: [
            {
                data: dataChart,
                type: "wordcloud",
                name: "Word Cloud"
            }
        ]
    }
        
    // Highcharts.chart({grafico}, {
    //     accessibility: {
    //         screenReaderSection: {
    //             beforeChartFormat: '<h5>{chartTitle}</h5>'
    //         }
    //     },
    //     series: [{
    //         type: 'wordcloud',
    //         data,
    //         name: 'Usos'
    //     }],
    //     title: {
    //         text: 'Wordcloud of Lorem Ipsum'
    //     }
    // });
        
    
return (<HighchartsReact highcharts={Highcharts} options={data} />)

}

export default WordCloud;