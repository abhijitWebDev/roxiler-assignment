/* eslint-disable react/prop-types */
import React from 'react'
import { Bar } from 'react-chartjs-2';

const Barchart = ({data}) => {
    const chartData = {
        labels: data.map((item) => item.priceRange),
        datasets: [
          {
            label: '# of items',
            data: data.map((item) => item.numberOfItems),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      return (
        <Bar data={chartData} />
      ) ;
}

export default Barchart;