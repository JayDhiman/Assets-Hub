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
              backgroundColor: "rgba(220, 255, 255, 0.9)", // Adjusted color for count
              borderColor: "rgba(229, 104, 118, 0.19)",
              borderWidth: 1
            },
            {
              label: "Assigned",
              data: assigned,
              backgroundColor: "rgba(212, 224, 255, 0.9)", // Adjusted color for assigned
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
    <div className="flex flex-col items-center justify-center bg-sk-50 max-w-fit rounded-lg p-2 ">
      <div className="w-full  sm:h-96 sm:min-w-[55vw] max-sm:h-56 ">
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
    </div>

  );
};

export default AssetCategoryChart;
