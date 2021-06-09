import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarTurnover = () => {
  
  const state = {
    labels: ["FAIXA 1", "FAIXA 2", "FAIXA 3", "FAIXA 4", "FAIXA 5", "FAIXA 6"],
    datasets: [
      {
        label: "Atuais",
        backgroundColor: "rgb(54, 162, 235)",
        data: [100, 70, 20, 30, 10, 5]
      },
      {
        label:"Sairam",
        fillcolor: "red",
        backgroundColor:"rgb(255, 99, 132)",
        data: [20, 5, 1, 4, 9, 3]
      },
      
    ]
  }

  const options = {
    
  }
  
  return (
    

    <Bar 
      data={state}
      option={options}
    />

  );
}

export default BarTurnover