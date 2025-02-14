import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function ResultsPage() {
  const Navigate = useNavigate();
  const goToConclusion = () => {
    Navigate("/conclusion");
  };
  const location = useLocation();
  const { results, controlResults } = location.state || {
    results: [],
    controlResults: [],
  };

  // Group results by experiment number
  const groupedResults = {};
  results.forEach((result) => {
    if (!groupedResults[result.experiment]) {
      groupedResults[result.experiment] = [];
    }
    groupedResults[result.experiment].push(result);
  });

  const groupedControlResults = {};
  if (controlResults.length > 0) {
    controlResults.forEach((result) => {
      if (!groupedControlResults[result.experiment]) {
        groupedControlResults[result.experiment] = [];
      }
      groupedControlResults[result.experiment].push(result);
    });
  }

  // Color options for different runs
  const colorPalette = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const datasets = Object.keys(groupedResults)
    .map((experiment, index) => {
      const data = groupedResults[experiment];

      return [
        {
          label: `Height (Exp ${experiment})`,
          data: data.map((result) => result.height),
          borderColor: colorPalette[index % colorPalette.length],
          backgroundColor: colorPalette[index % colorPalette.length].replace(
            "1)",
            "0.2)"
          ),
          tension: 0.4,
        },
        {
          label: `Diameter (Exp ${experiment})`,
          data: data.map((result) => result.diameter),
          borderColor: colorPalette[(index + 1) % colorPalette.length],
          backgroundColor: colorPalette[
            (index + 1) % colorPalette.length
          ].replace("1)", "0.2)"),
          tension: 0.4,
        },
      ];
    })
    .flat(); // Flatten array since map creates nested arrays

  const labels =
    results.length > 0
      ? groupedResults[1].map((result) => `Year ${result.year}`)
      : [];

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10, // Reduce legend box size
          font: {
            size: 10, // Smaller font for legend
          },
        },
      },
      title: {
        display: true,
        text: "Tree Growth Over Time Across Experiments",
      },
    },
    layout: {
      padding: {
        bottom: 20, // Add padding for bottom legend
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "Growth Measurement",
        },
      },
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
    },
  };

  return (
    <div>
      <h1>Experiment Results</h1>
      {results.length > 0 ? (
        <div>
          {Object.keys(groupedResults).map((experiment, index) => {
            const heightData = {
              labels: groupedResults[experiment].map(
                (result) => `Year ${result.year}`
              ),
              datasets: [
                {
                  label: `Height (Exp ${experiment})`,
                  data: groupedResults[experiment].map(
                    (result) => result.height
                  ),
                  borderColor: colorPalette[index % colorPalette.length],
                  backgroundColor: colorPalette[
                    index % colorPalette.length
                  ].replace("1)", "0.2)"),
                  tension: 0.4,
                },
              ],
            };

            const diameterData = {
              labels: groupedResults[experiment].map(
                (result) => `Year ${result.year}`
              ),
              datasets: [
                {
                  label: `Diameter (Exp ${experiment})`,
                  data: groupedResults[experiment].map(
                    (result) => result.diameter
                  ),
                  borderColor: colorPalette[(index + 1) % colorPalette.length],
                  backgroundColor: colorPalette[
                    (index + 1) % colorPalette.length
                  ].replace("1)", "0.2)"),
                  tension: 0.4,
                },
              ],
            };

            return (
              <div
                key={experiment}
                style={{ display: "flex", marginBottom: "20px" }}
              >
                {/* Left side: Graphs */}
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <h3>Experiment {experiment}</h3>

                  {/* Height Graph */}
                  <h4>Height Growth</h4>
                  <Line data={heightData} options={options} />

                  {/* Diameter Graph */}
                  <h4>Diameter Growth</h4>
                  <Line data={diameterData} options={options} />
                </div>

                {/* Right side: Table */}
                <div style={{ flex: 1 }}>
                  <h4>Textual Results</h4>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                          Year
                        </th>
                        <th
                          style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                          Height (m)
                        </th>
                        <th
                          style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                          Diameter (cm)
                        </th>
                        <th
                          style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                          Age (years)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedResults[experiment].map((result, rowIndex) => (
                        <tr key={rowIndex}>
                          <td
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                          >
                            {result.year}
                          </td>
                          <td
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                          >
                            {result.height}
                          </td>
                          <td
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                          >
                            {result.diameter}
                          </td>
                          <td
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                          >
                            {result.age}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No results available to display.</p>
      )}
      {controlResults.length > 0 && (
        <div>
          <h2>Control Experiment Results</h2>
          {Object.keys(groupedControlResults).map((experiment, index) => {
            const data = {
              labels: groupedControlResults[experiment].map(
                (result) => `Year ${result.year}`
              ),
              datasets: [
                {
                  label: `Height (Control Exp ${experiment})`,
                  data: groupedControlResults[experiment].map(
                    (result) => result.height
                  ),
                  borderColor: "rgba(255, 99, 132, 1)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  tension: 0.4,
                },
                {
                  label: `Diameter (Control Exp ${experiment})`,
                  data: groupedControlResults[experiment].map(
                    (result) => result.diameter
                  ),
                  borderColor: "rgba(255, 159, 64, 1)",
                  backgroundColor: "rgba(255, 159, 64, 0.2)",
                  tension: 0.4,
                },
              ],
            };

            return (
              <div key={experiment}>
                <h3>Control Experiment {experiment}</h3>
                <Line data={data} options={options} />
              </div>
            );
          })}
        </div>
      )}
      <button onClick={goToConclusion}>Go to Conclusion</button>
    </div>
  );
}

export default ResultsPage;
