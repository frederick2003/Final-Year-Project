import React, { useState } from "react";
import "./Chicken/ChickenConclusionStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const TreeConclusion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const controlResults = location.state?.controlResults || [];
  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  if (!results.length) {
    return <p>No data available. Please go back to the results page.</p>;
  }

  const labels = results.map((entry) => `Year ${entry.year}`);
  const heightData = results.map((entry) => entry.height);
  const diameterData = results.map((entry) => entry.diameter);

  const totalHeight =
    heightData.reduce((acc, val) => acc + val, 0) / results.length;
  const totalDiameter =
    diameterData.reduce((acc, val) => acc + val, 0) / results.length;

  const suggestedConclusions = [
    "The trees grew significantly under the given conditions.",
    "The environmental conditions may have limited the tree growth.",
    "There was minimal impact on tree growth over time.",
  ];

  const [selectedConclusion, setSelectedConclusion] = useState(
    suggestedConclusions[0]
  );

  const handleConclusionChange = (event) => {
    setSelectedConclusion(event.target.value);
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const lineBarChartData = {
    labels,
    datasets: [
      {
        label: "Tree Height (m)",
        data: heightData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Tree Diameter (cm)",
        data: diameterData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const reflectionQuestions = [
    "Did you collect the data consistently each day at the same time?",
    "Did you have a large enough sample size for the results to be meaningful?",
    "Did you consider other factors that could have affected the growth rate?",
    "Did you follow a clear hypothesis and experimental design?",
    "Do you think your results are reliable enough to draw a conclusion?",
    "Do your results match that of your hypothesis or not?",
    "Did you keep all variables the same except your one independent variable throughout the entire experiment ",
    "Did you repeat the experiment enough times to obtain reliable results?",
  ];

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Tree Growth Conclusion</h1>
      <div className="chart-container">
        <h2>Tree Growth Over Time</h2>
        <div className="chart-wrapper">
          <Line data={lineBarChartData} options={chartOptions} />
        </div>
      </div>
      <div className="right-column">
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

      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Results
      </button>
    </div>
  );
};

export default TreeConclusion;
