import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChickenResults = ({ experimentData = [] }) => {
  const labels = experimentData.map((_, index) => `Group ${index + 1}`);
  const withMusicData = experimentData.map((group) => group.eggsWithMusic);
  const withoutMusicData = experimentData.map(
    (group) => group.eggsWithoutMusic
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Eggs With Music",
        data: withMusicData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Eggs Without Music",
        data: withoutMusicData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Eggs With Music",
        data: withMusicData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Eggs Without Music",
        data: withoutMusicData,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chicken Egg Production With and Without Music",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Eggs",
        },
      },
      x: {
        title: {
          display: true,
          text: "Groups",
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Experiment Results</h1>

      {experimentData.length > 0 ? (
        <div className="w-full max-w-4xl space-y-8">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Line Chart Visualization
            </h2>
            <Line data={chartData} options={options} />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Bar Chart Visualization
            </h2>
            <Bar data={barData} options={options} />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">With Music:</h3>
                <p>Total Eggs: {withMusicData.reduce((a, b) => a + b, 0)}</p>
                <p>
                  Average per Group:{" "}
                  {(
                    withMusicData.reduce((a, b) => a + b, 0) /
                    withMusicData.length
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Without Music:</h3>
                <p>Total Eggs: {withoutMusicData.reduce((a, b) => a + b, 0)}</p>
                <p>
                  Average per Group:{" "}
                  {(
                    withoutMusicData.reduce((a, b) => a + b, 0) /
                    withoutMusicData.length
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">
          No results available to display.
        </p>
      )}
    </div>
  );
};

export default ChickenResults;
