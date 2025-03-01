import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ResultsPage() {
  const Navigate = useNavigate();
  const goToConclusion = () => {
    Navigate("/TreeConclusion", { state: { results, controlResults } });
  };
  const location = useLocation();
  const { results, controlResults } = location.state || {
    results: [],
    controlResults: [],
    firstValue: "",
    comparisionValue: "",
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

  const experimentColor = "rgba(54, 162, 235, 1)"; // Blue for experiment
  const controlColor = "rgba(255, 99, 132, 1)"; // Red for control

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Tree Growth Over Time",
        font: { size: 16 },
        padding: 20,
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "Height (m)",
          font: { size: 14 },
        },
      },
      x: {
        title: {
          display: true,
          text: "Years",
          font: { size: 14 },
        },
      },
    },
  };

  const suggestedConclusions = [
    "The trees exposed to conditions [experiment conditions] grew more than the trees exposed to [control conditions].",
    "The trees exposed to conditions [experiment conditions] actually grew less over time than the trees exposed to [control conditions]",
    "The trees exposed to conditions [experiment conditions] grew at almost the same rate over time than the trees exposed to [control conditions]",
    "Too many trees fell down during the running of the experiment. As such accurate results were not achieved",
  ];

  const [selectedConclusion, setSelectedConclusion] = useState(
    suggestedConclusions[0]
  );

  const handleConclusionChange = (event) => {
    setSelectedConclusion(event.target.value);
  };

  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  const reflectionQuestions = [
    "Do you think the extreme weather could effect the results you obtained?",
    "Do you think that variable [Z] that you didn't control could have had an effect on the rate of growth over time?",
    "Reflection question 3.",
    "Reflection question 4.",
    "Reflection question 5.",
  ];

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Experiment Results
      </h1>
      {results.length > 0 ? (
        <div>
          {Object.keys(groupedResults).map((experiment) => {
            const labels = groupedResults[experiment].map(
              (result) => `Year ${result.year}`
            );

            const chartData = {
              labels,
              datasets: [
                {
                  label: `Experiment ${experiment}`,
                  data: groupedResults[experiment].map(
                    (result) => result.height
                  ),
                  borderColor: experimentColor,
                  backgroundColor: experimentColor.replace("1)", "0.2)"),
                  tension: 0.4,
                },
                ...(groupedControlResults[experiment]
                  ? [
                      {
                        label: `Control ${experiment}`,
                        data: groupedControlResults[experiment].map(
                          (result) => result.height
                        ),
                        borderColor: controlColor,
                        backgroundColor: controlColor.replace("1)", "0.2)"),
                        tension: 0.4,
                      },
                    ]
                  : []),
              ],
            };

            // Create an array of years to ensure alignment
            const allYears = [
              ...new Set([
                ...groupedResults[experiment].map((r) => r.year),
                ...(groupedControlResults[experiment]?.map((r) => r.year) ||
                  []),
              ]),
            ].sort((a, b) => a - b);

            return (
              <div
                key={experiment}
                style={{
                  marginBottom: "40px",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>
                  Experiment {experiment}
                </h3>

                {/* Graph Container */}
                <div style={{ height: "450px", marginBottom: "30px" }}>
                  <Line data={chartData} options={options} />
                </div>

                {/* Tables Container */}
                <div style={{ display: "flex", gap: "30px" }}>
                  {/* Experiment Table */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: "15px" }}>Experiment Results</h4>
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                border: "1px solid #ccc",
                                padding: "12px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              Year
                            </th>
                            <th
                              style={{
                                border: "1px solid #ccc",
                                padding: "12px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              Height (m)
                            </th>
                            <th
                              style={{
                                border: "1px solid #ccc",
                                padding: "12px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              Age (years)
                            </th>
                            <th
                              style={{
                                border: "1px solid #ccc",
                                padding: "12px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              Event
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allYears.map((year) => {
                            const result = groupedResults[experiment].find(
                              (r) => r.year === year
                            );
                            return (
                              <tr key={year}>
                                <td
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "12px",
                                  }}
                                >
                                  {year}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "12px",
                                  }}
                                >
                                  {result ? result.height : "-"}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "12px",
                                  }}
                                >
                                  {result ? result.age : "-"}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "12px",
                                    color:
                                      result?.event !== "No major event"
                                        ? "red"
                                        : "black",
                                  }}
                                >
                                  {result ? result.event : "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Control Table */}
                  {groupedControlResults[experiment] && (
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: "15px" }}>Control Results</h4>
                      <div style={{ overflowX: "auto" }}>
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                Year
                              </th>
                              <th
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                Height (m)
                              </th>
                              <th
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                Age (years)
                              </th>
                              <th
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                Event
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allYears.map((year) => {
                              const result = groupedControlResults[
                                experiment
                              ].find((r) => r.year === year);
                              return (
                                <tr key={year}>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "12px",
                                    }}
                                  >
                                    {year}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "12px",
                                    }}
                                  >
                                    {result ? result.height : "-"}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "12px",
                                    }}
                                  >
                                    {result ? result.age : "-"}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "12px",
                                      color:
                                        result?.event !== "No major event"
                                          ? "red"
                                          : "black",
                                    }}
                                  >
                                    {result ? result.event : "-"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No results available to display.</p>
      )}
      <div>
        <div>
          {" "}
          <h3>Final Conclusion:</h3>
          <select value={selectedConclusion} onChange={handleConclusionChange}>
            {suggestedConclusions.map((conclusion, index) => (
              <option key={index} value={conclusion}>
                {conclusion}
              </option>
            ))}
          </select>
          <p>
            <strong>Conclusion:</strong> {selectedConclusion}
          </p>
        </div>
        <div>
          <h2>Reflection on Your Experiment</h2>
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            className="dropdown-button"
          >
            {showQuestions
              ? "Hide Reflection Questions"
              : "Show Reflection Questions"}
          </button>
          {showQuestions && (
            <div className="reflection-questions">
              {reflectionQuestions.map((question, index) => (
                <div key={index} className="question">
                  <p>{question}</p>
                  <div className="options">
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="yes"
                        checked={answers[index] === "yes"}
                        onChange={() => handleAnswerChange(index, "yes")}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="no"
                        checked={answers[index] === "no"}
                        onChange={() => handleAnswerChange(index, "no")}
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="idk"
                        checked={answers[index] === "idk"}
                        onChange={() => handleAnswerChange(index, "idk")}
                      />
                      I don't know
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => Navigate(-5)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Return to home page
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
