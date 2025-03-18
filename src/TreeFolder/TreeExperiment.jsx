import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScientistSvg from "../assets/Scientist.svg";
import {
  FaFlask,
  FaTree,
  FaInfoCircle,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";
import BackgroundResearchDropdown from "./treeBackgroundReasearch.jsx";
import TreeSketch from "../treeSketch.jsx";
import TreeGrowthContainer from "./TreeGrowthContainer.jsx";
import "../TreeGrowth.css";
import "../Styling/TreeExperiment2.css";
import "../Styling/HelpContainer.css";

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
          <h3>Experiment</h3>
          <p>
            <strong>Task:</strong>
          </p>
          <p>Adjust the sliders to select:</p>
          <li>The number of trees per group.</li>
          <li>The number of groups to monitor.</li>
          <li>The experiment and comparison controls.</li>
          <p>Finally, run your experiment.</p>
        </div>
      </div>
    </div>
  );
}

function TreeExperiment() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVariables = location.state || {
    independent: [],
    dependent: [],
    controlled: [],
    firstValue: "",
    comparisonValue: "",
    hypothesisString: "",
    firstValueLabel: "",
    comparisonValueLabel: "",
  };

  // Store experiment and control results
  const [experimentResults, setExperimentResults] = useState([]);
  const [controlResults, setControlResults] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [treeCount, setTreeCount] = useState(3);
  const [hasStarted, setHasStarted] = useState(false);
  const [experimentEvent, setExperimentEvent] = useState("None");
  const [controlEvent, setControlEvent] = useState("None");
  const [showIntro, setShowIntro] = useState(true);

  // Update effect to ensure proper prop passing
  useEffect(() => {
    console.log("Current experiment state:", {
      experimentEvent,
      controlEvent,
      currentYear,
      treeCount,
      hasStarted,
    });
  }, [experimentEvent, controlEvent, currentYear, treeCount, hasStarted]);

  // In TreeExperiment.jsx, replace the goToResults function with this improved version:

  const goToResults = () => {
    // Add a safety check with more detailed feedback
    if (experimentResults.length === 0 || controlResults.length === 0) {
      console.error("Cannot navigate: Results data is empty", {
        experimentResults,
        controlResults,
      });
      alert("Please wait for the experiment to complete before proceeding.");
      return;
    }

    // Only navigate when we have results
    console.log("Navigating to results with data:", {
      experimentResults: experimentResults.length,
      controlResults: controlResults.length,
    });

    navigate("/TreeResults", {
      state: {
        results: experimentResults,
        controlResults: controlResults,
        firstValue: selectedVariables.firstValueLabel,
        comparisonValue: selectedVariables.comparisonValueLabel,
        hypothesisString: selectedVariables.hypothesisString,
        treeCount: treeCount,
        independentVariables: selectedVariables.independent,
        controlledVariables: selectedVariables.controlled,
        allPossibleVariables: [
          "Soil pH",
          "Water Availability",
          "Sunlight Exposure",
          "Temperature",
          "Nutreint Levels",
          "Time of Day Watering Occurs",
          "Wind Exposure",
          "Closeness to Roads or noisey areas",
          "Orientation of tree",
        ],
      },
    });
  };

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  // For passing environmental state to tree visualizations
  const experimentTreeState = {
    water: 50,
    light: 12,
    temperature: 25,
    wind: "moderate",
    event: experimentEvent,
  };

  const controlTreeState = {
    water: 50,
    light: 12,
    temperature: 25,
    wind: "moderate",
    event: controlEvent,
  };

  return (
    <div className="tree-experiment-page">
      {/* Welcome modal with close button */}
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
            <h2>Welcome to the Tree Growth Laboratory!</h2>
            <p>
              In this experiment, you will investigate how different
              environmental factors affect tree growth. You've already selected
              your variables:
            </p>
            <ul>
              <li>
                <strong>Independent Variable:</strong>{" "}
                {selectedVariables.independent.join(", ")}
              </li>
              <li>
                <strong>Dependent Variable:</strong>{" "}
                {selectedVariables.dependent.join(", ")}
              </li>
              <li>
                <strong>Controlled Variables:</strong>{" "}
                {selectedVariables.controlled.join(", ")}
              </li>
            </ul>
            <p>
              Adjust the sliders, run the simulation, and observe how changes to
              your independent variable affect tree growth!
            </p>
            <button className="close-intro-button" onClick={handleCloseIntro}>
              Start Experimenting
            </button>
          </div>
        </div>
      )}
      <HelpSection />

      {/* Main content */}
      <div className="experiment-header">
        <h1>
          <FaFlask /> Tree Growth Laboratory
        </h1>
      </div>

      <div className="experiment-container">
        <div className="experiment-content">
          <div className="experiment-sidebar">
            {/* Background research section */}
            <div className="background-section">
              <BackgroundResearchDropdown />
            </div>

            <div className="hypothesis-box">
              <h2>Your Hypothesis:</h2>
              <p>{selectedVariables.hypothesisString}</p>
              <div className="experiment-details">
                <div className="detail-item">
                  <strong>Experiment:</strong>{" "}
                  {selectedVariables.firstValueLabel}
                </div>
                <div className="detail-item">
                  <strong>Control:</strong>{" "}
                  {selectedVariables.comparisonValueLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="experiment-main">
            <div className="experiment-visualizations">
              <div className="visualization-container">
                <div className="visualization-header">
                  <h2>
                    {selectedVariables.firstValueLabel + "." || "Experiment"}
                  </h2>
                </div>
                <TreeSketch
                  position="left"
                  environmentalFactors={experimentTreeState}
                  numberOfTrees={treeCount}
                  hasStarted={hasStarted}
                  yearsPassed={currentYear}
                />
              </div>
              <div className="visualization-container">
                <div className="visualization-header">
                  <h2>
                    {selectedVariables.comparisonValueLabel + "." || "Control"}
                  </h2>
                </div>
                <TreeSketch
                  position="right"
                  environmentalFactors={controlTreeState}
                  numberOfTrees={treeCount}
                  hasStarted={hasStarted}
                  yearsPassed={currentYear}
                />
              </div>
            </div>

            <TreeGrowthContainer
              selectedVariables={selectedVariables}
              setExperimentResults={setExperimentResults}
              setControlResults={setControlResults}
              setCurrentYear={setCurrentYear}
              setTreeCount={setTreeCount}
              setHasStarted={setHasStarted}
              setExperimentEvent={setExperimentEvent}
              setControlEvent={setControlEvent}
            />
          </div>
        </div>

        <div className="next-step-container">
          <button
            onClick={goToResults}
            className={`next-button ${
              experimentResults.length === 0 ? "disabled" : "active"
            }`}
            disabled={experimentResults.length === 0}
          >
            <FaChartLine />{" "}
            {experimentResults.length === 0
              ? "Run Experiment First"
              : "View Results & Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TreeExperiment;
