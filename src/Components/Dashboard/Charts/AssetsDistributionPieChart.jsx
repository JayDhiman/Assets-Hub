import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const AssetsPieChart = () => {

const labels = ["Laptop", "Monitor", "Desktop", "Phone", "Cables", "Headset"];


  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Assets",
        data: [ 45, 15, 5, 30, 20,10 ],
      },
    ],
    hoverOffset: 4
  };

  const options = {
    plugins: {
      legend: {
        display: false // Hide the legend (labels)
      }
    }
  };
  const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);

  return (
    <div className='bg-white py-2 p-3 rounded-2xl relative drop-shadow-md'>
    <div className='container'>
      <Doughnut data={data} options={options} />
    </div>
    <div className='mb-3'>
      {data.labels.map((label, index) => (
        <div key={index} className='flex'>
          <div className='text-sm font-thin mx-2'>{label} -</div>
          <div className='text-sm font-thin '>{((data.datasets[0].data[index] / total) * 100).toFixed(2)}%</div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default AssetsPieChart;
