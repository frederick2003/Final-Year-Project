import React, { useState } from "react";
import "./ChickResults.css";
import "./ChickenPublication.css";
import "./Styling/TableStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
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

const ChickenResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const experimentCount = location.state?.experimentCount || 1; // Get experiment run count
  const showFullData = experimentCount > 1; // Show more details after first experiment
  const previousConclusion = location.state?.previousConclusion || "";
  const experimentData = location.state?.experimentData || [];
  const hypothesis = location.state?.hypothesis || "No hypothesis provided.";
  const firstValue = location.state?.firstValue || "No value provided.";
  const comparisonValue =
    location.state?.comparisonValue || "No value provided.";
  // Calculate totals for the last row
  const totalWithMusic = experimentData.reduce(
    (sum, day) => sum + day.eggsWithMusic,
    0
  );
  const totalWithoutMusic = experimentData.reduce(
    (sum, day) => sum + day.eggsWithoutMusic,
    0
  );

  // Calculate data points and statistics
  const labels = experimentData.map((entry) => `Day ${entry.day}`);
  const withMusicData = experimentData.map((entry) => entry.eggsWithMusic);
  const withoutMusicData = experimentData.map(
    (entry) => entry.eggsWithoutMusic
  );

  // Compute Averages
  const avgEggsWithMusic =
    withMusicData.reduce((acc, val) => acc + val, 0) / withMusicData.length;
  const avgEggsWithoutMusic =
    withoutMusicData.reduce((acc, val) => acc + val, 0) /
    withoutMusicData.length;

  // Calculate standard deviations
  const stdDevWithMusic = Math.sqrt(
    withMusicData.reduce(
      (acc, val) => acc + Math.pow(val - avgEggsWithMusic, 2),
      0
    ) / withMusicData.length
  );
  const stdDevWithoutMusic = Math.sqrt(
    withoutMusicData.reduce(
      (acc, val) => acc + Math.pow(val - avgEggsWithoutMusic, 2),
      0
    ) / withoutMusicData.length
  );

  const lineBarChartData = {
    labels,
    datasets: [
      {
        label: firstValue,
        data: withMusicData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: comparisonValue,
        data: withoutMusicData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      title: {
        display: true,
        text: `Egg Production per day: ${firstValue} vs ${comparisonValue}`,
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  // Line Chart Data (Averages - "Misleading" View)
  const averagedChartData = {
    labels: ["Average Eggs per Day"],
    datasets: [
      {
        label: firstValue,
        data: [avgEggsWithMusic],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: comparisonValue,
        data: [avgEggsWithoutMusic],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      title: {
        display: true,
        text: `Average Daily Egg Production Comparison`,
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  const suggestedConclusions = [
    "The chickens exposed to " +
      firstValue +
      " produced more eggs over time than the chickens exposed to " +
      comparisonValue +
      ".",

    "The chickens exposed to " +
      firstValue +
      " produced less eggs over time than the chickens exposed to " +
      comparisonValue +
      ".",
    "The chickens exposed to " +
      firstValue +
      " produce almost the same amount of eggs over time than the chickens exposed to " +
      comparisonValue +
      ".",
    "The results vary randomly, meaning there is no real effect of music on the same amount of eggs produced over time.",
  ];

  const [selectedConclusion, setSelectedConclusion] = useState(
    suggestedConclusions[0]
  );
  const [showPublication, setShowPublication] = useState(false);
  const [showConclusionPicker, setShowConclusionPicker] = useState(false);

  const handleConclusionSelect = (conclusion) => {
    setSelectedConclusion(conclusion);
    setShowConclusionPicker(false);
  };

  const handlePublishResults = () => {
    alert(
      "Congratulations! Your scientific paper has been published successfully!"
    );
    setShowPublication(false);
    navigate("/ChickenExperiment", {
      state: {
        experimentCount: (location.state?.experimentCount || 1) + 1,
        hypothesis: hypothesis,
        firstValue: firstValue,
        comparisonValue: comparisonValue,
        previousConclusion: selectedConclusion,
      },
    });
  };
  // Replace placeholders in conclusion text
  const formattedConclusion = selectedConclusion
    .replace("[experiment conditions]", firstValue)
    .replace("[control conditions]", comparisonValue);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Generate citation
  const researcherName = "Student Researcher";
  const journalName = "Journal of Agricultural Science Education";
  const volume = Math.floor(Math.random() * 30) + 1;
  const issueNumber = Math.floor(Math.random() * 12) + 1;
  const pages = `${Math.floor(Math.random() * 100) + 1}-${
    Math.floor(Math.random() * 100) + 101
  }`;

  const citation = `${researcherName} (${currentDate.getFullYear()}). Effects of ${firstValue} on Egg Production in Domestic Chickens. ${journalName}, ${volume}(${issueNumber}), ${pages}.`;

  const handleConclusionChange = (event) => {
    setSelectedConclusion(event.target.value);
  };

  return (
    <div className="results-container">
      <h1>Experiment Results</h1>
      <p>🔄 Experiment Run: {experimentCount}</p>

      <div className="experiment-details">
        <p>
          <strong>Hypothesis:</strong> {hypothesis}
        </p>
        <p>
          <strong>Comparison:</strong> {firstValue} vs {comparisonValue}
        </p>
      </div>

      <div className="chart-container">
        {showFullData ? (
          <Line data={lineBarChartData} options={lineChartOptions} />
        ) : (
          <Bar data={averagedChartData} options={barChartOptions} />
        )}
      </div>

      <div className="data-summary">
        {showFullData ? (
          <div className="table-container">
            <h2>Daily Egg Production Data</h2>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>{firstValue}</th>
                  <th>{comparisonValue}</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {experimentData.map((day) => (
                  <tr key={day.day}>
                    <td>Day {day.day}</td>
                    <td>{day.eggsWithMusic}</td>
                    <td>{day.eggsWithoutMusic}</td>
                    <td
                      className={
                        day.eggsWithMusic > day.eggsWithoutMusic
                          ? "positive"
                          : day.eggsWithMusic < day.eggsWithoutMusic
                          ? "negative"
                          : ""
                      }
                    >
                      {(day.eggsWithMusic - day.eggsWithoutMusic).toFixed(1)}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{totalWithMusic}</strong>
                  </td>
                  <td>
                    <strong>{totalWithoutMusic}</strong>
                  </td>
                  <td
                    className={
                      totalWithMusic > totalWithoutMusic
                        ? "positive"
                        : totalWithMusic < totalWithoutMusic
                        ? "negative"
                        : ""
                    }
                  >
                    <strong>
                      {(totalWithMusic - totalWithoutMusic).toFixed(1)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>Summary Statistics</h2>
            <p>
              {firstValue}: {avgEggsWithMusic.toFixed(2)} eggs/day.
              <br />
              {comparisonValue}: {avgEggsWithoutMusic.toFixed(2)} eggs/day.
            </p>
          </div>
        )}
      </div>

      <div className="conclusion-section">
        <h2>Draw Your Conclusion</h2>
        {showFullData ? (
          <div className="conclusion-container">
            <div className="selected-conclusion">
              <p>
                <strong>Your previous conclusion:</strong>
              </p>
              <div className="conclusion-display">
                <p>
                  <strong>{previousConclusion}</strong>
                </p>
              </div>
              <p>
                <strong>
                  Do you think this old conclusion is still valid based on the
                  new data?
                </strong>
              </p>
              <p>
                <strong>Your new conclusion:</strong>
              </p>
              <div
                className="conclusion-display"
                onClick={() => setShowConclusionPicker(true)}
              >
                {selectedConclusion}
                <span className="edit-icon">✏️</span>
              </div>
            </div>
            <button
              className="select-conclusion-btn"
              onClick={() => setShowConclusionPicker(true)}
            >
              Change Conclusion
            </button>
          </div>
        ) : (
          <div className="conclusion-container">
            <div className="selected-conclusion">
              <p>
                <strong>Your conclusion:</strong>
              </p>
              <div
                className="conclusion-display"
                onClick={() => setShowConclusionPicker(true)}
              >
                {selectedConclusion}
                <span className="edit-icon">✏️</span>
              </div>
            </div>
            <button
              className="select-conclusion-btn"
              onClick={() => setShowConclusionPicker(true)}
            >
              Change Conclusion
            </button>
          </div>
        )}
      </div>

      <div className="buttons-container">
        <button
          onClick={() => setShowPublication(true)}
          className="publish-button"
        >
          Publish Results
        </button>
      </div>

      {showConclusionPicker && (
        <div className="conclusion-picker-overlay">
          <div className="conclusion-picker">
            <h2>Select Your Scientific Conclusion</h2>
            <p className="picker-instruction">
              Based on your data, which conclusion best explains your results?
            </p>
            <div className="conclusion-options">
              {suggestedConclusions.map((conclusion, index) => (
                <div
                  key={index}
                  className={`conclusion-option ${
                    selectedConclusion === conclusion ? "selected" : ""
                  }`}
                  onClick={() => handleConclusionSelect(conclusion)}
                >
                  <div className="conclusion-number">{index + 1}</div>
                  <div className="conclusion-text">{conclusion}</div>
                </div>
              ))}
            </div>
            <div className="picker-buttons">
              <button
                onClick={() => setShowConclusionPicker(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPublication && (
        <div className="publication-overlay">
          <div className="publication-modal">
            <div className="publication-header">
              <div className="journal-logo">JASE</div>
              <div className="journal-title">
                <h2>Journal of Agricultural Science Education</h2>
                <p className="journal-info">
                  Volume {volume}, Issue {issueNumber},{" "}
                  {currentDate.getFullYear()}
                </p>
              </div>
              <div className="publication-stamp">PUBLISHED</div>
            </div>

            <article className="scientific-paper">
              <h1>
                Effects of {firstValue} on Egg Production in Domestic Chickens
              </h1>

              <div className="author-info">
                <p>
                  <strong>Author:</strong> {researcherName}
                </p>
                <p>
                  <strong>Institution:</strong> School of Agricultural Sciences
                </p>
                <p>
                  <strong>Date:</strong> {formattedDate}
                </p>
              </div>

              <section className="abstract">
                <h3>Abstract</h3>
                <p>
                  This study investigates the effect of {firstValue} on egg
                  production in domestic chickens compared to
                  {comparisonValue} conditions. {experimentData.length} days of
                  data were collected to examine the relationship between
                  auditory stimuli and egg-laying behavior. The hypothesis that{" "}
                  {hypothesis.toLowerCase()} was tested through a controlled
                  experimental design.
                </p>
              </section>

              <section className="introduction">
                <h3>Introduction</h3>
                <p>
                  Poultry farming practices continue to evolve as new methods
                  for optimizing egg production are explored. Recent studies
                  have suggested that environmental factors, including auditory
                  stimulation, may influence the physiological processes related
                  to egg production in laying hens. This study aims to
                  contribute to the growing body of knowledge by examining
                  whether {firstValue} can affect daily egg output.
                </p>
              </section>

              <section className="methods">
                <h3>Methods</h3>
                <p>
                  Two groups of laying hens of the same breed, age, and dietary
                  conditions were observed over a period of
                  {experimentData.length} days. The experimental group was
                  exposed to {firstValue} conditions, while the control group
                  was maintained under {comparisonValue} conditions. Daily egg
                  collection was performed at the same time each day, and the
                  number of eggs was recorded for statistical analysis.
                </p>
              </section>

              <section className="results">
                <h3>Results</h3>
                <p>
                  The experimental group exposed to {firstValue} produced an
                  average of {avgEggsWithMusic.toFixed(2)}
                  eggs per day (SD = {stdDevWithMusic.toFixed(2)}), while the
                  control group under {comparisonValue}
                  conditions produced an average of{" "}
                  {avgEggsWithoutMusic.toFixed(2)} eggs per day (SD ={" "}
                  {stdDevWithoutMusic.toFixed(2)}).
                  {Math.abs(avgEggsWithMusic - avgEggsWithoutMusic) > 1
                    ? ` This represents a difference of ${Math.abs(
                        avgEggsWithMusic - avgEggsWithoutMusic
                      ).toFixed(2)} eggs per day between the two conditions.`
                    : ` The difference between conditions was minimal at ${Math.abs(
                        avgEggsWithMusic - avgEggsWithoutMusic
                      ).toFixed(2)} eggs per day.`}
                </p>
                <h2></h2>
                {showFullData ? (
                  <Line data={lineBarChartData} options={lineChartOptions} />
                ) : (
                  <Bar data={averagedChartData} options={barChartOptions} />
                )}

                <p className="data-note">
                  {firstValue}: {avgEggsWithMusic.toFixed(2)} eggs/day
                  <br />
                  {comparisonValue}: {avgEggsWithoutMusic.toFixed(2)} eggs/day
                </p>
              </section>

              <section className="discussion">
                <h3>Discussion</h3>
                <p>
                  {selectedConclusion} These findings{" "}
                  {avgEggsWithMusic > avgEggsWithoutMusic + 1
                    ? "suggest that auditory stimulation may have a positive effect on egg production in domestic chickens."
                    : avgEggsWithMusic < avgEggsWithoutMusic - 1
                    ? "suggest that the specific auditory stimulation used may have a negative effect on egg production in domestic chickens."
                    : "do not provide strong evidence for an effect of the specific auditory stimulation on egg production in domestic chickens."}
                </p>
                <p>
                  {Math.abs(avgEggsWithMusic - avgEggsWithoutMusic) > 2
                    ? "The magnitude of the observed difference suggests potential practical applications in commercial poultry farming."
                    : "The modest difference observed may not justify implementation in commercial settings without further investigation."}
                </p>
              </section>

              <section className="conclusion">
                <h3>Conclusion</h3>
                <p>
                  {selectedConclusion} Further research with larger sample sizes
                  and extended observation periods is recommended to validate
                  these findings and explore optimal conditions for
                  implementation in commercial poultry farming operations.
                </p>
              </section>

              <section className="citation">
                <h3>Cite as:</h3>
                <p className="citation-text">{citation}</p>
              </section>
            </article>
            {showFullData ? (
              <div className="publication-buttons">
                <button
                  onClick={() => setShowPublication(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(
                      "Great Work! \nCongratulations! Your scientific paper has been published successfully! 🎉.\n You will now be brought back to the home page!"
                    );
                    setShowPublication(false);
                    navigate("/");
                  }}
                  className="accept-button"
                >
                  Accept & Publish
                </button>
              </div>
            ) : (
              <div className="publication-buttons">
                <button
                  onClick={() => setShowPublication(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishResults}
                  className="accept-button"
                >
                  Accept & Publish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChickenResults;
