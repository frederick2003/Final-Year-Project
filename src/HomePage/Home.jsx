import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageStyle.css";
import MicroworldDescription from "./Description.jsx";
import { useResults } from "../ResultsContext";

function HomePage() {
  const Navigate = useNavigate();

  const goToTreeBackgroundReasearch = () => {
    Navigate("/TreeBackgroundReasearch");
  };
  const goToChickenBackgroundReasearch = () => {
    Navigate("/ChickenBackgroundReasearch");
  };
  const goToPhysicsBackgroundReasearch = () => {
    Navigate("/PhysicsBackgroundReasearch");
  };

  const { treeResults, chickenResults, resetTreeResults, resetChickenResults } =
    useResults();

  return (
    <div>
      <h1>Scientific Method MicroWorld</h1>
      <div className="experiments-container">
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToTreeBackgroundReasearch}>
              {treeResults ? "Review Experiment 1" : "Start Experiment 1"}
            </button>
            <div className="card-body">
              Click the above button to {treeResults ? "review" : "start"} your
              first experiment where you will be testing how{" "}
              <strong>Environmental Factors Effect Tree Growth.</strong>
              {treeResults && (
                <div className="results-summary">
                  <h4>Experiment Results</h4>
                  <p>
                    <strong>Hypothesis Result:</strong>{" "}
                    {treeResults.hypothesisResult === "proved"
                      ? "Proved"
                      : treeResults.hypothesisResult === "disproved"
                      ? "Disproved"
                      : "Inconclusive"}
                  </p>
                  <p>
                    <strong>Conclusion:</strong>{" "}
                    {treeResults.selectedConclusion}
                  </p>
                  <p>
                    <strong>{treeResults.firstValue} avg height:</strong>{" "}
                    {treeResults.avgExpHeight}m
                  </p>
                  <p>
                    <strong>{treeResults.comparisonValue} avg height:</strong>{" "}
                    {treeResults.avgCtrlHeight}m
                  </p>
                  <p>
                    <strong>Controlled Variables:</strong>{" "}
                    {Array.isArray(treeResults.controlledVariables)
                      ? treeResults.controlledVariables.join(", ")
                      : treeResults.controlledVariables}
                  </p>
                  <p>
                    <strong>Uncontrolled Variables:</strong>{" "}
                    {Array.isArray(treeResults.nonSelectedVariables)
                      ? treeResults.nonSelectedVariables.join(", ")
                      : treeResults.nonSelectedVariables}
                  </p>
                  <p>
                    Discussion:{" "}
                    <strong>DO you think these affected your results?</strong>
                  </p>
                </div>
              )}
              {treeResults && (
                <div className="results-actions">
                  <button
                    className="reset-experiment-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to reset the Tree Growth experiment results?"
                        )
                      ) {
                        resetTreeResults();
                      }
                    }}
                  >
                    Reset Tree Experiment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="experiment-section">
          <div className="card">
            <button onClick={goToChickenBackgroundReasearch}>
              {chickenResults ? "Review Experiment 2" : "Start Experiment 2"}
            </button>
            <div className="card-body">
              Click the above button to {chickenResults ? "review" : "start"}{" "}
              your second experiment where you will be testing how music effects{" "}
              <strong>Music Effects Egg Production on Hens.</strong>
              {chickenResults && (
                <div className="results-summary">
                  <h4>Experiment Results</h4>
                  <p>
                    <strong>Hypothesis Result:</strong>{" "}
                    {chickenResults.hypothesisResult === "proved"
                      ? "Proved"
                      : chickenResults.hypothesisResult === "disproved"
                      ? "Disproved"
                      : "Inconclusive"}
                  </p>
                  <p>
                    <strong>Conclusion:</strong>{" "}
                    {chickenResults.selectedConclusion}
                  </p>
                  <p>
                    <strong>{chickenResults.firstValue} avg eggs:</strong>{" "}
                    {chickenResults.avgEggsWithMusic?.toFixed(2)}
                  </p>
                  <p>
                    <strong>{chickenResults.comparisonValue} avg eggs:</strong>{" "}
                    {chickenResults.avgEggsWithoutMusic?.toFixed(2)}
                  </p>
                  <p>
                    <strong>Controlled Variables:</strong>{" "}
                    {Array.isArray(chickenResults.controlledVariables)
                      ? chickenResults.controlledVariables.join(", ")
                      : chickenResults.controlledVariables}
                  </p>
                  <p>
                    <strong>Uncontrolled Variables:</strong>{" "}
                    {Array.isArray(chickenResults.nonSelectedVariables)
                      ? chickenResults.nonSelectedVariables.join(", ")
                      : chickenResults.nonSelectedVariables}
                  </p>
                  <p>
                    Discussion:{" "}
                    <strong>Do you think these affected your results?</strong>
                  </p>
                </div>
              )}
              {chickenResults && (
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
              )}
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
    </div>
  );
}

export default HomePage;
