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
        label: "installation",
        data: uniqueSoftware.map(label => (
          software.filter(item => item.software === label).length

        )

         
        
        ),
        backgroundColor: [
          'rgba(131, 237, 158, 0.87)',
          'rgba(30, 145, 242, 0.4)',
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
        display: false // Hide the labels
      }
    }
  };

  // Calculate total number of assets


  return (
    <div className=' px-1 rounded-2xl relative drop-shadow-md max-sm:w-full'>
      <div className='m-2 md:py-2 max-sm:py-1'>
        <Doughnut data={data} options={options} />
      </div>
      
      <div className='md:pt-4 max-sm:py-2'>
        <h1 className='uppercase text-md font-primary font-light text-center'>Software Data</h1>
      </div>

    </div>
  );
};

export default AssetsPieChart;
