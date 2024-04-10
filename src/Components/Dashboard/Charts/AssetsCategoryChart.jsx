import Chart from 'chart.js/auto';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const AssetCategoryChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      const data = response.data;

      if (data && data.length > 0) {
        let machines = [];
        let counts = [];
        let assigned = [];

        for (const category of data) {
          machines.push(category.Machines);
          counts.push(category.Count);
          assigned.push(category.Assigned);
        }

        setChartData({
          labels: machines,
          datasets: [
            {
              label: "Count",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            },
            {
              label: "Assigned",
              data: assigned,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1
            }
          ]
        });
      } else {
        console.log("No data received from the API.");
      }
    } catch (error) {
      console.log("Error fetching chart data:", error);
    }
  };

  return (
    <div className="App">
      <div className='md:min-w-[600px] md:min-h-[40vh] '>
        {chartData.labels && chartData.labels.length > 0 && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Asset Categories", display: true },
              scales: {
                y: {
                  beginAtZero: true // Ensure the y-axis starts at zero
                }
              }
            }}
          />
        )}
      </div>
      <h1 className='text-center font-extralight'>Asset Category Chart</h1>

    </div>
  );
};

export default AssetCategoryChart;


