import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterVoluntariosTempoDeCasa = () => {

  const state = {
    datasets: [{
      data: [
        { x: 0, y: 0}, 
        { x: 0, y: 10 }, 
        { x: 10, y: 5 }, 
        { x: 0.5, y: 5.5 }, 
        { x: 15, y: 5 },
        { x: 5, y: 5 },
        { x: 25, y: 6 },
        { x: 10, y: 4 },
        { x: 10, y: 15 },
      ],
      backgroundColor: 'rgb(54, 162, 235)'
    }],

  }

  const options = {
    datalabels: {
      display: false
    }
  }

  return(
    <Scatter 
      data={state}
      option={options}
    />

  );


}

export default ScatterVoluntariosTempoDeCasa;