import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";
import "../Styling/TreeVariableIdentification.css";
import "../Styling/HelpContainer.css";
import ScientistSvg from "../assets/Scientist.svg";

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
          <h3>Variable Identification</h3>
          <p>
            <strong>Task:</strong>
          </p>
          <p>
            Select the variables you wish to test during your experiment by
            clicking on the buttons.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReturnChickenVariableIdentification() {
  const Navigate = useNavigate();
  const [independentVariables, setIndependentVariables] = useState([]);
  const [dependentVariables, setDependentVariables] = useState([]);
  const [controlledVariables, setControlledVariables] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleIntro = () => {
    setShowIntro(false);
  };

  // Validate the form before navigation
  const validateVariables = () => {
    const newErrors = {};

    // Check independent variables (must have exactly one)
    if (independentVariables.length === 0) {
      newErrors.independent = "Please select exactly one independent variable";
    } else if (independentVariables.length > 1) {
      newErrors.independent =
        "Please select only one independent variable. A good experiment tests only one factor at a time.";
    }

    // Check controlled variables (must have at least one)
    if (controlledVariables.length === 0) {
      newErrors.controlled = "Please select at least one controlled variable";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToChickenHypothesis = () => {
    setFormSubmitted(true);

    if (!validateVariables()) {
      // Scroll to top to ensure errors are visible
      window.scrollTo(0, 0);
      return;
    }

    Navigate("/ChickenHypothesis", {
      state: {
        independent: independentVariables,
        dependent: dependentVariables,
        controlled: controlledVariables,
      },
    });
  };

  const addToList = (item, listType) => {
    // Clear errors when user takes action
    setErrors({});

    // Check if the item is already in any list
    if (
      independentVariables.includes(item) ||
      controlledVariables.includes(item)
    ) {
      alert(
        "Recheck your selected variables!\n" +
          item +
          " already exists in one of the lists."
      );
      return;
    }

    // Handle independent variables (only one allowed)
    if (listType === 1) {
      // Replace the existing independent variable if one exists
      setIndependentVariables([item]);
    }
    // Handle controlled variables (multiple allowed)
    else if (listType === 3) {
      setControlledVariables([...controlledVariables, item]);
    }
  };

  const clearList = (listType) => {
    // Clear related errors when a list is cleared
    if (listType === 1) {
      setIndependentVariables([]);
      setErrors((prev) => ({ ...prev, independent: null }));
    } else if (listType === 3) {
      setControlledVariables([]);
      setErrors((prev) => ({ ...prev, controlled: null }));
    }
  };

  const removeItem = (item, listType) => {
    if (listType === 1) {
      setIndependentVariables(independentVariables.filter((v) => v !== item));
    } else if (listType === 3) {
      setControlledVariables(controlledVariables.filter((v) => v !== item));
    }
  };

  const sections = [
    "Presence of Music",
    "Type Of Music",
    "Volume Level",
    "Duration Of Music Exposure",
    "Breed Of Chickens",
    "Environmental Conditions",
    "Diet and Nutrition",
    "Stress Levels",
    "Age Of Chickens",
  ];

  // Set fixed dependent variable for Chicken experiment
  const fixedDependentVariable = "Number of Eggs Produced";

  // Set dependent variable automatically
  useEffect(() => {
    setDependentVariables([fixedDependentVariable]);
  }, []);

  // Error display component
  const ErrorMessage = ({ error }) =>
    error ? <div className="tree-var-error">{error}</div> : null;

  return (
    <div className="tree-var-container">
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
            <h2>Welcome to the Variable Identification Section!</h2>
            <p>
              <strong>
                You have now successfully completed your Background Research:
                {"  "}
                <GiPartyPopper />
              </strong>
            </p>
            <p>
              You should now have a rough idea how certain variables influence
              the amount of eggs chickens lay.{" "}
              <strong>
                Your Task is to: select the variables you wish to test during
                your experiment.
              </strong>
            </p>
            <p>
              <h3>Reminder</h3>
              <li>
                <strong>The Independent Variable: </strong>
                is the one condition that you change in an experiment.{" "}
              </li>
              <li>
                <strong>The Dependent Variable: </strong>is the variable that
                you measure or observe.
              </li>
              <li>
                <strong>Controlled variable: </strong>is a variable that does
                not change during an experiment.
              </li>
            </p>
            <p>
              Select the variables you wish to test during your experiment by
              clicking on the buttons.{" "}
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Start Selecting...{" "}
            </button>
          </div>
        </div>
      )}
      <HelpSection />
      {/* Error summary - only show when form is submitted and has errors */}
      {formSubmitted && Object.keys(errors).length > 0 && (
        <div className="error-summary">
          <h3>Please address the following:</h3>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Header Section */}
      <div className="tree-var-header">
        <h2>Variable Identification</h2>
      </div>

      {/* Main content */}
      <div className="tree-var-main">
        {/* Left side: Variable selection */}
        <div className="tree-var-selection">
          {/* Help section */}
          <div className="tree-var-help">
            <div className="tree-var-help-item">
              <h4>Independent Variable</h4>
              <p>
                An independent variable is the variable the experiment controls.
                It is the component you choose to change in the experiment.
              </p>
            </div>
            <div className="tree-var-help-item">
              <h4>Dependent Variable</h4>
              <p>
                A dependent variable is the measurement that changes in response
                to what you have changed in the experiment.
              </p>
              <p>
                <strong>
                  For chicken experiments, the dependent variable is always
                  "Number of Eggs Produced"
                </strong>
              </p>
            </div>
            <div className="tree-var-help-item">
              <h4>Controlled Variable</h4>
              <p>
                A controlled variable is any other variable affecting your
                solution that you try to keep the same across all conditions.
              </p>
            </div>
          </div>

          {/* Variables grid */}
          <div className="tree-var-grid">
            {sections.map((section) => (
              <div className="tree-var-item" key={section}>
                <div className="tree-var-item-name">{section}</div>
                <div className="tree-var-buttons">
                  <button
                    className="tree-var-btn tree-var-btn-indep"
                    onClick={() => addToList(section, 1)}
                  >
                    Independent
                  </button>
                  <button
                    className="tree-var-btn tree-var-btn-control"
                    onClick={() => addToList(section, 3)}
                  >
                    Controlled
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Selected variables lists */}
        <div className="tree-var-lists">
          {/* Independent variables list */}
          <div
            className={`tree-var-list tree-var-list-indep ${
              formSubmitted && errors.independent ? "tree-var-list-error" : ""
            }`}
          >
            <div className="tree-var-list-header">
              <h3>Independent Variables</h3>
              <button className="tree-var-clear" onClick={() => clearList(1)}>
                Clear All
              </button>
            </div>
            <ErrorMessage error={formSubmitted && errors.independent} />
            <ul className="tree-var-items">
              {independentVariables.map((item, index) => (
                <li className="tree-var-item-listed" key={index}>
                  {item}
                  <button
                    className="tree-var-remove-btn"
                    onClick={() => removeItem(item, 1)}
                    title="Remove item"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dependent variables list - set automatically for chicken experiment */}
          <div className="tree-var-list tree-var-list-dep">
            <div className="tree-var-list-header">
              <h3>Dependent Variables</h3>
            </div>
            <p className="fixed-var-note">
              For chicken experiments, we will always measure:
            </p>
            <ul className="tree-var-items">
              <li className="tree-var-item-listed fixed-dependent">
                {fixedDependentVariable}
              </li>
            </ul>
          </div>

          {/* Controlled variables list */}
          <div
            className={`tree-var-list tree-var-list-control ${
              formSubmitted && errors.controlled ? "tree-var-list-error" : ""
            }`}
          >
            <div className="tree-var-list-header">
              <h3>Controlled Variables</h3>
              <button className="tree-var-clear" onClick={() => clearList(3)}>
                Clear All
              </button>
            </div>
            <ErrorMessage error={formSubmitted && errors.controlled} />
            <ul className="tree-var-items">
              {controlledVariables.map((item, index) => (
                <li className="tree-var-item-listed" key={index}>
                  {item}
                  <button
                    className="tree-var-remove-btn"
                    onClick={() => removeItem(item, 3)}
                    title="Remove item"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="tree-var-footer">
        <button className="tree-var-next" onClick={goToChickenHypothesis}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ReturnChickenVariableIdentification;
