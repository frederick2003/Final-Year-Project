import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScientistSvg from "../assets/Scientist.svg";
import "../Styling/HypothesisStyling.css";
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
          <h3>Hypothesis Formation</h3>
          <p>What is a hypothesis?</p>
          <p>
            <strong>
              A hypothesis is an educated guess or proposed explanation for a
              phenomenon, based on initial observations or data.
            </strong>
          </p>
          <p>
            <strong>Task:</strong>
          </p>
          <p>
            Based on your background research and chosen variables choose an
            appropriate hypothesis.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReturnChickenHypothesis() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [selectedVariables, setSelectedVariables] = useState({
    independent: [],
    dependent: [],
    controlled: [],
  });

  // Use useEffect to safely set the state after component mounts
  useEffect(() => {
    if (location.state) {
      setSelectedVariables({
        independent: location.state.independent || [],
        dependent: location.state.dependent || [],
        controlled: location.state.controlled || [],
      });
    }
  }, [location]);

  const [formData, setFormData] = useState({
    firstValue: "",
    duration: "",
    effect: "more",
    comparisonValue: "",
    timeframe: "",
  });

  const [showIntro, setShowIntro] = useState(true);
  const handleIntro = () => {
    setShowIntro(false);
  };

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Check if independent variable is selected
    if (
      !selectedVariables.independent ||
      selectedVariables.independent.length === 0
    ) {
      newErrors.independent = "Please select an independent variable first";
    }

    // Check if dependent variable is selected
    if (
      !selectedVariables.dependent ||
      selectedVariables.dependent.length === 0
    ) {
      newErrors.dependent = "Please select a dependent variable first";
    }

    // Check firstValue is provided
    if (!formData.firstValue) {
      newErrors.firstValue = "This field is required";
    }

    // Check comparisonValue is provided
    if (!formData.comparisonValue) {
      newErrors.comparisonValue = "This field is required";
    }

    // Check that firstValue and comparisonValue are different
    if (
      formData.firstValue &&
      formData.comparisonValue &&
      formData.firstValue === formData.comparisonValue
    ) {
      newErrors.comparison =
        "Your experimental and control values must be different";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToChickenExperiment = () => {
    setFormSubmitted(true);

    if (!validateForm()) {
      // Scroll to the top to show errors
      window.scrollTo(0, 0);
      return;
    }
    const hypothesisString = generateHypothesisString(); // Get the hypothesis as a string
    Navigate("/ChickenExperiment", {
      state: {
        independent: selectedVariables.independent,
        dependent: selectedVariables.dependent,
        controlled: selectedVariables.controlled,
        hypothesis: hypothesisString, // Pass the hypothesis string
        firstValue: formData.firstValue || "Not specified", // First value (e.g., "8 hours", "Rock")
        comparisonValue: formData.comparisonValue || "Not specified", // Comparison (e.g., "2 hours", "No Music")
      },
    });
  };

  const generateControlledVariables = (controlledVariables) => {
    if (controlledVariables.length === 0) {
      return "No controlled variables selected.";
    }
    return ` The experiment will be conducted under controlled conditions, maintaining ${controlledVariables.join(
      ", "
    )} constant to ensure a fair test.`;
  };

  const generateHypothesisString = () => {
    const independentVar = selectedVariables.independent[0] || "Type of Music"; // Default if none selected

    let hypothesis = "";

    switch (independentVar) {
      case "Presence of Music":
        hypothesis = `Playing ${
          formData.firstValue || "[Music]"
        } will result in ${formData.effect} eggs compared to ${
          formData.comparisonValue || "[Comparison]"
        }`;
        break;
      case "Type Of Music":
        hypothesis = `Playing ${
          formData.firstValue || "[Music Type]"
        } will result in ${formData.effect} eggs compared to ${
          formData.comparisonValue || "[Comparison]"
        }`;
        break;
      case "Volume Level":
        hypothesis = `Playing music at a ${
          formData.firstValue || "[Volume Level]"
        } will result in ${formData.effect} eggs compared to ${
          formData.comparisonValue || "[Comparison Volume Level]"
        }`;
        break;

      case "Duration Of Music Exposure":
        hypothesis = `Playing music for ${
          formData.firstValue || "[X]"
        } hours per day will result in ${formData.effect} eggs compared to ${
          formData.comparisonValue || "[Y]"
        } hours per day
          `;
        break;

      case "Breed Of Chickens":
        hypothesis = `Playing music for ${
          formData.firstValue || "[Breed]"
        } chickens will result in ${formData.effect} eggs compared to ${
          formData.comparisonValue || "[Comparison Breed]"
        } chickens`;
        break;

      case "Environmental Conditions":
        hypothesis = `Chickens listening to music in ${
          formData.firstValue || "[Condition]"
        } conditions will lay ${formData.effect} eggs than chickens in ${
          formData.comparisonValue || "[Comparison Condition]"
        } conditions`;
        break;

      case "Diet and Nutrition":
        hypothesis = `Chickens listening to music with a ${
          formData.firstValue || "[Diet]"
        } diet will lay ${formData.effect} eggs than chickens with a ${
          formData.comparisonValue || "[Comparison Diet]"
        } diet`;
        break;

      case "Stress Levels":
        hypothesis = `Chickens listening to music with ${
          formData.firstValue || "[Stress Level]"
        } stress levels will lay ${formData.effect} eggs than chickens with ${
          formData.comparisonValue || "[Comparison Stress Level]"
        } stress levels`;
        break;

      case "Age Of Chickens":
        hypothesis = `Chickens of ${
          formData.firstValue || "[Age]"
        } age will lay ${formData.effect} eggs than chickens of ${
          formData.comparisonValue || "[Comparison Age]"
        } age`;
        break;

      default:
        hypothesis = "Please select variables in the previous step.";
        break;
    }

    const controlledVarsStatement = generateControlledVariables(
      selectedVariables.controlled
    );

    return `${hypothesis}`;
  };

  // Helper function to generate hypothesis based on selected variables
  const generateHypothesisStructure = () => {
    const independentVar = selectedVariables.independent[0] || "Type of Music"; // Default if none selected
    const dependentVar = selectedVariables.dependent[0] || "Egg Production"; // Default if none selected

    const ErrorMessage = ({ error }) =>
      error ? <div className="error-message">{error}</div> : null;

    if (!independentVar || !dependentVar) {
      return (
        <div className="error-container">
          <ErrorMessage error={errors.independent} />
          <ErrorMessage error={errors.dependent} />
          <p>
            Please select independent and dependent variables in the previous
            step
          </p>
        </div>
      );
    }

    switch (independentVar) {
      case "Presence of Music":
        return (
          <div className="hypothesis-form">
            <span>Playing </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select an option</option>
                <option value="Music">Music</option>
                <option value="No Music">No Music</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> will result in </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs compared to </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select an option</option>
                <option value="no music">no music</option>
                <option value="music">music</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Type Of Music":
        return (
          <div className="hypothesis-form">
            <span>Playing </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select Music Type</option>
                <option value="classical music">Classical Music</option>
                <option value="rock music">Rock Music</option>
                <option value="jazz music">Jazz Music</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> will result in </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs compared to </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select Music Type</option>
                <option value="rock music">Rock music</option>
                <option value="jazz music">Jazz music</option>
                <option value="classical music">Classical music</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Volume Level":
        return (
          <div className="hypothesis-form">
            <span>Playing music at a </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select Volume Level</option>
                <option value="low volume">low volume</option>
                <option value="medium volume">medium volume</option>
                <option value="high volume">high volume</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> will result in </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs compared to </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select Volume Level</option>
                <option value="low volume">low volume</option>
                <option value="medium volume">medium volume</option>
                <option value="high volume">high volume</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Duration Of Music Exposure":
        return (
          <div className="hypothesis-form">
            <span>Playing music for </span>
            <div className="input-field">
              <input
                type="number"
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                placeholder="Hours"
                min="0"
                max="24"
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              />
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> hours per day will result in </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs compared to </span>
            <div className="input-field">
              <input
                type="number"
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                placeholder="Hours"
                min="0"
                max="24"
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              />
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> hours per day. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Breed Of Chickens":
        return (
          <div className="hypothesis-form">
            <span>Playing music for </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select chicken breed </option>
                <option value="Rhode Island Red">Rhode Island Red</option>
                <option value="Leghorn">Leghorn</option>
                <option value="Plymouth Rock">Plymouth Rock</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> chickens will result in </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs compared to </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select chicken breed</option>
                <option value="Rhode Island Red">Rhode Island Red</option>
                <option value="Leghorn">Leghorn</option>
                <option value="Plymouth Rock">Plymouth Rock</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> chickens. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Environmental Conditions":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music in </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select Environmental Conditions</option>
                <option value="hot">hot</option>
                <option value="cold">cold</option>
                <option value="moderate">moderate</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> conditions will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs than chickens in </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select Environmental Conditions</option>
                <option value="hot">hot</option>
                <option value="cold">cold</option>
                <option value="moderate">moderate</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> conditions. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Diet and Nutrition":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music with </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select Diet</option>
                <option value="high protein">high protein</option>
                <option value="low protein">low protein</option>
                <option value="balanced">balanced</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> diet will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs than chickens with </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select Diet</option>
                <option value="high protein">high protein</option>
                <option value="low protein">low protein</option>
                <option value="balanced">balanced</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> diet. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      // Stress Levels case
      case "Stress Levels":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music with </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select stress level</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> stress levels will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs than chickens with </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select stress level</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> stress levels. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      // Age Of Chickens case
      case "Age Of Chickens":
        return (
          <div className="hypothesis-form">
            <span>Chickens of </span>
            <div className="input-field">
              <select
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              >
                <option value="">Select Age</option>
                <option value="young">young</option>
                <option value="adult">adult</option>
                <option value="old">old</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> age will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same amount of">the same amount of</option>
            </select>
            <span> eggs than chickens of </span>
            <div className="input-field">
              <select
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              >
                <option value="">Select Age</option>
                <option value="young">young</option>
                <option value="adult">adult</option>
                <option value="old">old</option>
              </select>
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <span> age. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      default:
        return <p>Please select variables in the previous step</p>;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user makes changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Clear comparison error when either value changes
    if (
      (name === "firstValue" || name === "comparisonValue") &&
      errors.comparison
    ) {
      setErrors((prev) => ({ ...prev, comparison: null }));
    }
  };

  return (
    <div className="hypothesis-container">
      {formSubmitted && Object.keys(errors).length > 0 && (
        <div className="error-summary">
          <h3>Please address the errors below: :</h3>
        </div>
      )}
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
            <h2>Welcome to the Hypothesis Section!</h2>
            <p>What is a hypothesis you ask?</p>
            <p>
              <strong>
                A hypothesis is an educated guess or proposed explanation for a
                phenomenon, based on initial observations or data.
              </strong>
            </p>
            <p>
              It is a statement that can be tested and potentially proven or
              disproven through your experiment.
            </p>
            <ul></ul>
            <p>
              <strong>Task:</strong>
            </p>
            <p>
              Based on your background research and chosen variables choose an
              appropriate hypothesis.
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Start Experimenting
            </button>
          </div>
        </div>
      )}
      <HelpSection />
      <div className="hypothesis-header">
        <h2>Hypothesis Formulation</h2>
        <p>Create a testable prediction based on your research</p>
      </div>

      <div className="selected-variables">
        <h3>Selected Variables:</h3>
        <p>Independent Variable: {selectedVariables.independent.join(", ")}</p>
        <p>Dependent Variable: Number of Eggs Produced</p>
        <p>Controlled Variables: {selectedVariables.controlled.join(", ")}</p>
      </div>

      <div className="hypothesis-builder">
        <p>Form your hypothesis based on your selected variables:</p>
        {generateHypothesisStructure()}

        {formData.firstValue && formData.comparisonValue && (
          <div className="preview-hypothesis">
            <h4>Hypothesis Preview:</h4>
            <p>{generateHypothesisString()}</p>
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button className="next-button" onClick={goToChickenExperiment}>
          Continue to Experiment
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ReturnChickenHypothesis;
