import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart from 'chart.js/auto' to use Chart.js directly
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

        // Define gradient colors for the datasets
        const ctx = document.createElement('canvas').getContext('2d');
        const gradientCount = ctx.createLinearGradient(0, 300, 0, 0);
        gradientCount.addColorStop(0, 'rgba(131, 133, 158, 0.9)');
        gradientCount.addColorStop(1, 'rgba(131, 133, 158, 0)');
        const gradientAssigned = ctx.createLinearGradient(0, 300, 0, 0);
        gradientAssigned.addColorStop(0, 'rgba(90, 100, 225, 0.57)');
        gradientAssigned.addColorStop(1, 'rgba(90, 100, 225, 0)');

        setChartData({
          labels: machines,
          datasets: [
            {
              label: "Count",
              data: counts,
              backgroundColor: gradientCount, // Use gradient color for count
              borderWidth: 1
            },
            {
              label: "Assigned",
              data: assigned,
              backgroundColor: gradientAssigned, // Use gradient color for assigned
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
  
      <div className="w-full h-full">
        {chartData.labels && chartData.labels.length > 0 && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Ensure aspect ratio is not maintained
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
  );
};

export default AssetCategoryChart;
