import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundResearchDropdown from "./treeBackgroundReasearch.jsx";

function ReturnTreeHypothesis() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [selectedVariables, setSelectedVariables] = useState({
    independent: [],
    dependent: [],
    controlled: [],
  });

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
    effect: "increase",
    comparisonValue: "",
    timeframe: "",
  });

  const goToTreeExperiment = () => {
    Navigate("/TreeExperiment", {
      state: {
        independent: selectedVariables.independent,
        dependent: selectedVariables.dependent,
        controlled: selectedVariables.controlled,
        firstValue: formData.firstValue,
        comparisonValue: formData.comparisonValue,
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

    switch (independentVar) {
      case "Soil pH":
        return (
          <div className="hypothesis-form">
            <span> Trees grown in a soil with </span>
            <input
              type="number"
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              placeholder="ph"
              min="0"
              max="14"
              step="0.5"
            />
            <span> ph will </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> than trees grown in a soil with a ph of </span>
            <input
              type="number"
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              placeholder="ph"
              min="0"
              max="14"
              step="0.5"
            />
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Tree Types":
        return (
          <div>
            <span>A </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="Select tree type">select tree type</option>
              <option value="spruce">spruce</option>
              <option value="birch">birch</option>
              <option value="oak">oak</option>
            </select>
            <span> tree will grow </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> compared to a </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select tree type">select tree type</option>
              <option value="spruce">spruce</option>
              <option value="birch">birch</option>
              <option value="oak">oak</option>
            </select>
            <span> tree.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select water availability ">
                select water amount
              </option>
              <option value="abundant">abundant</option>
              <option value="moderate">moderate</option>
              <option value="poor">poor</option>
            </select>
            <span> access to water will grow </span>
            {generateDependentVarHypothesis(dependentVar)}

            <span> compared to trees with </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select water availability ">
                select water amount
              </option>
              <option value="abundant">abundant</option>
              <option value="moderate">moderate</option>
              <option value="poor">poor</option>
            </select>
            <span> access to water.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Sunlight Exposure":
        return (
          <div>
            <span> Trees exposed to </span>
            <input
              type="number"
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              placeholder="sunlight hours"
              min="0"
              max="24"
            />
            <span> hours of sunlight will grow </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span>rate than a tree exposed to </span>
            <input
              type="number"
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              placeholder="sunlight hours"
              min="0"
              max="24"
            />
            <span> hours of sunlight.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select temperature">select temperature</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> temperatures will grow at a </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> rate than trees exposed to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select temperature">select temperature</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> temperatures.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select nutrient levels">
                select nutrient levels
              </option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> nutrient levels will grow at </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> as a tree grown in soil with </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="select growth rate">select growth rate</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> nutrient levels.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select time of day">select time of day</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="evening">evening</option>
            </select>
            <span> will grow at </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> than a tree watered in the </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select time of day">select time of day</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="evening">evening</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select wind exposure">select wind exposure</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> wind exposure will grow </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span>rate as a tree exposed to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select wind exposure">select wind exposure</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> wind exposure.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select noise level">select noise level</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> noise levels will grow </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> as a tree grown near</span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select noise level">select noise level</option>
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
            <span> noise levels.</span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
            >
              <option value="Select orientation">select orientation</option>
              <option value="north">north</option>
              <option value="south">south</option>
              <option value="east">east</option>
              <option value="west">west</option>
            </select>
            <span> will grow </span>
            {generateDependentVarHypothesis(dependentVar)}
            <span> compared to trees that face towards the </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Select orientation">select orientation</option>
              <option value="north">north</option>
              <option value="south">south</option>
              <option value="east">east</option>
              <option value="west">west</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
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
    <div>
      <div>
        <BackgroundResearchDropdown />
      </div>
      <div className="hypothesis-container">
        <h2>Hypothesis Formulation</h2>

        <div className="selected-variables">
          <h3>Selected Variables:</h3>
          <p>
            Independent Variable: {selectedVariables.independent.join(", ")}
          </p>
          <p>Dependent Variable: {selectedVariables.dependent.join(", ")}</p>
          <p>Controlled Variables: {selectedVariables.controlled.join(", ")}</p>
        </div>

        <p>Form your hypothesis based on your selected variables:</p>

        {generateHypothesisStructure()}
      </div>

      <button onClick={goToTreeExperiment}>Next</button>
    </div>
  );
}

export default ReturnTreeHypothesis;
