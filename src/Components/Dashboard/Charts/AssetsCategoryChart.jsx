import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AssetCategoryChart = () => {
  // Sample data for assets and quantities
  const assetData = [
    { category: 'Laptop',   quantity: 120 },
    { category: 'Computer', quantity: 70 },
    { category: 'Phone',    quantity: 150 },
    { category: 'Headset',  quantity: 40 },
    { category: 'cables',   quantity: 150 },
  ];

  // Extracting labels and data from assetData
  const labels = assetData.map(asset => asset.category);
  const quantities = assetData.map(asset => asset.quantity);

  const data = {
    labels: labels, // Labels for each bar
    datasets: [
      {
        label: 'Quantity', // Label for the dataset
        backgroundColor: 'rgba(14,90,192,0.2)', // Bar color
        borderColor: 'rgba(75,192,192,1)', // Border color
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)', // Hover color
        hoverBorderColor: 'rgba(75,192,192,1)', // Hover border color
        data: quantities // Quantities for each category
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false // Hide x-axis grid lines
        }
      },
      y: {
        ticks: {
          crossAlign: 'far'
        },
        grid: {
          display: false // Hide y-axis grid lines
        }
      }
    },

    plugins: {
      legend: {
        display: false
      }
    }
  };


  return (

    <div className=" p-2 rounded-lg w-1/2 shadow-xl  overflow-auto">
      <h2 className="text-lg mb-4 text-center font-extralight uppercase text-stone-800">Asset-Categories </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>

  );
};

export default AssetCategoryChart;
