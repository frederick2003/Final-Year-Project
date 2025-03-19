import React, { useState } from "react";
import { useResults } from "./ResultsContext";
import "./ChickResults.css";
import "./ChickenPublication.css";
import "./Styling/TableStyle.css";
import "./Styling/ResultsPopup.css";
import "./Styling/Celebration.css";
import "./Styling/HelpContainer.css";
import ScientistSvg from "./assets/Scientist.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";
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

function HelpSection() {
  return (
    <div className="help-container">
      <div className="help-icon" title="Need help?">
        ?
      </div>
      <div className="help-popup">
        <div className="help-popup-content">
          <img
            src={ScientistSvg}
            alt="Friendly scientist"
            className="scientist-image-small"
          />
          <h3>Results and Conclusion</h3>
          <p>
            <strong>Task:</strong>
          </p>
          <p>1) Analyse your results and understand what they mean.</p>
          <p>2) Form a conclusion from your results.</p>
          <p>
            3) Determine whether your results prove or disprove your hypothesis.
          </p>
          <p>4) Publish your results for the World to see.</p>
        </div>
      </div>
    </div>
  );
}

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
  const controlledVariables = location.state?.controlled || [];
  const [showIntro, setShowIntro] = useState(true);
  const [hypothesisResult, setHypothesisResult] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [hypothesisError, setHypothesisError] = useState(false);
  const { setChickenResults } = useResults();

  const handlePublishClick = () => {
    if (!hypothesisResult) {
      setHypothesisError(true);
      // Scroll to the hypothesis section
      document.querySelector(".hypothesis-evaluation-section").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      setHypothesisError(false);
      setShowPublication(true);
    }
  };

  const getNonSelectedVariables = (selectedVars) => {
    // Make sure selectedVars is an array, even if empty
    const controlledVars = Array.isArray(selectedVars) ? selectedVars : [];

    // Log what we're working with
    console.log("Getting non-selected variables. Selected:", controlledVars);

    // List all possible variables based on the chicken experiment
    const allPossibleVars = [
      "Breed Of Chickens",
      "Type Of Music",
      "Volume Level",
      "Diet and Nutrition",
      "Environmental Conditions",
      "Duration Of Music Exposure",
      "Stress Levels",
      "Age Of Chickens",
      "Presence of Music",
    ];

    // Filter to find non-selected variables, handle case differences
    const nonSelected = allPossibleVars.filter(
      (possibleVar) =>
        !controlledVars.some(
          (controlledVar) =>
            controlledVar.toLowerCase() === possibleVar.toLowerCase()
        )
    );

    console.log("Non-selected variables:", nonSelected);
    return nonSelected;
  };

  const handleIntro = () => {
    setShowIntro(false);
  };
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
        text: `Average Eggs Produced Per Day`,
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
    "The results vary randomly, meaning there is no real effect of music on the amount of eggs produced over time.",
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
    // Get controlled variables from location state, ensuring it's an array
    const controlledVars = Array.isArray(location.state?.controlled)
      ? location.state.controlled
      : [];

    // Get non-selected variables using our function
    const nonSelectedVars = getNonSelectedVariables(controlledVars);

    // Log what we're saving to help debug
    console.log("Saving controlled variables to context:", controlledVars);
    console.log("Saving non-selected variables to context:", nonSelectedVars);

    setChickenResults({
      // Keep existing properties
      hypothesisResult,
      selectedConclusion,
      avgEggsWithMusic,
      avgEggsWithoutMusic,
      firstValue,
      comparisonValue,

      // Save controlled variables consistently
      controlled: controlledVars,
      controlledVariables: controlledVars, // Save in both formats for backward compatibility

      // Save non-selected variables for display on the home page
      nonSelectedVariables: nonSelectedVars,

      // Make sure to include these other properties
      hypothesis: hypothesis,
      independent: location.state?.independent || [],
      dependent: location.state?.dependent || ["Number of Eggs Produced"],

      // Save other experiment data
      experimentData: experimentData,
    });

    // Show celebration and then navigate home
    setShowCelebration(true);
    setShowPublication(false);
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
      {/* Introduction modal overlay */}
      {showIntro && (
        <div className="intro-modal-overlay">
          <div className="intro-modal">
            <div className="scientist-container">
              <img
                src={ScientistSvg}
                alt="Friendly scientist"
                className="scientist-image"
              />
            </div>
            <h2>Welcome to your Results Page {"  "}</h2>
            <p>
              In this section, you will be able to analyze the results of your
              experiment. Look at your results and try your best to determine if
              your hypothesis was correct.
            </p>
            <p>Reminder your hypothesis is: </p>
            <ul>
              <li>
                <i>{hypothesis}</i>
              </li>
            </ul>
            <p>
              Review your results, make a valid conclusion, and publish your
              results for the world to see.
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Review Results
            </button>
          </div>
        </div>
      )}
      <HelpSection />
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
              <div className="conclusion-text-box">
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
      {/* Add this hypothesis evaluation section after the conclusion-section div */}
      <div className="hypothesis-evaluation-section">
        <h2>Do Your Results Support Your Hypothesis?</h2>
        <div className="hypothesis-cards-container">
          <div
            className={`hypothesis-card ${
              hypothesisResult === "proved" ? "selected" : ""
            }`}
            onClick={() => {
              setHypothesisResult("proved");
              setHypothesisError(false);
            }}
          >
            <FaCheckCircle className="result-icon proved" />
            <h3>Hypothesis Proved</h3>
            <p>My data supports my hypothesis that:</p>
            <p className="hypothesis-text">{hypothesis}</p>
          </div>

          <div
            className={`hypothesis-card ${
              hypothesisResult === "disproved" ? "selected" : ""
            }`}
            onClick={() => {
              setHypothesisResult("disproved");
              setHypothesisError(false);
            }}
          >
            <FaTimesCircle className="result-icon disproved" />
            <h3>Hypothesis Disproved</h3>
            <p>My data does not support my hypothesis.</p>
            <p>This happens in science and helps us learn!</p>
          </div>

          <div
            className={`hypothesis-card ${
              hypothesisResult === "inconclusive" ? "selected" : ""
            }`}
            onClick={() => {
              setHypothesisResult("inconclusive");
              setHypothesisError(false);
            }}
          >
            <FaQuestionCircle className="result-icon inconclusive" />
            <h3>Inconclusive</h3>
            <p>
              My data is not clear enough to prove or disprove my hypothesis.
            </p>
            <p>I would need to do more experiments.</p>
          </div>
        </div>
      </div>
      {hypothesisError && (
        <div className="hypothesis-error-message">
          Please select whether your hypothesis was proved, disproved, or
          inconclusive before publishing.
        </div>
      )}

      <div className="buttons-container">
        <button onClick={handlePublishClick} className="publish-button">
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
                  production in domestic chickens compared to {"  "}
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
                  Two groups of laying hens were observed over a period of{" "}
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
                  average of {avgEggsWithMusic.toFixed(2)} eggs per day, while
                  the control group under {comparisonValue}
                  {"  "}conditions produced an average of{" "}
                  {avgEggsWithoutMusic.toFixed(2)} eggs per day.
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
                <p>
                  Based on our experimental results, we
                  {hypothesisResult === "proved"
                    ? " were able to support our original hypothesis."
                    : hypothesisResult === "disproved"
                    ? " found evidence that contradicted our original hypothesis."
                    : " found that the evidence was inconclusive regarding our original hypothesis."}
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
                  onClick={handlePublishResults}
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

      {showPublication && !showFullData && (
        <div className="intro-modal-overlay">
          <div className="intro-modal data-viz-modal">
            <h2>Why We Need a Second Experiment Run</h2>

            <div className="data-comparison">
              <div className="data-example">
                <h3>What You See Now: Averages Only</h3>
                <div className="chart-example">
                  <Bar
                    data={averagedChartData}
                    options={{ ...barChartOptions, maintainAspectRatio: false }}
                    height={150}
                  />
                </div>
                <p>
                  This bar chart only shows <strong>average</strong> egg
                  production and hides important patterns.
                </p>
              </div>

              <div className="data-example">
                <h3>What You'll See After: Complete Data</h3>
                <div className="chart-example">
                  <Line
                    data={{
                      labels: [
                        "Day 1",
                        "Day 2",
                        "Day 3",
                        "Day 4",
                        "Day 5",
                        "Day 6",
                        "Day 7",
                      ],
                      datasets: [
                        {
                          label: firstValue,
                          data: [10, 12, 15, 14, 16, 15, 17],
                          borderColor: "rgba(75, 192, 192, 1)",
                          backgroundColor: "rgba(75, 192, 192, 0.2)",
                        },
                        {
                          label: comparisonValue,
                          data: [11, 10, 11, 12, 11, 10, 12],
                          borderColor: "rgba(153, 102, 255, 1)",
                          backgroundColor: "rgba(153, 102, 255, 0.2)",
                        },
                      ],
                    }}
                    options={{
                      ...lineChartOptions,
                      maintainAspectRatio: false,
                    }}
                    height={150}
                  />
                </div>
                <p>
                  This line chart shows the <strong>full pattern</strong> of egg
                  production over time.
                </p>
              </div>
            </div>

            <div className="modal-explanation">
              <h3>Why This Matters in Science</h3>
              <p>
                Looking only at averages can hide important trends in your data:
              </p>
              <ul>
                <li>Two different patterns can have the same average</li>
                <li>You might miss if one condition improves over time</li>
                <li>
                  Real scientists always look at complete data before making
                  conclusions
                </li>
              </ul>
              <p>
                By running our experiment again, we'll collect more data points
                to see the full picture!
              </p>
              <p>
                <strong>This is an important scientific skill</strong> - good
                scientists always look beyond simple averages.
              </p>
            </div>

            <div className="publication-buttons modal-buttons">
              <button
                onClick={() => setShowPublication(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPublication(false);
                  // Add before navigation
                  console.log(
                    "Passing controlled variables to ChickenExperiment:",
                    location.state?.controlled
                  );
                  navigate("/ChickenExperiment", {
                    state: {
                      // Experiment metadata
                      experimentCount:
                        (location.state?.experimentCount || 1) + 1,
                      hypothesis: hypothesis,
                      firstValue: firstValue,
                      comparisonValue: comparisonValue,
                      previousConclusion: selectedConclusion,

                      // Critical variables
                      independent: location.state?.independent || [
                        "Presence of Music",
                      ],
                      dependent: location.state?.dependent || [
                        "Number of Eggs Produced",
                      ],
                      controlled: location.state?.controlled || [],

                      // Make sure to include the actual experiment data from the first run
                      // so it can be displayed in the second run
                      experimentData: experimentData,
                    },
                  });
                }}
                className="accept-button"
              >
                Rerun Experiment with Full Data
              </button>
            </div>
          </div>
        </div>
      )}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-modal">
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: [
                      "#FF5252",
                      "#2196F3",
                      "#4CAF50",
                      "#FFC107",
                      "#9C27B0",
                    ][Math.floor(Math.random() * 5)],
                  }}
                />
              ))}
            </div>
            <div className="certificate">
              <div className="certificate-content">
                <h2>CONGRATULATIONS!</h2>
                <div className="certificate-badge">🏆</div>
                <h3>Your research has been published!</h3>
                <p>
                  Your contributions will now been recognized by the scientific
                  community.
                </p>
                <p>Journal of Bottany Science Education</p>
                <div className="stamp">PUBLISHED</div>
              </div>
            </div>
            <button
              className="celebration-button"
              onClick={() => {
                setShowCelebration(false);
                navigate("/");
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChickenResults;
