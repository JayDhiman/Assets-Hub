import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const AssetsPieChart = () => {
  const [software, setSoftware] = useState([]);
  
  useEffect(() => {
    fetchSoftwareList();
  }, []);

  const fetchSoftwareList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Software");
      setSoftware(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Extract unique software names from the data
  const uniqueSoftware = [...new Set(software.map(item => item.software))];
  
  // Prepare data for the chart
  const data = {
    labels: uniqueSoftware,
    datasets: [
      {
        label: "Assets",
        data: uniqueSoftware.map(label => 
          software.filter(item => item.software === label).length
        ),
        backgroundColor: [
          'rgba(125, 69, 132, 0.9)',
          'rgba(154, 12, 35, 0.7)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
      },
    ],
    hoverOffset: 4
  };

  // Options for the chart
  const options = {
    plugins: {
      legend: {
        display: false // Hide the legend (labels)
      }
    }
  };

  // Calculate total number of assets
  const totalAssets = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);

  return (
    <div className='bg-white py-2 p-3 rounded-2xl relative drop-shadow-md'>
      <div className='container'>
        <Doughnut data={data} options={options} />
      </div>
      <div className='mb-3'>
        {data.labels.map((label, index) => (
          <div key={index} className='flex'>
            <div className='text-sm font-thin mx-2'>{label} -</div>
            <div className='text-sm font-thin '>
              {((data.datasets[0].data[index] / totalAssets) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsPieChart;
