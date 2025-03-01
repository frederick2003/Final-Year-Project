import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChickBackgroundResearchDropdown from "../ChickBackgroundResearch.jsx";
import "../Styling/HypothesisStyling.css";

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
    effect: "increase",
    comparisonValue: "",
    timeframe: "",
  });

  const goToChickenExperiment = () => {
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
        hypothesis = `Playing ${formData.firstValue || "[Music]"} will ${
          formData.effect
        } the rate of egg production compared to ${
          formData.comparisonValue || "[Comparison]"
        }.`;
        break;
      case "Type Of Music":
        hypothesis = `Playing ${formData.firstValue || "[Music Type]"} will ${
          formData.effect
        } the rate of egg production compared to ${
          formData.comparisonValue || "[Comparison]"
        }.`;
        break;
      case "Volume Level":
        hypothesis = `Playing music at a ${
          formData.firstValue || "[Volume Level]"
        }  will ${formData.effect} the rate of egg production compared to ${
          formData.comparisonValue || "[Comparison Volume Level]"
        }.`;
        break;

      case "Duration Of Music Exposure":
        hypothesis = `Playing music for ${
          formData.firstValue || "[X]"
        } hours per day will ${
          formData.effect
        } the rate of egg production compared to ${
          formData.comparisonValue || "[Y]"
        } hours per day
          .`;
        break;

      case "Breed Of Chickens":
        hypothesis = `Playing music for ${
          formData.firstValue || "[Breed]"
        } chickens will ${
          formData.effect
        } the rate of egg production compared to ${
          formData.comparisonValue || "[Comparison Breed]"
        } chickens.`;
        break;

      case "Environmental Conditions":
        hypothesis = `Chickens listening to music in ${
          formData.firstValue || "[Condition]"
        } conditions will lay ${formData.effect} eggs than chickens in ${
          formData.comparisonValue || "[Comparison Condition]"
        } conditions.`;
        break;

      case "Diet and Nutrition":
        hypothesis = `Chickens listening to music with a ${
          formData.firstValue || "[Diet]"
        } diet lay ${formData.effect} eggs than chickens with a ${
          formData.comparisonValue || "[Comparison Diet]"
        } diet.`;
        break;

      case "Stress Levels":
        hypothesis = `Chickens listening to music with ${
          formData.firstValue || "[Stress Level]"
        } stress levels will lay ${formData.effect} eggs than chickens with ${
          formData.comparisonValue || "[Comparison Stress Level]"
        } stress levels.`;
        break;

      case "Age Of Chickens":
        hypothesis = `Chickens of ${
          formData.firstValue || "[Age]"
        } age will lay ${formData.effect} eggs than chickens of ${
          formData.comparisonValue || "[Comparison Age]"
        } age.`;
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

    switch (independentVar) {
      case "Presence of Music":
        return (
          <div className="hypothesis-form">
            <span>Playing </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>{" "}
              <option value="Music">Music</option>
              <option value="No Music">No Music</option>
            </select>
            <span> will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the rate of eggs production compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>{" "}
              <option value="no music">no music</option>
              <option value="music">music</option>
            </select>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );
      //OK
      case "Type Of Music":
        return (
          <div className="hypothesis-form">
            <span>Playing </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select Music Type</option>
              <option value="classical music">Classical Music</option>
              <option value="rock music">Rock Music</option>
              <option value="jazz music">Jazz Music</option>
            </select>
            <span> will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the rate of eggs production compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="no music">no music</option>
              <option value="rock music">Rock music</option>
              <option value="jazz music">Jazz music</option>
              <option value="classical music">Classical music</option>
            </select>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );
      //OK
      case "Volume Level":
        return (
          <div className="hypothesis-form">
            <span>Playing music at a </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select Volume Level</option>
              <option value="low volume">low volume</option>
              <option value="medium volume">medium volume</option>
              <option value="high volume">high volume</option>
            </select>
            <span> will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the rate of eggs production compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="no music">no music</option>
              <option value="low volume">low volume</option>
              <option value="medium volume">medium volume</option>
              <option value="high volume">high volume</option>
            </select>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );
      //OK
      case "Duration Of Music Exposure":
        return (
          <div className="hypothesis-form">
            <span>Playing music for </span>
            <input
              type="number"
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
              placeholder="Hours"
              min="0"
              max="24"
            />
            <span> hours per day will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the rate of eggs production compared to </span>
            <input
              type="number"
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
              placeholder="Hours"
              min="0"
              max="24"
            />
            <span> hours per day. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Breed Of Chickens":
        return (
          <div className="hypothesis-form">
            <span>Playing music for </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select chicken breed </option>
              <option value="Rhode Island Red">Rhode Island Red</option>
              <option value="Leghorn">Leghorn</option>
              <option value="Plymouth Rock">Plymouth Rock</option>
            </select>
            <span> chickens will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the rate of eggs production compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="Rhode Island Red">Rhode Island Red</option>
              <option value="Leghorn">Leghorn</option>
              <option value="Plymouth Rock">Plymouth Rock</option>
            </select>
            <span> chickens. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Environmental Conditions":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music in </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select Environmental Conditions</option>
              <option value="hot">hot</option>
              <option value="cold">cold</option>
              <option value="moderate">moderate</option>
            </select>
            <span> conditions will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same">the same</option>
            </select>
            <span> eggs than a chicken listening to music in </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="">Select Environmental Conditions</option>
              <option value="hot">hot</option>
              <option value="cold">cold</option>
              <option value="moderate">moderate</option>
            </select>
            <span> conditions. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Diet and Nutrition":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music with </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select Diet</option>
              <option value="high protein">high protein</option>
              <option value="low protein">low protein</option>
              <option value="balanced">balanced</option>
            </select>
            <span> diet lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same">the same</option>
            </select>
            <span> eggs than a chicken listening to music with </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="">Select Diet</option>
              <option value="high protein">high protein</option>
              <option value="low protein">low protein</option>
              <option value="balanced">balanced</option>
            </select>
            <span> diet. </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Stress Levels":
        return (
          <div className="hypothesis-form">
            <span>Chickens listening to music with </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select stress level</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
            <span> stress levels will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same">the same</option>
            </select>
            <span> eggs than a chicken listening to music with </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="">Select stress level</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
            <span> stress levels </span>
            <div className="controlled-variables">
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Age Of Chickens":
        return (
          <div className="hypothesis-form">
            <span>Chickens of </span>
            <select
              name="firstValue"
              value={formData.firstValue}
              onChange={handleInputChange}
            >
              <option value="">Select Age</option>
              <option value="young">young</option>
              <option value="adult">adult</option>
              <option value="old">old</option>
            </select>
            <span> age will lay </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="more">more</option>
              <option value="less">less</option>
              <option value="the same">the same</option>
            </select>
            <span> amount of eggs than a chicken of </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="">Select Age</option>
              <option value="young">young</option>
              <option value="adult">adult</option>
              <option value="old">old</option>
            </select>
            <span> age.</span>
            <div className="controlled-variables">
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
    <div className="hypothesis-container">
      <div>
        <ChickBackgroundResearchDropdown />
      </div>
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
