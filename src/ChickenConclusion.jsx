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

const ChickConclusion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const experimentData = location.state?.experimentData || [];
  const hypothesis = location.state?.hypothesis || "No hypothesis provided.";

  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  if (!experimentData.length) {
    return <p>No data available. Please go back to the results page.</p>;
  }

  const labels = experimentData.map((entry) => `Day ${entry.day}`);
  const withMusicData = experimentData.map((entry) => entry.eggsWithMusic);
  const withoutMusicData = experimentData.map(
    (entry) => entry.eggsWithoutMusic
  );

  const totalEggsWithMusic = withMusicData.reduce((acc, val) => acc + val, 0);
  const totalEggsWithoutMusic = withoutMusicData.reduce(
    (acc, val) => acc + val,
    0
  );
  // Determine if results align with the hypothesis
  let experimentOutcome = "";
  if (totalEggsWithMusic > totalEggsWithoutMusic) {
    experimentOutcome = "increase";
  } else if (totalEggsWithMusic < totalEggsWithoutMusic) {
    experimentOutcome = "decrease";
  } else {
    experimentOutcome = "no effect";
  }
  const suggestedConclusions = {
    increase: [
      "My results support my hypothesis, as the chickens exposed to music laid more eggs.",
      "The data suggests that music positively affects egg production.",
      "Music exposure appears to enhance the productivity of chickens in terms of egg-laying.",
    ],
    decrease: [
      "My results contradict my hypothesis, as the chickens exposed to music laid fewer eggs.",
      "The data suggests that music might have a negative impact on egg production.",
      "Unexpectedly, chickens not exposed to music laid more eggs than those with music.",
    ],
    "no effect": [
      "My results did not support my hypothesis, as there was no difference in egg production.",
      "The experiment suggests that music does not significantly impact egg production.",
      "The data indicates no clear correlation between music exposure and egg-laying rates.",
    ],
  };

  // Default selected conclusion
  const [selectedConclusion, setSelectedConclusion] = useState(
    suggestedConclusions[experimentOutcome][0]
  );

  // Handle user selecting a different conclusion
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

  const pieChartData = {
    labels: ["Eggs With Music", "Eggs Without Music"],
    datasets: [
      {
        data: [totalEggsWithMusic, totalEggsWithoutMusic],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const reflectionQuestions = [
    "Did you ensure the hens had the same living conditions except for the music?",
    "Did you collect the data consistently each day at the same time?",
    "Did you have a large enough sample size for the results to be meaningful?",
    "Did you consider other factors that could have affected the egg-laying rate?",
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
      <h1>
        Original Hypothesis
        <h2>{hypothesis}</h2>
      </h1>
      <div className="left-column">
        <h1>Experiment Conclusions</h1>{" "}
        <div className="chart-container">
          <h2>Line Graph</h2>
          <div className="chart-wrapper">
            <Line data={lineBarChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-container">
          <h2>Bar Chart</h2>
          <div className="chart-wrapper">
            {" "}
            <Bar data={lineBarChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-container">
          {" "}
          <h2>Pie Chart</h2>
          <div className="chart-wrapper">
            {" "}
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-container">
          <h2>Table of Eggs Layed by Each Group</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Eggs With Music</th>
                  <th>Eggs Without Music</th>
                </tr>
              </thead>
              <tbody>
                {experimentData.map((entry, index) => (
                  <tr key={index}>
                    <td>{`Day ${entry.day}`}</td>
                    <td>{entry.eggsWithMusic}</td>
                    <td>{entry.eggsWithoutMusic}</td>
                  </tr>
                ))}
                <tr>
                  Total
                  <td>{totalEggsWithMusic}</td>
                  <td>{totalEggsWithoutMusic}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reflection Questions Section */}
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
        <h3>What is the conclusion?</h3>
        <p>
          The conclusion is a statement to finish your experiment. It typically
          states the new learnings and observations that we found during the
          experiment.{" "}
        </p>

        <select value={selectedConclusion} onChange={handleConclusionChange}>
          {suggestedConclusions[experimentOutcome].map((conclusion, index) => (
            <option key={index} value={conclusion}>
              {conclusion}
            </option>
          ))}
        </select>

        <p>
          <strong>Final Conclusion:</strong> {selectedConclusion}
        </p>
        <h3>
          Add here something about limitations of the experiment. E.g The
          experiment might need to be repeated more.
        </h3>
        <h3>
          {" "}
          Do you think the fact chicken group 1 were fed more might have
          effected their results? ETC
        </h3>
      </div>

      <button className="back-button" onClick={() => navigate(-6)}>
        Back to Home
      </button>
    </div>
  );
};

export default ChickConclusion;
