import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageStyle.css";
import MicroworldDescription from "./Description.jsx";
import { useResults } from "../ResultsContext";

function HomePage() {
  const Navigate = useNavigate();

  // New navigation functions for the predefined experiments
  const goToMusicVsNoMusic = () => {
    Navigate("/ChickenVariableIdentification", {
      state: {
        independent: ["Presence of Music"],
        dependent: ["Number of Eggs Produced"],
        controlled: [],
        presetExperiment: "musicVsNoMusic",
        firstValue: "Music",
        comparisonValue: "no music",
      },
    });
  };

  const goToRockVsClassical = () => {
    Navigate("/ChickenVariableIdentification", {
      state: {
        independent: ["Type Of Music"],
        dependent: ["Number of Eggs Produced"],
        controlled: [],
        presetExperiment: "rockVsClassical",
        firstValue: "rock music",
        comparisonValue: "classical music",
      },
    });
  };

  const goToHighVsLowVolume = () => {
    Navigate("/ChickenVariableIdentification", {
      state: {
        independent: ["Volume Level"],
        dependent: ["Number of Eggs Produced"],
        controlled: [],
        presetExperiment: "highVsLowVolume",
        firstValue: "high volume",
        comparisonValue: "low volume",
      },
    });
  };

  const goToNoMusicDiet = () => {
    Navigate("/ChickenVariableIdentification", {
      state: {
        independent: ["Diet and Nutrition"],
        dependent: ["Number of Eggs Produced"],
        controlled: [],
        presetExperiment: "noMusicDiet",
        firstValue: "high protein",
        comparisonValue: "low protein",
      },
    });
  };

  const goToMusicDiet = () => {
    Navigate("/ChickenVariableIdentification", {
      state: {
        independent: ["Diet and Nutrition"],
        dependent: ["Number of Eggs Produced"],
        controlled: ["Presence of Music"],
        presetExperiment: "musicDiet",
        firstValue: "high protein",
        comparisonValue: "low protein",
      },
    });
  };

  const { chickenResults, resetChickenResults } = useResults();

  return (
    <div>
      <h1>Chicken Egg Production MicroWorld</h1>
      <div className="experiments-container">
        {/* Experiment 1: Music vs No Music */}
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToMusicVsNoMusic}>
              Start Experiment: Music vs No Music
            </button>
            <div className="card-body">
              <p>
                Test how the <strong>presence of music</strong> affects egg
                production in chickens.
              </p>
            </div>
          </div>
        </div>

        {/* Experiment 2: Rock vs Classical Music */}
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToRockVsClassical}>
              Start Experiment: Rock vs Classical Music
            </button>
            <div className="card-body">
              <p>
                Compare how <strong>different types of music</strong> affect egg
                production.
              </p>
            </div>
          </div>
        </div>

        {/* Experiment 3: High vs Low Volume */}
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToHighVsLowVolume}>
              Start Experiment: High vs Low Volume
            </button>
            <div className="card-body">
              <p>
                Investigate how <strong>music volume levels</strong> impact egg
                production.
              </p>
            </div>
          </div>
        </div>

        {/* Experiment 4: No Music Diet Comparison */}
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToNoMusicDiet}>
              Start Experiment: Diet Comparison (No Music)
            </button>
            <div className="card-body">
              <p>
                Test how <strong>protein levels in diet</strong> affect egg
                production without music.
              </p>
            </div>
          </div>
        </div>

        {/* Experiment 5: With Music Diet Comparison */}
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToMusicDiet}>
              Start Experiment: Diet Comparison (With Music)
            </button>
            <div className="card-body">
              <p>
                Test how <strong>protein levels in diet</strong> affect egg
                production with music.
              </p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h2>Help Section:</h2>
          <h3>
            The menu below explain the steps to be completed for each
            experiment.
          </h3>
        </div>
        <div className="accordion-container">
          <MicroworldDescription />
        </div>
      </div>

      {chickenResults ? (
        <div className="results-section">
          <h3>Experiment Results Summary</h3>
          <p>
            <strong>Hypothesis:</strong> {chickenResults.hypothesis}
          </p>
          <p>
            <strong>Result:</strong>{" "}
            {chickenResults.hypothesisResult === "proved"
              ? "Hypothesis Proved"
              : chickenResults.hypothesisResult === "disproved"
              ? "Hypothesis Disproved"
              : "Results Inconclusive"}
          </p>

          <div className="variables-section">
            <div className="variable-group">
              <h4>Independent Variable:</h4>
              <ul>
                {Array.isArray(chickenResults.independent) ? (
                  chickenResults.independent.map((variable, index) => (
                    <li key={`independent-${index}`}>{variable}</li>
                  ))
                ) : (
                  <li>{chickenResults.independent || "None"}</li>
                )}
              </ul>
            </div>

            <div className="variable-group">
              <h4>Dependent Variable:</h4>
              <ul>
                {Array.isArray(chickenResults.dependent) ? (
                  chickenResults.dependent.map((variable, index) => (
                    <li key={`dependent-${index}`}>{variable}</li>
                  ))
                ) : (
                  <li>{chickenResults.dependent || "None"}</li>
                )}
              </ul>
            </div>

            <div className="variable-group">
              <h4>Controlled Variables:</h4>
              <ul>
                {Array.isArray(chickenResults.controlled) &&
                chickenResults.controlled.length > 0 ? (
                  chickenResults.controlled.map((variable, index) => (
                    <li key={`controlled-${index}`}>{variable}</li>
                  ))
                ) : (
                  <li>None specifically controlled</li>
                )}
              </ul>
            </div>

            <div className="variable-group">
              <h4>Non-Controlled Variables:</h4>
              <ul>
                {Array.isArray(chickenResults.nonSelectedVariables) &&
                chickenResults.nonSelectedVariables.length > 0 ? (
                  chickenResults.nonSelectedVariables.map((variable, index) => (
                    <li key={`non-controlled-${index}`}>{variable}</li>
                  ))
                ) : (
                  <li>All variables were controlled</li>
                )}
              </ul>
            </div>
          </div>

          <p>
            <strong>Conclusion:</strong> {chickenResults.selectedConclusion}
          </p>
          <div className="results-actions">
            <button
              className="reset-experiment-btn"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset the Chicken Egg Production experiment results?"
                  )
                ) {
                  resetChickenResults();
                }
              }}
            >
              Reset Chicken Experiment
            </button>
          </div>
        </div>
      ) : (
        <div className="no-results-message">
          <h3>No experiment results yet</h3>
          <p>Select an experiment from above to get started.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
