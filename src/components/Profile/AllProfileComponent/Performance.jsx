import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto"; // Import Chart.js

const Performance = () => {
  const allResult = useSelector((state) => state.result.results);
  const scoresArray = allResult && allResult.map((result) => result.score);

  // Ref for the chart canvas
  const chartRef = useRef(null);

  useEffect(() => {
    // Ensure scoresArray is available and non-empty
    if (scoresArray && scoresArray.length > 0) {
      // Create chart
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: scoresArray.length }, (_, i) => i + 1), // Generating labels
          datasets: [
            {
              label: "Scores",
              data: scoresArray,
              borderColor: "blue",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false, // Start y-axis at 1
              max: 16, // Maximum value for y-axis
              ticks: {
                stepSize: 1, // Set the step size for y-axis ticks to 1
                callback: function (value) {
                  return value; // Display the tick value
                },
              },
            },
          },
          maintainAspectRatio: false, // Make the chart responsive
          responsive: true, // Make the chart responsive
        },
      });
    }
  }, [scoresArray]);

  return (
    <div className="h-[90vh] mx-auto p-3 w-[95%]  bg-[#fff]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Performance;
