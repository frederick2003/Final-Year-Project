import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundResearchDropdown from "./treeBackgroundReasearch.jsx";
import TreeSketch from "../treeSketch.jsx";
import TreeGrowth from "../Tree.jsx";

function ReturnTreeExperiment() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVariables = location.state || {
    independent: [],
    dependent: [],
    controlled: [],
    firstValue: "",
    comparisonValue: "",
  };

  // Store experiment and control results
  const [experimentResults, setExperimentResults] = useState([]);
  const [controlExperimentResults, setControlExperimentResults] = useState([]);

  const goToResults = () => {
    if (
      experimentResults.length === 0 &&
      controlExperimentResults.length === 0
    ) {
      alert(
        "Please run both the experiment and control experiment before proceeding."
      );
      return;
    }
    navigate("/TreeResults", {
      state: {
        results: experimentResults,
        controlResults: controlExperimentResults,
        firstValue: selectedVariables.firstValue,
        comparisonValue: selectedVariables.comparisonValue,
      },
    });
  };

  return (
    <div>
      {/* dropDown Section */}
      <div className="mb-4">
        <BackgroundResearchDropdown />
      </div>

      <h2>Experiment</h2>
      <p>
        In this stage, you will carry out the experiment based on the hypothesis
        you have formulated.
      </p>
      <p>
        You will need to record the data and observations from the experiment.
      </p>
      <p>
        Once you have completed the experiment, you can analyze the data and
        draw conclusions.
      </p>
      <div>
        <h2>Yor experiment and control variables are listed below</h2>
        <strong>
          <p>Experiment: {selectedVariables.firstValue}</p>
        </strong>
        <strong>
          <p>Control: {selectedVariables.comparisonValue}</p>
        </strong>
      </div>
      <div>
        <h1>Your Experiment</h1>
        <h2>
          Carry out your experiment here with your selected dependant and
          independant variables.
        </h2>
        <TreeSketch />
        <TreeGrowth
          selectedVariables={selectedVariables}
          setAllResults={setExperimentResults}
        />
      </div>
      <div>
        <h1>Your Control Experiment</h1>
        <h2>
          Carry out your control experiment here with your selected dependant
          and independant variables. This is used to compare your experiment
          results to.
        </h2>
        <TreeSketch />
        <TreeGrowth
          selectedVariables={selectedVariables}
          setAllResults={setControlExperimentResults}
        />
      </div>
      <button onClick={goToResults}>Next Page</button>
    </div>
  );
}

export default ReturnTreeExperiment;
