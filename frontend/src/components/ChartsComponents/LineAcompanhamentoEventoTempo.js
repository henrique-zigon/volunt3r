import React from 'react';
import { Line } from 'react-chartjs-2';

const LineAcompanhamentoEventoTempo = () => {

  const state = {
    labels: ['nov/2020', 'dez/2020', 'jan/2021',
      'fev/2021', 'mar/2021'],
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        data: [65, 59, 80, 41, 56]
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