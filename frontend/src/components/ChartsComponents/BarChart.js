import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {

  const state = {
    labels: props.labels,
    datasets: [
      {
        fill: props.fill,
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

    <Bar
      data={state}
      options={options}
    />

  );

}

export default BarChart;