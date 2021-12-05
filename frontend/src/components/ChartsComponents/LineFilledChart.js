import React from 'react';
import { Line } from 'react-chartjs-2';

const LineAcompanhamentoEventoTempo = (props) => {

  const state = {
    labels: props.labels,
    datasets: [
      {
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        data: props.data
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    }
  }

  return (

    <Line
      data={state}
      options={options}
    />

  );

}

export default LineAcompanhamentoEventoTempo;