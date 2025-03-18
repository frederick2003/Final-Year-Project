import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { GoGraph } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import { useResults } from "./ResultsContext";
import "./Styling/ConclusionStyling.css";
import "./Styling/ResultsPopup.css";
import "./Styling/Celebration.css";
import "./Styling/HelpContainer.css";

import ScientistSvg from "./assets/Scientist.svg";
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
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa"; // Add these icons
import "./ChickenPublication.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

function ResultsPage() {
  const { setTreeResults } = useResults();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    results = [],
    controlResults = [],
    firstValue = "",
    comparisonValue = "",
    hypothesisString = "",
    treeCount,
    independentVariables = [],
    controlledVariables = [],
    allPossibleVariables = [],
  } = location.state || {};

  const nonSelectedVariables = allPossibleVariables.filter(
    (variable) =>
      !independentVariables.includes(variable) &&
      !controlledVariables.includes(variable) &&
      variable !== "Tree Height (Meters)"
  );

  // Generate citation
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const researcherName = "Student Researcher";
  const journalName = "Journal of Forestry Science Education";
  const volume = Math.floor(Math.random() * 30) + 1;
  const issueNumber = Math.floor(Math.random() * 12) + 1;
  const pages = `${Math.floor(Math.random() * 100) + 1}-${
    Math.floor(Math.random() * 100) + 101
  }`;

  const citation = `${researcherName} (${currentDate.getFullYear()}). Effects of ${firstValue} on Tree Growth. ${journalName}, ${volume}(${issueNumber}), ${pages}.`;

  const [showIntro, setShowIntro] = useState(true);
  const [showPublication, setShowPublication] = useState(false);
  const [hypothesisResult, setHypothesisResult] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [hypothesisError, setHypothesisError] = useState(false);

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

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  const goToConclusion = () => {
    navigate("/TreeConclusion", { state: { results, controlResults } });
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
        text:
          "Average Height (in metres) of the " + treeCount + " Trees Over Time",
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

  // Publication chart options - optimized for the smaller space in the publication
  const publicationChartOptions = {
    ...options,
    maintainAspectRatio: true,
    plugins: {
      ...options.plugins,
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 8,
          font: { size: 11 },
        },
      },
      title: {
        display: true,
        text: "Figure 1: Average Tree Growth Comparison",
        font: { size: 14 },
        padding: 10,
      },
    },
  };

  const suggestedConclusions = [
    `${firstValue} led to larger tree growth compared to ${comparisonValue}.`,
    `${firstValue} actually resulted in less growth compared to ${comparisonValue}.`,
    `${firstValue} and ${comparisonValue} produced similar growth with no significant difference.`,
    `Environmental events during the experiment affected tree growth, making it difficult to draw definitive conclusions.`,
  ];

  const [selectedConclusion, setSelectedConclusion] = useState(
    suggestedConclusions[0]
  );
  const [showConclusionPicker, setShowConclusionPicker] = useState(false);

  const handleConclusionSelect = (conclusion) => {
    setSelectedConclusion(conclusion);
    setShowConclusionPicker(false);
  };

  const handleConclusionChange = (event) => {
    setSelectedConclusion(event.target.value);
  };

  // Calculate average heights for experiment and control groups
  const calculateAverages = () => {
    let expTotalHeight = 0;
    let expCount = 0;
    let ctrlTotalHeight = 0;
    let ctrlCount = 0;

    Object.values(groupedResults).forEach((group) => {
      group.forEach((result) => {
        expTotalHeight += parseFloat(result.height);
        expCount++;
      });
    });

    Object.values(groupedControlResults).forEach((group) => {
      group.forEach((result) => {
        ctrlTotalHeight += parseFloat(result.height);
        ctrlCount++;
      });
    });

    const avgExpHeight =
      expCount > 0 ? (expTotalHeight / expCount).toFixed(2) : 0;
    const avgCtrlHeight =
      ctrlCount > 0 ? (ctrlTotalHeight / ctrlCount).toFixed(2) : 0;

    return { avgExpHeight, avgCtrlHeight };
  };

  const { avgExpHeight, avgCtrlHeight } = calculateAverages();

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
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
            <h2>
              Welcome to your Results Page {"  "} <BsGraphUpArrow />
            </h2>
            <p>
              In this section, you will be able to analyze the results of your
              experiment. Look at your results and try your best to determine if
              your hypothesis was correct.
            </p>
            <p>Reminder your hypothesis is: </p>
            <ul>
              <li>
                <strong>{hypothesisString}</strong>
              </li>
            </ul>
            <p>
              Review your results, make a valid conclusion, and publish your
              results for the world to see.
            </p>
            <button className="close-intro-button" onClick={handleCloseIntro}>
              View Results{"  "}
              <GoGraph />
            </button>
          </div>
        </div>
      )}
      <HelpSection />
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
                  label: firstValue + " (Experiment)",
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
                        label: comparisonValue + " (Control)",
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
                  Experiment Group: {experiment}
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

      <div className="conclusion-section">
        <h2>Draw Your Conclusion</h2>
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
      </div>

      {/* Add this hypothesis evaluation section after the conclusion-section div */}
      <div className="hypothesis-evaluation-section">
        <h2>Did Your Results Support Your Hypothesis?</h2>
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
            <p className="hypothesis-text">{hypothesisString}</p>
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

      <div className="buttons-container">
        <button onClick={handlePublishClick} className="publish-button">
          Publish Results
        </button>
      </div>

      {hypothesisError && (
        <div className="hypothesis-error-message">
          Please select whether your hypothesis was proved, disproved, or
          inconclusive before publishing.
        </div>
      )}

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
              <div className="journal-logo">JFSE</div>
              <div className="journal-title">
                <h2>Journal of Forestry Science Education</h2>
                <p className="journal-info">
                  Volume {volume}, Issue {issueNumber},{" "}
                  {currentDate.getFullYear()}
                </p>
              </div>
              <div className="publication-stamp">PUBLISHED</div>
            </div>

            <article className="scientific-paper">
              <h1>Effects of {firstValue} on Tree Growth</h1>

              <div className="author-info">
                <p>
                  <strong>Author:</strong> {researcherName}
                </p>
                <p>
                  <strong>Institution:</strong> School of Forestry Sciences
                </p>
                <p>
                  <strong>Date:</strong> {formattedDate}
                </p>
              </div>

              <section className="abstract">
                <h3>Abstract</h3>
                <p>
                  This study investigates the effect of {firstValue} on tree
                  growth compared to {comparisonValue} conditions. Ten years of
                  growth data were collected to examine the relationship between
                  environmental factors and tree growth patterns. The hypothesis
                  that "
                  {hypothesisString ||
                    "environmental conditions affect tree growth"}
                  " was tested through a controlled experimental design.
                </p>
              </section>

              <section className="introduction">
                <h3>Introduction</h3>
                <p>
                  Understanding the factors that influence tree growth has
                  significant implications for forestry management,
                  environmental conservation, and climate change mitigation.
                  This study aims to contribute to the growing body of knowledge
                  by examining whether {firstValue} can affect tree growth rates
                  compared to {"  "}
                  {comparisonValue}.
                </p>
              </section>

              <section className="methods">
                <h3>Methods</h3>
                <p>
                  Two groups of trees of the same species and age were monitored
                  over a period of 10 years. The experimental group was exposed
                  to {firstValue} conditions, while the control group was
                  maintained under {comparisonValue} conditions. Tree height was
                  recorded annually, along with any environmental events that
                  might affect growth patterns.
                </p>
              </section>

              <section className="results">
                <h3>Results</h3>
                <p>
                  The experimental group exposed to {firstValue} conditions
                  reached an average height of {avgExpHeight} meters, while the
                  control group under {comparisonValue} conditions reached an
                  average height of {avgCtrlHeight} meters.
                </p>

                {/* Publication chart - use the first experiment for the publication */}
                {Object.keys(groupedResults).length > 0 && (
                  <div
                    style={{
                      height: "400px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Line
                      data={{
                        labels: groupedResults[
                          Object.keys(groupedResults)[0]
                        ].map((result) => `Year ${result.year}`),
                        datasets: [
                          {
                            label: `${firstValue}`,
                            data: groupedResults[
                              Object.keys(groupedResults)[0]
                            ].map((result) => result.height),
                            borderColor: experimentColor,
                            backgroundColor: experimentColor.replace(
                              "1)",
                              "0.2)"
                            ),
                            tension: 0.4,
                          },
                          ...(groupedControlResults[
                            Object.keys(groupedControlResults)[0]
                          ]
                            ? [
                                {
                                  label: `${comparisonValue}`,
                                  data: groupedControlResults[
                                    Object.keys(groupedControlResults)[0]
                                  ].map((result) => result.height),
                                  borderColor: controlColor,
                                  backgroundColor: controlColor.replace(
                                    "1)",
                                    "0.2)"
                                  ),
                                  tension: 0.4,
                                },
                              ]
                            : []),
                        ],
                      }}
                      options={{
                        ...options,
                        plugins: {
                          ...options.plugins,
                          title: {
                            ...options.plugins.title,
                            text: `Tree Growth: ${firstValue} vs ${comparisonValue}`,
                          },
                        },
                      }}
                    />
                  </div>
                )}

                <p className="data-note">
                  {firstValue}: {avgExpHeight} meters average height
                  <br />
                  {comparisonValue}: {avgCtrlHeight} meters average height
                </p>
              </section>

              <section className="discussion">
                <h3>Discussion</h3>
                <p>
                  {selectedConclusion} These findings
                  {parseFloat(avgExpHeight) > parseFloat(avgCtrlHeight) + 0.5
                    ? " suggest that the experimental conditions had a positive effect on tree growth."
                    : parseFloat(avgExpHeight) < parseFloat(avgCtrlHeight) - 0.5
                    ? " suggest that the experimental conditions had a negative effect on tree growth."
                    : " do not provide strong evidence for an effect of the experimental conditions on tree growth."}
                </p>
                <p>
                  {parseFloat(Math.abs(avgExpHeight - avgCtrlHeight)) > 1
                    ? "The magnitude of the observed difference suggests potential practical applications in forestry management."
                    : "The modest difference observed may not justify implementation in forestry management without further investigation."}
                </p>
                {/* Add this in the discussion section of the scientific-paper */}
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
                  implementation in forestry management and conservation
                  efforts.
                </p>
              </section>

              <section className="citation">
                <h3>Cite as:</h3>
                <p className="citation-text">{citation}</p>
              </section>
            </article>

            <div className="publication-buttons">
              <button
                onClick={() => setShowPublication(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCelebration(true);
                  setShowPublication(false);
                }}
                className="accept-button"
              >
                Accept & Publish
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
                  Your contribution to forest science has been recognized by the
                  scientific community.
                </p>
                <p>Journal of Forestry Science Education</p>
                <div className="stamp">PUBLISHED</div>
              </div>
            </div>
            <button
              className="celebration-button"
              onClick={() => {
                // Save results to context before navigating
                setTreeResults({
                  results,
                  controlResults,
                  firstValue,
                  comparisonValue,
                  hypothesisResult,
                  selectedConclusion,
                  avgExpHeight: calculateAverages().avgExpHeight,
                  avgCtrlHeight: calculateAverages().avgCtrlHeight,
                  independentVariables,
                  controlledVariables,
                  nonSelectedVariables: nonSelectedVariables,
                });
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
}

export default ResultsPage;
