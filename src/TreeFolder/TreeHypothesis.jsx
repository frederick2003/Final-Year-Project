import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styling/HypothesisStyling.css";
import ScientistSvg from "../assets/Scientist.svg";
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

function ReturnTreeHypothesis() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [selectedVariables, setSelectedVariables] = useState({
    independent: [],
    dependent: [],
    controlled: [],
  });
  const [showIntro, setShowIntro] = useState(true);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleIntro = () => {
    setShowIntro(false);
  };

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
    effect: "taller",
    comparisonValue: "",
    timeframe: "",
  });

  // Function 1: Converts hypothesis form data to a complete hypothesis string
  const convertHypothesisToString = () => {
    const independentVar = selectedVariables.independent[0] || "";
    const dependentVar = selectedVariables.dependent[0] || "";
    let hypothesisString = "";

    switch (independentVar) {
      case "Soil pH":
        hypothesisString = `Trees grown in a soil with a pH of ${formData.firstValue} will grow ${formData.effect} over 10 years than trees grown in a soil with a pH of ${formData.comparisonValue}.`;
        break;
      case "Water Availability":
        hypothesisString = `Trees with ${formData.firstValue} access to water will grow ${formData.effect} over 10 years compared to trees with ${formData.comparisonValue} access to water.`;
        break;
      case "Sunlight Exposure":
        hypothesisString = `Trees exposed to ${formData.firstValue} hour(s) of daily sunlight will grow ${formData.effect} over 10 years compared to trees exposed to ${formData.comparisonValue} hour(s) of daily sunlight.`;
        break;
      case "Temperature":
        hypothesisString = `Trees exposed to ${formData.firstValue} temperatures will grow ${formData.effect} over 10 years compared to trees exposed to ${formData.comparisonValue} temperatures.`;
        break;
      case "Nutreint Levels":
        hypothesisString = `Trees grown in soil with ${formData.firstValue} nutrient levels will grow ${formData.effect} over 10 years compared to trees grown in soil with ${formData.comparisonValue} nutrient levels.`;
        break;
      case "Time of Day Watering Occurs":
        hypothesisString = `Trees watered in the ${formData.firstValue} will grow ${formData.effect} over 10 years compared to trees watered in the ${formData.comparisonValue}.`;
        break;
      case "Wind Exposure":
        hypothesisString = `Trees exposed to ${formData.firstValue} winds will grow ${formData.effect} over 10 years compared to trees exposed to ${formData.comparisonValue} winds.`;
        break;
      case "Closeness to Roads or noisey areas":
        hypothesisString = `Trees grown near ${formData.firstValue} noise levels will grow ${formData.effect}  over 10 years compared to trees grown near ${formData.comparisonValue} noise levels.`;
        break;
      case "Orientation of tree":
        hypothesisString = `Trees that face towards the ${formData.firstValue} will grow ${formData.effect}  over 10 years compared to trees that face towards the ${formData.comparisonValue}.`;
        break;
      default:
        hypothesisString =
          "Please select variables and complete the hypothesis form.";
    }
    return hypothesisString;
  };

  // Function 2: Converts firstValue and comparisonValue to descriptive strings for display
  const generateExperimentLabels = () => {
    const independentVar = selectedVariables.independent[0] || "";
    let firstValueLabel = "";
    let comparisonValueLabel = "";

    switch (independentVar) {
      case "Soil pH":
        firstValueLabel = `Trees growing in soil with pH ${formData.firstValue}`;
        comparisonValueLabel = `Trees growing in soil with pH ${formData.comparisonValue}`;
        break;
      case "Tree Types":
        firstValueLabel = `${
          formData.firstValue.charAt(0).toUpperCase() +
          formData.firstValue.slice(1)
        } Tree`;
        comparisonValueLabel = `${
          formData.comparisonValue.charAt(0).toUpperCase() +
          formData.comparisonValue.slice(1)
        } Tree`;
        break;
      case "Water Availability":
        firstValueLabel = `Trees with ${formData.firstValue} water availability`;
        comparisonValueLabel = `Trees with ${formData.comparisonValue} water availability`;
        break;
      case "Sunlight Exposure":
        firstValueLabel = `Trees grown in ${formData.firstValue} hours of sunlight`;
        comparisonValueLabel = `Trees grown in ${formData.comparisonValue} hours of sunlight`;
        break;
      case "Temperature":
        firstValueLabel = `Trees in ${formData.firstValue} temperature`;
        comparisonValueLabel = `Trees in ${formData.comparisonValue} temperature`;
        break;
      case "Nutreint Levels":
        firstValueLabel = `Trees with ${formData.firstValue} nutrient levels`;
        comparisonValueLabel = `Trees with ${formData.comparisonValue} nutrient levels`;
        break;
      case "Time of Day Watering Occurs":
        firstValueLabel = `Trees watered in the ${formData.firstValue}`;
        comparisonValueLabel = `Trees watered in the ${formData.comparisonValue}`;
        break;
      case "Wind Exposure":
        firstValueLabel = `Trees with ${formData.firstValue} wind exposure`;
        comparisonValueLabel = `Trees with ${formData.comparisonValue} wind exposure`;
        break;
      case "Closeness to Roads or noisey areas":
        firstValueLabel = `Trees near ${formData.firstValue} noise levels`;
        comparisonValueLabel = `Trees near ${formData.comparisonValue} noise levels`;
        break;
      case "Orientation of tree":
        firstValueLabel = `Trees facing ${formData.firstValue}`;
        comparisonValueLabel = `Trees facing ${formData.comparisonValue}`;
        break;
      default:
        firstValueLabel = "Experiment";
        comparisonValueLabel = "Control";
    }

    return { firstValueLabel, comparisonValueLabel };
  };

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

  const goToTreeExperiment = () => {
    setFormSubmitted(true);

    if (!validateForm()) {
      // Scroll to the top to show errors
      window.scrollTo(0, 0);
      return;
    }
    const hypothesisString = convertHypothesisToString();
    const { firstValueLabel, comparisonValueLabel } =
      generateExperimentLabels();

    Navigate("/TreeExperiment", {
      state: {
        independent: selectedVariables.independent,
        dependent: selectedVariables.dependent,
        controlled: selectedVariables.controlled,
        firstValue: formData.firstValue,
        comparisonValue: formData.comparisonValue,
        hypothesisString: hypothesisString,
        firstValueLabel: firstValueLabel,
        comparisonValueLabel: comparisonValueLabel,
      },
    });
  };

  const generateDependentVarHypothesis = (dependentVar) => {
    switch (dependentVar) {
      case "Tree Height (Meters)":
        return (
          <div>
            <span> grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
          </div>
        );

      case "Tree Diameter (Centimeters)":
        return (
          <div>
            <span> grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="wider">wider</option>
              <option value="narrower">narrower</option>
              <option value="at the same width">at the same width</option>
            </select>
          </div>
        );

      case "Root Length":
        return (
          <div>
            <span> grow with </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="longer roots">longer roots </option>
              <option value="shorter roots ">shorter roots </option>
              <option value="with the same length roots">
                with the same length roots
              </option>
            </select>
          </div>
        );
    }
  };

  const generateControlledVariables = (controlledVariables) => {
    if (controlledVariables.length === 0) {
      return "No controlled variables selected.";
    }
    return ` The experiment will be conducted under controlled conditions, maintaining ${controlledVariables.join(
      ", "
    )} constant to ensure a fair test.`;
  };

  const generateHypothesisStructure = () => {
    const independentVar = selectedVariables.independent[0] || "Type of Music"; // Default if none selected
    const dependentVar = selectedVariables.dependent[0] || "Egg Production"; // Default if none selected
    const controlledVarText = generateControlledVariables(
      selectedVariables.controlled
    );

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
      case "Soil pH":
        return (
          <div className="hypothesis-form">
            <span> Trees grown in a soil with a pH of </span>
            <div className="input-field">
              <input
                type="number"
                name="firstValue"
                value={formData.firstValue}
                onChange={handleInputChange}
                placeholder="pH"
                min="0"
                max="14"
                step="0.5"
                className={
                  formSubmitted && errors.firstValue ? "input-error" : ""
                }
              />
              <ErrorMessage error={formSubmitted && errors.firstValue} />
            </div>
            <span> will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
              placeholder="effect"
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span>
              {" "}
              over 10 years compared to trees grown in a soil with a pH of{" "}
            </span>
            <div className="input-field">
              <input
                type="number"
                name="comparisonValue"
                value={formData.comparisonValue}
                onChange={handleInputChange}
                placeholder="pH"
                min="0"
                max="14"
                step="0.5"
                className={
                  formSubmitted && errors.comparisonValue ? "input-error" : ""
                }
              />
              <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            </div>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Water Availability":
        return (
          <div>
            <span> Trees with </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select water availability">
                select water amount
              </option>
              <option value="abundant">abundant</option>
              <option value="moderate">moderate</option>
              <option value="poor">poor</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> access to water will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>

            <span> over 10 years compared to trees with </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select water availability">
                select water amount
              </option>
              <option value="abundant">abundant</option>
              <option value="moderate">moderate</option>
              <option value="poor">poor</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <span> access to water.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Sunlight Exposure":
        return (
          <div className="hypothesis-form">
            <span> Trees exposed to </span>

            <input
              type="number"
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              placeholder="sunlight hours"
              min="0"
              max="24"
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            />
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> hour(s) of daily sunlight will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees exposed to </span>

            <input
              type="number"
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              placeholder="sunlight hours"
              min="0"
              max="24"
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            />
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <span> hour(s) of daily sunlight.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Temperature":
        return (
          <div>
            <span> Trees exposed to </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select temperature">select temperature</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> temperatures will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees exposed to </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select temperature">select temperature</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <span> temperatures.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Nutreint Levels":
        return (
          <div>
            <span> Trees grown in soil with </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select nutrient levels">
                select nutrient levels
              </option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> nutrient levels will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees grown in soil with </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="select growth rate">select nutrient levels</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />
            <span> nutrient levels.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Time of Day Watering Occurs":
        return (
          <div>
            <span> Trees watered in the </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select time of day">select time of day</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="evening">evening</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees watered in the </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select time of day">select time of day</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="evening">evening</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Wind Exposure":
        return (
          <div>
            <span> Trees exposed to </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select wind exposure">select wind exposure</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> winds will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees exposed to </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select wind exposure">select wind exposure</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <span> winds.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Closeness to Roads or noisey areas":
        return (
          <div>
            <span> Trees grown near </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select noise level">select noise level</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> noise levels will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees grown near</span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select noise level">select noise level</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <span> noise levels.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
            <ErrorMessage error={formSubmitted && errors.comparison} />
          </div>
        );

      case "Orientation of tree":
        return (
          <div>
            <span>Tree that face towards the </span>

            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.firstValue ? "input-error" : ""
              }
            >
              <option value="Select orientation">select orientation</option>
              <option value="north">north</option>
              <option value="south">south</option>
              <option value="east">east</option>
              <option value="west">west</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.firstValue} />

            <span> will grow </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="taller">taller</option>
              <option value="smaller">smaller</option>
              <option value="at the same height">at the same height</option>
            </select>
            <span> over 10 years compared to trees that face towards the </span>

            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              className={
                formSubmitted && errors.comparisonValue ? "input-error" : ""
              }
            >
              <option value="Select orientation">select orientation</option>
              <option value="north">north</option>
              <option value="south">south</option>
              <option value="east">east</option>
              <option value="west">west</option>
            </select>
            <ErrorMessage error={formSubmitted && errors.comparisonValue} />

            <div>
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
        <p>Dependent Variable: {selectedVariables.dependent.join(", ")}</p>
        <p>Controlled Variables: {selectedVariables.controlled.join(", ")}</p>
      </div>

      <div className="hypothesis-builder">
        <p>Form your hypothesis based on your selected variables:</p>
        {generateHypothesisStructure()}

        {formData.firstValue && formData.comparisonValue && (
          <div className="preview-hypothesis">
            <h4>Hypothesis Preview:</h4>
            <p>{convertHypothesisToString()}</p>
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <button className="next-button" onClick={goToTreeExperiment}>
          Continue to Experiment<span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ReturnTreeHypothesis;
