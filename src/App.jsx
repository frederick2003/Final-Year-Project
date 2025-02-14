import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";
import TreeSketch from "./treeSketch.jsx";
import TreeGrowth from "./Tree.jsx";
import ResultsPage from "./TreeResults.jsx";
import ChickenSketch from "./ChickenSketch.jsx";
import ChickenResults from "./ChickenResults.jsx";
import DroppingBallSketch from "./PhysicsSketch.jsx";
import PhysicsLogic from "./PhysicsLogic.jsx";
import BackgroundResearchDropdown from "./treeBackgroundReasearch.jsx";
import ChickBackgroundResearchDropdown from "./ChickBackgroundResearch.jsx";
import PhysicsBackgroundResearchDropdown from "./PhysicsBackgroundResearch.jsx";
import HomePage from "./HomePage/Home.jsx";
import ReturnChickenBackgroundResearch from "./Chicken/ChickenBackground.jsx";
import "./TreeHypothesis.css";

function Home() {
  return <HomePage />;
}

function ChickenBackgroundReasearch() {
  return <ReturnChickenBackgroundResearch />;
}

function ChickenVariableIdentification() {
  const Navigate = useNavigate();
  const [independentVariables, setIndependentVariables] = useState([]);
  const [dependentVariables, setDependentVariables] = useState([]);
  const [controlledVariables, setControlledVariables] = useState([]);

  const goToChickenHypothesis = () => {
    Navigate("/ChickenHypothesis", {
      state: {
        independent: independentVariables,
        dependent: dependentVariables,
        controlled: controlledVariables,
      },
    });
  };

  const addToList = (item, listType) => {
    if (listType === 1) {
      setIndependentVariables([...independentVariables, item]);
    } else if (listType === 2) {
      setDependentVariables([...dependentVariables, item]);
    } else if (listType === 3) {
      setControlledVariables([...controlledVariables, item]);
    }
  };

  const clearList = (listType) => {
    if (listType === 1) {
      setIndependentVariables([]);
    } else if (listType === 2) {
      setDependentVariables([]);
    } else if (listType === 3) {
      setControlledVariables([]);
    }
  };

  const sections = [
    "Type Of Music",
    "Volume Level",
    "Duration Of Music Exposure",
    "Breed Of Chickens",
    "Environmental Conditions",
    "Diet and Nutrition",
    "Stress Levels",
    "Age Of Chickens",
  ];

  return (
    <div className="container">
      <div className="mb-4">
        <ChickBackgroundResearchDropdown />
      </div>
      {/* Help Section */}
      <div className="help-section">
        <div className="help-part">
          <h3>What is an Independent Variable?</h3>
          <p>
            An independent variable is the variable the experiment controls. It
            is the component you choose to change in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What is a Dependent Variable?</h3>
          <p>
            A dependent variable is the measurement that changes in response to
            what you have changed in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What are Controlled Variables?</h3>
          <p>
            A controlled variable is any other variable affecting your solution
            that you try to keep the same across all conditions.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <h2>Variable Identification</h2>
        <p>
          In this stage, we are going to select which variable of our experiment
          we wish to test. Sort the variables below into the three categories of
          variables.
        </p>
        <p>
          Click on the buttons below each box to add them to one of the three
          lists at the bottom of the screen.
        </p>

        {/* Interactive Sections */}
        <div className="interactive-sections">
          {sections.map((section) => (
            <div className="section" key={section}>
              <h3>{section}</h3>
              <div className="controls">
                <button onClick={() => addToList(section, 1)}>
                  Add to Independent Variables
                </button>
                <button onClick={() => addToList(section, 2)}>
                  Add to Dependent Variables
                </button>
                <button onClick={() => addToList(section, 3)}>
                  Add to Controlled Variables
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lists Section */}
        <div className="lists-section">
          <div className="list">
            <h3>Independent Variables</h3>
            <ul className="item-list">
              {independentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(1)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Dependent Variables</h3>
            <ul className="item-list">
              {dependentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(2)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Controlled Variables</h3>
            <ul className="item-list">
              {controlledVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(3)}>
              Remove All
            </button>
          </div>
        </div>
        <div>
          <button onClick={goToChickenHypothesis}>Next</button>
        </div>
      </div>
    </div>
  );
}

function ChickenHypothesis() {
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
    musicType: "",
    duration: "",
    effect: "increase",
    comparisonValue: "",
    timeframe: "",
  });

  const goToChickenExperiment = () => {
    Navigate("/ChickenExperiment");
  };

  const generateControlledVariables = (controlledVariables) => {
    if (controlledVariables.length === 0) {
      return "No controlled variables selected.";
    }
    return ` The experiment will be conducted under controlled conditions, maintaining ${controlledVariables.join(
      ", "
    )} constant to ensure a fair test.`;
  };

  // Helper function to generate hypothesis based on selected variables
  const generateHypothesisStructure = () => {
    const independentVar = selectedVariables.independent[0] || "Type of Music"; // Default if none selected
    const dependentVar = selectedVariables.dependent[0] || "Egg Production"; // Default if none selected

    switch (independentVar) {
      case "Type Of Music":
        return (
          <div>
            <span>Playing </span>
            <select
              name="musicType"
              value={formData.musicType}
              onChange={handleInputChange}
            >
              <option value="">Select Music Type</option>
              <option value="classical">Classical Music</option>
              <option value="rock">Rock Music</option>
              <option value="jazz">Jazz Music</option>
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
              <option value="rock music">rock music</option>
              <option value="jazz music">jazz music</option>
              <option value="classical music">classical music</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Volume Level":
        return (
          <div>
            <span>Playing music at a </span>
            <select
              name="musicType"
              value={formData.musicType}
              onChange={handleInputChange}
            >
              <option value="">Select Volume Level</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <span> volume will </span>
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
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Duration Of Music Exposure":
        return (
          <div>
            <span>Playing music for </span>
            <input
              type="number"
              name="duration"
              value={formData.duration}
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
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Breed Of Chickens":
        return (
          <div>
            <span>Playing music for </span>
            <select
              name="musicType"
              value={formData.musicType}
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
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Environmental Conditions":
        return (
          <div>
            <span>Chickens listening to music in </span>
            <select
              name="environmentConditions"
              value={formData.environmentConditions}
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
              name="environmentConditions"
              value={formData.environmentConditions}
              onChange={handleInputChange}
            >
              <option value="">Select Environmental Conditions</option>
              <option value="hot">hot</option>
              <option value="cold">cold</option>
              <option value="moderate">moderate</option>
            </select>
            <span> conditions. </span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Diet and Nutrition":
        return (
          <div>
            <span>Chickens listening to music with </span>
            <select
              name="diet"
              value={formData.diet}
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
              name="diet"
              value={formData.diet}
              onChange={handleInputChange}
            >
              <option value="">Select Diet</option>
              <option value="high protein">high protein</option>
              <option value="low protein">low protein</option>
              <option value="balanced">balanced</option>
            </select>
            <span> diet. </span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Stress Levels":
        return (
          <div>
            <span>Chickens listening to music with </span>
            <select
              name="stressLevel"
              value={formData.stressLevel}
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
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleInputChange}
            >
              <option value="">Select stress level</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
            <span> stress levels </span>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Age Of Chickens":
        return (
          <div>
            <span>Chickens of </span>
            <select
              name="age"
              value={formData.age}
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
            <select>
              <option value="">Select Age</option>
              <option value="young">young</option>
              <option value="adult">adult</option>
              <option value="old">old</option>
            </select>
            <span> age.</span>
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
        <ChickBackgroundResearchDropdown />
      </div>
      <h2>Hypothesis Formulation</h2>

      <div className="selected-variables">
        <h3>Selected Variables:</h3>
        <p>Independent Variable: {selectedVariables.independent.join(", ")}</p>
        <p>Dependent Variable: {selectedVariables.dependent.join(", ")}</p>
        <p>Controlled Variables: {selectedVariables.controlled.join(", ")}</p>
      </div>

      <p>Form your hypothesis based on your selected variables:</p>

      {generateHypothesisStructure()}

      <button onClick={goToChickenExperiment}>Next</button>
    </div>
  );
}

function ChickenExperiment() {
  const Navigate = useNavigate();
  const goToChickenResults = () => {
    Navigate("/ChickenResultsPage");
  };

  return (
    <div>
      <h1>Chicken Experiment Page</h1>
      <ChickenSketch />
      <button onClick={goToChickenResults}>Next</button>
    </div>
  );
}

function ChickenResultsPage() {
  const Location = useLocation();
  const { experimentData = [] } = Location.state || {};
  return (
    <div>
      <h1>Chicken Results Page</h1>
      <ChickenResults experimentData={experimentData} />
      <Button onClick={() => Navigate(-1)}>Back to Experiment</Button>
    </div>
  );
}

function PhysicsBackgroundReasearch() {
  const Navigate = useNavigate();
  const goToPhysicsVariableIdentification = () => {
    Navigate("/PhysicsVariableIdentification");
  };

  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div>
            <h2>Air Resistance</h2>
            <p>
              Air resistance can affect the fall of objects depending on their
              shape, size, and velocity. Consider whether the experiment occurs
              in a vacuum or under normal atmospheric conditions. Measure how
              resistance influences the time taken to fall and the object's
              trajectory.
            </p>
          </div>
        );
      case "content2":
        return (
          <div>
            <h2>Height Of Drop</h2>
            <p>
              The height from which an object is dropped affects its time of
              flight and velocity upon impact. Ensure consistent measurements
              for accuracy and account for any variations in height when
              repeating the experiment. Use a precise measuring tool to
              determine the starting height.
            </p>
          </div>
        );
      case "content3":
        return (
          <div>
            <h2>Material Of Object</h2>
            <p>
              The material of the object affects its density, mass, and how it
              interacts with air resistance and gravitational force. Test a
              variety of materials to understand how these properties influence
              the object's behavior during the drop.
            </p>
          </div>
        );
      case "content4":
        return (
          <div>
            <h2>Mass Of Object</h2>
            <p>
              Mass impacts the inertia of the object but, in free fall, all
              objects theoretically fall at the same rate due to gravity. Use a
              range of masses to verify this principle and account for
              variations caused by air resistance.
            </p>
          </div>
        );
      case "content5":
        return (
          <div>
            <h2>Shape Of Object</h2>
            <p>
              An object’s shape determines how air flows around it during a
              fall, affecting drag. Streamlined objects experience less
              resistance, falling faster than irregular shapes. Experiment with
              shapes like spheres, cones, and flat surfaces to observe
              differences.
            </p>
          </div>
        );
      case "content6":
        return (
          <div>
            <h2>Timing Method</h2>
            <p>
              Accurate timing is crucial. Use high-speed cameras, motion
              sensors, or precise stopwatches to measure the time of fall. Avoid
              relying on human reaction times, as they can introduce errors in
              timing.
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveContent("content1")}>
          Air Resistance
        </button>
        <button onClick={() => setActiveContent("content2")}>
          Height Of Drop
        </button>
        <button onClick={() => setActiveContent("content3")}>
          Material Of Object
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Mass Of Object
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Shape Of Object
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Timing Method
        </button>
      </div>

      {/* Content */}
      <div className="content">{renderContent()}</div>

      {/* Text Editor */}
      <div className="text-editor">
        <h3>Notes</h3>
        <textarea
          id="editor"
          placeholder="Write or paste your notes here..."
        ></textarea>
      </div>
      <div>
        <button onClick={goToPhysicsVariableIdentification}>Next</button>
      </div>
    </div>
  );
}

function PhysicsVariableIdentification() {
  const Navigate = useNavigate();
  const [independentVariables, setIndependentVariables] = useState([]);
  const [dependentVariables, setDependentVariables] = useState([]);
  const [controlledVariables, setControlledVariables] = useState([]);

  const goToPhysicsHypothesis = () => {
    Navigate("/PhysicsHypothesis", {
      state: {
        independent: independentVariables,
        dependent: dependentVariables,
        controlled: controlledVariables,
      },
    });
  };

  const addToList = (item, listType) => {
    if (listType === 1) {
      setIndependentVariables([...independentVariables, item]);
    } else if (listType === 2) {
      setDependentVariables([...dependentVariables, item]);
    } else if (listType === 3) {
      setControlledVariables([...controlledVariables, item]);
    }
  };

  const clearList = (listType) => {
    if (listType === 1) {
      setIndependentVariables([]);
    } else if (listType === 2) {
      setDependentVariables([]);
    } else if (listType === 3) {
      setControlledVariables([]);
    }
  };

  const sections = [
    "Air Resistance",
    "Height Of Drop",
    "Material Of Object",
    "Mass Of Object",
    "Shape Of Object",
    "Surface Conditions",
    "Release Mechanism",
    "Timing Methos",
    "Angle Of Drop",
  ];

  return (
    <div className="container">
      <div>
        <PhysicsBackgroundResearchDropdown />
      </div>
      {/* Help Section */}
      <div className="help-section">
        <div className="help-part">
          <h3>What is an Independent Variable?</h3>
          <p>
            An independent variable is the variable the experiment controls. It
            is the component you choose to change in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What is a Dependent Variable?</h3>
          <p>
            A dependent variable is the measurement that changes in response to
            what you have changed in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What are Controlled Variables?</h3>
          <p>
            A controlled variable is any other variable affecting your solution
            that you try to keep the same across all conditions.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <h2>Variable Identification</h2>
        <p>
          In this stage, we are going to select which variable of our experiment
          we wish to test. Sort the variables below into the three categories of
          variables.
        </p>
        <p>
          Click on the buttons below each box to add them to one of the three
          lists at the bottom of the screen.
        </p>

        {/* Interactive Sections */}
        <div className="interactive-sections">
          {sections.map((section) => (
            <div className="section" key={section}>
              <h3>{section}</h3>
              <div className="controls">
                <button onClick={() => addToList(section, 1)}>
                  Add to Independent Variables
                </button>
                <button onClick={() => addToList(section, 2)}>
                  Add to Dependent Variables
                </button>
                <button onClick={() => addToList(section, 3)}>
                  Add to Controlled Variables
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lists Section */}
        <div className="lists-section">
          <div className="list">
            <h3>Independent Variables</h3>
            <ul className="item-list">
              {independentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(1)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Dependent Variables</h3>
            <ul className="item-list">
              {dependentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(2)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Controlled Variables</h3>
            <ul className="item-list">
              {controlledVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(3)}>
              Remove All
            </button>
          </div>
        </div>
        <div>
          <button onClick={goToPhysicsHypothesis}>Next</button>
        </div>
      </div>
    </div>
  );
}

function PhysicsHypothesis() {
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
    musicType: "",
    duration: "",
    effect: "increase",
    comparisonValue: "",
    timeframe: "",
  });

  const goToPhysicsExperiment = () => {
    Navigate("/PhysicsExperiment");
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
    const independentVar = selectedVariables.independent[0] || "Air Resistance";
    const dependentVar = selectedVariables.dependent[0] || "Height Of Drop";

    switch (independentVar) {
      case "Air Resistance":
        return (
          <div>
            <span>Increasing air resistance will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="no air resistance">no air resistance</option>
              <option value="low air resistance">low air resistance</option>
              <option value="high air resistance">high air resistance</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Height Of Drop":
        return (
          <div>
            <span>Increasing the height of drop will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="low height">low height</option>
              <option value="medium height">medium height</option>
              <option value="high height">high height</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Material Of Object":
        return (
          <div>
            <span>Using material </span>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
            >
              <option value="material 1">material 1</option>
              <option value="material 2">material 2</option>
              <option value="material 3">material 3</option>
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
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="material 1">material 1</option>
              <option value="material 2">material 2</option>
              <option value="material 3">material 3</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Mass Of Object":
        //TODO
        return (
          <div>
            <span>Increasing the mass of the object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="low mass">low mass</option>
              <option value="medium mass">medium mass</option>
              <option value="high mass">high mass</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Shape Of Object":
        //TODO
        return (
          <div>
            <span>Using a </span>
            <select
              name="shape"
              value={formData.shape}
              onChange={handleInputChange}
            >
              <option value="shape 1">shape 1</option>
              <option value="shape 2">shape 2</option>
              <option value="shape 3">shape 3</option>
            </select>
            <span> object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="shape 1">shape 1</option>
              <option value="shape 2">shape 2</option>
              <option value="shape 3">shape 3</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Surface Conditions":
        //TODO
        return (
          <div>
            <span>Using a </span>
            <select
              name="surface"
              value={formData.surface}
              onChange={handleInputChange}
            >
              <option value="surface 1">surface 1</option>
              <option value="surface 2">surface 2</option>
              <option value="surface 3">surface 3</option>
            </select>
            <span> object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="surface 1">surface 1</option>
              <option value="surface 2">surface 2</option>
              <option value="surface 3">surface 3</option>
            </select>
          </div>
        );

      case "Release Mechanism":
        //TODO
        return (
          <div>
            <span>Using a </span>
            <select
              name="release"
              value={formData.release}
              onChange={handleInputChange}
            >
              <option value="release 1">release 1</option>
              <option value="release 2">release 2</option>
              <option value="release 3">release 3</option>
            </select>
            <span> object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="release 1">release 1</option>

              <option value="release 2">release 2</option>
              <option value="release 3">release 3</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Timing Method":
        return (
          <div>
            <span>Using a </span>
            <select
              name="timing"
              value={formData.timing}
              onChange={handleInputChange}
            >
              <option value="timing 1">timing 1</option>
              <option value="timing 2">timing 2</option>
              <option value="timing 3">timing 3</option>
            </select>
            <span> object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="timing 1">timing 1</option>
              <option value="timing 2">timing 2</option>
              <option value="timing 3">timing 3</option>
            </select>
            <div>
              {generateControlledVariables(selectedVariables.controlled)}
            </div>
          </div>
        );

      case "Angle Of Drop":
        return (
          <div>
            <span>Using a </span>
            <select
              name="angle"
              value={formData.angle}
              onChange={handleInputChange}
            >
              <option value="angle 1">angle 1</option>
              <option value="angle 2">angle 2</option>
              <option value="angle 3">angle 3</option>
            </select>
            <span> object will </span>
            <select
              name="effect"
              value={formData.effect}
              onChange={handleInputChange}
            >
              <option value="increase">increase</option>
              <option value="decrease">decrease</option>
              <option value="not affect">not affect</option>
            </select>
            <span> the time taken for an object to fall compared to </span>
            <select
              name="comparisonValue"
              value={formData.comparisonValue}
              onChange={handleInputChange}
            >
              <option value="angle 1">angle 1</option>
              <option value="angle 2">angle 2</option>
              <option value="angle 3">angle 3</option>
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
        <PhysicsBackgroundResearchDropdown />
      </div>
      <h2>Hypothesis Formulation</h2>
      <div className="selected-variables">
        <h3>Selected Variables:</h3>
        <p>Independent Variable: {selectedVariables.independent.join(", ")}</p>
        <p>Dependent Variable: {selectedVariables.dependent.join(", ")}</p>
        <p>Controlled Variables: {selectedVariables.controlled.join(", ")}</p>
      </div>
      <p>Form your hypothesis based on your selected variables:</p>

      {generateHypothesisStructure()}

      <button onClick={goToPhysicsExperiment}>Next</button>
    </div>
  );
}

function PhysicsExperiment() {
  const Navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-4">
      <div>
        <PhysicsBackgroundResearchDropdown />
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Physics Experiment: Dropping Objects
      </h1>
      <div className="w-full max-w-4xl">
        <DroppingBallSketch />
        <PhysicsLogic />
      </div>
      <button onClick={() => Navigate("/PhysicsResults")}>Next</button>
    </div>
  );
}

function PhysicsResults() {
  return (
    <div>
      <h1>Physics Results</h1>
      <h2>Here Results will be displayed</h2>
    </div>
  );
}

function TreeBackgroundReasearch() {
  const Navigate = useNavigate();

  const goToTreeVariableIdentification = () => {
    Navigate("/TreeVariableIdentification");
  };

  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div>
            <h2>Tree Types</h2>
            <p>
              In Ireland, spruce, oak, and birch trees are prominent species
              with important roles in the ecosystem and forestry.
            </p>

            <p>
              Spruce trees, particularly the Sitka spruce, are widely planted in
              Ireland and make up a large portion of the country’s commercial
              forests. Native to the west coast of North America, Sitka spruce
              thrives in Ireland's temperate climate, growing quickly in wet,
              acidic soils. It is prized for timber production, especially for
              construction and paper industries. However, large-scale
              plantations of spruce can lead to monocultures, which may reduce
              biodiversity.
            </p>

            <p>
              Oak trees, such as the native sessile oak, have been integral to
              Irish forests for thousands of years. Known for their durability
              and rich ecological value, oak trees support a wide range of
              wildlife, including birds, insects, and fungi. Oak wood is
              historically significant, being used in shipbuilding and
              furniture, and the tree’s longevity and resilience make it
              symbolic in Irish culture.
            </p>

            <p>
              Birch trees, particularly downy birch and silver birch, are native
              to Ireland and commonly found in woodlands and wetlands. Birch
              trees play a pioneering role in forest regeneration, helping
              establish woodland ecosystems. They grow quickly and provide
              habitat for various insects and birds. The birch’s light wood is
              also valued in craft and furniture making.
            </p>
          </div>
        );
      case "content2":
        return (
          <div>
            <h2>Soil Types</h2>
            <p>
              Spruce, oak, and birch trees each have distinct soil preferences,
              influencing where they thrive best.
            </p>

            <p>
              Spruce trees, particularly Sitka spruce, prefer acidic,
              well-drained soils. They are often found in upland and coastal
              regions where soils are nutrient-poor but retain moisture. In
              commercial forestry, Sitka spruce is grown on peatlands or
              podzolic soils, which are naturally acidic and suited to its rapid
              growth. However, they can also tolerate a range of soil types,
              from sandy loams to shallow soils overlying bedrock, provided the
              drainage is sufficient.
            </p>

            <p>
              Oak trees, especially the native sessile and pedunculate oaks,
              prefer deep, well-drained soils that are rich in nutrients. They
              thrive in loamy or clay soils that retain moisture but don’t
              become waterlogged. Sessile oak tends to grow in upland areas with
              acidic, shallow soils, while pedunculate oak favors lowland areas
              with deeper, richer soils, often along river valleys where
              alluvial deposits provide fertile ground.
            </p>

            <p>
              Birch trees, including downy and silver birch, are more adaptable
              to a variety of soils. They can grow in both nutrient-poor and
              rich soils but often establish themselves in wet, acidic
              conditions. Downy birch is more tolerant of waterlogged soils,
              thriving in boggy or poorly drained areas, while silver birch
              prefers lighter, sandy or well-drained soils. Both are pioneering
              species, often the first to colonize disturbed or degraded land.
            </p>
          </div>
        );
      case "content3":
        return (
          <div>
            <h2>Water Availability</h2>
            <p>
              Water availability plays a crucial role in the growth and health
              of spruce, oak, and birch trees, as each species has specific
              requirements.
            </p>

            <p>
              Spruce trees, especially Sitka spruce, prefer environments with
              high moisture availability. They are commonly found in regions
              with abundant rainfall and can tolerate wetter conditions better
              than many other tree species. Sitka spruce thrives in areas where
              the soil retains moisture but remains well-drained, as they do not
              do well in areas prone to waterlogging. While they need a
              consistent water supply, they can adapt to drier conditions
              temporarily, though prolonged drought can stress them.
            </p>

            <p>
              Oak trees, particularly sessile and pedunculate oaks, require
              moderate water availability. They prefer well-drained soils and
              can tolerate short periods of drought once established, but
              excessive moisture or waterlogged conditions can negatively affect
              their growth. Sessile oak, often found in upland areas, is more
              tolerant of lower water availability compared to pedunculate oak,
              which thrives in fertile, moisture-retaining lowland soils,
              especially near rivers and wetlands where water is plentiful.
            </p>

            <p>
              Birch trees, especially downy and silver birch, are highly
              adaptable in terms of water needs. Downy birch is more suited to
              wetter conditions, thriving in bogs, wetlands, and areas with poor
              drainage. Silver birch prefers well-drained soils but can tolerate
              both dry and moist conditions. Both species can quickly establish
              in a range of moisture environments, making them important pioneer
              species in forest regeneration.
            </p>
          </div>
        );
      case "content4":
        return (
          <div>
            <h2>Sunlight Exposure</h2>
            <p>
              Sunlight exposure is a key factor influencing the growth of
              spruce, oak, and birch trees, with each species having different
              light requirements.
            </p>

            <p>
              Spruce trees, such as Sitka spruce, thrive in partial to full
              sunlight, but they are also quite shade-tolerant in their early
              stages. This adaptability allows spruce seedlings to establish in
              shaded environments beneath a forest canopy. However, for optimal
              growth, mature spruce trees require full sunlight. In commercial
              forestry, they are often planted in open areas to maximize
              sunlight exposure and growth rates. In dense forests, they may
              dominate due to their ability to grow under shaded conditions
              before outcompeting other species for light.
            </p>

            <p>
              Oak trees, including sessile and pedunculate oaks, prefer full
              sunlight and tend to grow best in open environments. Oaks are
              light-demanding and are typically found in sunny, exposed areas
              such as woodlands, pastures, and along riverbanks. Young oaks can
              tolerate some shade, but as they grow, they need ample sunlight to
              reach their full height and potential. Sunlight is essential for
              their deep-rooted growth and production of strong, durable wood.
            </p>

            <p>
              Birch trees, particularly silver birch and downy birch, are
              pioneer species that favor full sunlight. They are fast-growing
              trees that thrive in open spaces with plenty of light, often
              colonizing disturbed or cleared land. Birch trees need ample
              sunlight for rapid growth, and they are less shade-tolerant than
              spruce or oak, making them more prominent in areas with abundant
              sunlight exposure.
            </p>
          </div>
        );
      case "content5":
        return (
          <div>
            <h2>Temperature</h2>
            <p>
              Spruce, a cold-adapted conifer species, thrives in cooler
              climates. Warmer temperatures can negatively impact their growth
              by increasing respiration rates, which can exceed the rate of
              photosynthesis, reducing net energy for growth. Additionally,
              higher temperatures can lead to drought stress, particularly in
              areas where water availability is limited, further stunting spruce
              growth.
            </p>

            <p>
              Birch trees, common in temperate and boreal regions, are
              moderately tolerant of warmer temperatures. However, excessive
              heat can disrupt their growth by reducing moisture availability
              and increasing susceptibility to diseases and pests. In warmer
              climates, birch trees may exhibit faster growth initially, but
              prolonged exposure to high temperatures can cause water stress and
              reduce their lifespan.
            </p>

            <p>
              Oak trees are more heat-tolerant than spruce and birch, thriving
              in both temperate and warmer regions. Higher temperatures can
              promote growth in oak trees, especially when coupled with
              sufficient water supply. However, extreme heat and drought
              conditions can lead to stress, reducing acorn production and
              slowing growth rates.
            </p>

            <p>
              In summary, while each species responds differently, temperature
              extremes—both high and low—can significantly affect their growth,
              often limiting their resilience and survival under climate change.
            </p>
          </div>
        );
      case "content6":
        return (
          <div>
            <h2>Nutrient Levels</h2>
            <p>
              Nutrient availability significantly affects the growth and
              development of spruce, birch, and oak trees, as these nutrients
              are essential for various physiological processes.
            </p>

            <p>
              Spruce trees require nutrient-rich soils, especially for nitrogen,
              to support their slow but steady growth. In nutrient-poor soils,
              spruce growth can be severely stunted, as these trees have a lower
              ability to adapt to nutrient deficiencies. However, they can
              tolerate acidic soils better than some other species. Increased
              nutrient levels, particularly nitrogen, can boost their growth,
              but excessive nutrients may make them more susceptible to diseases
              and pests.
            </p>

            <p>
              Birch trees are more adaptable to different soil conditions, but
              they grow best in nutrient-rich soils. Adequate levels of
              nitrogen, phosphorus, and potassium are crucial for their fast
              growth rate, especially in their early years. Birch trees often
              colonize disturbed soils and can manage in nutrient-poor
              environments, but without sufficient nutrients, they will exhibit
              reduced height, thinner canopies, and lower resistance to
              environmental stressors.
            </p>

            <p>
              Oaks are relatively hardy and can grow in both nutrient-rich and
              poorer soils. However, nutrient levels still influence their
              growth. In nutrient-rich environments, oak trees show robust
              growth, with larger canopies and greater acorn production. In
              nutrient-deficient soils, growth is slower, and oaks may
              prioritize root development over above-ground biomass to better
              access limited resources.
            </p>

            <p>
              Overall, adequate nutrient levels are essential for optimal growth
              across these species, influencing their health, vigor, and ability
              to cope with environmental stresses.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveContent("content1")}>Tree Types</button>
        <button onClick={() => setActiveContent("content2")}>Soil Types</button>
        <button onClick={() => setActiveContent("content3")}>
          Water Availability
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Sunlight Exposure
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Temperature
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Nutrient Levels
        </button>
      </div>

      {/* Content */}
      <div className="content">{renderContent()}</div>

      {/* Text Editor */}
      <div className="text-editor">
        <h3>Notes</h3>
        <textarea
          id="editor"
          placeholder="Write or paste your notes here..."
        ></textarea>
      </div>
      <div>
        <button onClick={goToTreeVariableIdentification}>Next</button>
      </div>
    </div>
  );
}

function TreeVariableIdentification() {
  const Navigate = useNavigate();

  const [independentVariables, setIndependentVariables] = useState([]);
  const [dependentVariables, setDependentVariables] = useState([]);
  const [controlledVariables, setControlledVariables] = useState([]);

  const goToHypothesisFormation = () => {
    Navigate("/TreeHypothesis", {
      state: {
        independent: independentVariables,
        dependent: dependentVariables,
        controlled: controlledVariables,
      },
    });
  };

  const addToList = (item, listType) => {
    if (listType === 1) {
      setIndependentVariables([...independentVariables, item]);
    } else if (listType === 2) {
      setDependentVariables([...dependentVariables, item]);
    } else if (listType === 3) {
      setControlledVariables([...controlledVariables, item]);
    }
  };

  const clearList = (listType) => {
    if (listType === 1) {
      setIndependentVariables([]);
    } else if (listType === 2) {
      setDependentVariables([]);
    } else if (listType === 3) {
      setControlledVariables([]);
    }
  };

  const sections = [
    "Soil pH",
    "Tree Types",
    "Water Availability",
    "Sunlight Exposure",
    "Temperature",
    "Nutreint Levels",
    "Tree Height (Meters)",
    "Tree Diameter (Centimeters)",
    "Root Length",
    "Time of Day Watering Occurs",
    "Wind Exposure",
    "Closeness to Roads or noisey areas",
    "Orientation of tree",
  ];

  return (
    <div className="container">
      {/* dropDown Section */}
      <div className="mb-4">
        <BackgroundResearchDropdown />
      </div>
      {/* Help Section */}
      <div className="help-section">
        <div className="help-part">
          <h3>What is an Independent Variable?</h3>
          <p>
            An independent variable is the variable the experiment controls. It
            is the component you choose to change in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What is a Dependent Variable?</h3>
          <p>
            A dependent variable is the measurement that changes in response to
            what you have changed in the experiment.
          </p>
        </div>
        <div className="help-part">
          <h3>What are Controlled Variables?</h3>
          <p>
            A controlled variable is any other variable affecting your solution
            that you try to keep the same across all conditions.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <h2>Variable Identification</h2>
        <p>
          In this stage, we are going to select what aspect of tree growth we
          wish to test. Sort the variables below into the three categories of
          variables.
        </p>
        <p>
          Click on the buttons below each box to add them to one of the three
          lists at the bottom of the screen.
        </p>

        {/* Interactive Sections */}
        <div className="interactive-sections">
          {sections.map((section) => (
            <div className="section" key={section}>
              <h3>{section}</h3>
              <div className="controls">
                <button onClick={() => addToList(section, 1)}>
                  Add to Independent Variables
                </button>
                <button onClick={() => addToList(section, 2)}>
                  Add to Dependent Variables
                </button>
                <button onClick={() => addToList(section, 3)}>
                  Add to Controlled Variables
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lists Section */}
        <div className="lists-section">
          <div className="list">
            <h3>Independent Variables</h3>
            <ul className="item-list">
              {independentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(1)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Dependent Variables</h3>
            <ul className="item-list">
              {dependentVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(2)}>
              Remove All
            </button>
          </div>

          <div className="list">
            <h3>Controlled Variables</h3>
            <ul className="item-list">
              {controlledVariables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="remove-btn" onClick={() => clearList(3)}>
              Remove All
            </button>
          </div>
        </div>
        <div>
          <button onClick={goToHypothesisFormation}>Next</button>
        </div>
      </div>
    </div>
  );
}

function TreeHypothesis() {
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

  // TODO: COME back to here to add the form data
  const [formData, setFormData] = useState({
    musicType: "",
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
              name="ph"
              value={formData.ph}
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
              name="ph2"
              value={formData.ph2}
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
              name="firstTreeType"
              value={formData.firstTreeType}
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
              name="secondTreeType"
              value={formData.secondTreeType}
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
              name="firstWater"
              value={formData.firstWater}
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
              name="secondWater"
              value={formData.secondWater}
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
              name="firstSunlight"
              value={formData.firstSunlight}
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
              name="secondSunlight"
              value={formData.secondSunlight}
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
              name="firstTemperature"
              value={formData.firstTemperature}
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
              name="secondTemperature"
              value={formData.secondTemperature}
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
              name="firstNutrient"
              value={formData.firstNutrient}
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
              name="secondNutrient"
              value={formData.secondNutrient}
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
              name="firstTime"
              value={formData.firstTime}
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
              name="secondTime"
              value={formData.secondTime}
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
              name="firstWind"
              value={formData.firstWind}
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
              name="secondWind"
              value={formData.secondWind}
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
              name="firstNoise"
              value={formData.firstNoise}
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
              name="secondNoise"
              value={formData.secondNoise}
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
              name="firstOrientation"
              value={formData.firstOrientation}
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
              name="secondOrientation"
              value={formData.secondOrientation}
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

function TreeExperiment() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVariables = location.state || {
    independent: [],
    dependent: [],
    controlled: [],
  };

  // Store experiment and control results
  const [experimentResults, setExperimentResults] = useState([]);
  const [controlExperimentResults, setControlExperimentResults] = useState([]);

  const goToResults = () => {
    navigate("/TreeResults", {
      state: {
        results: experimentResults,
        controlResults: controlExperimentResults,
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/TreeBackgroundReasearch"
          element={<TreeBackgroundReasearch />}
        />
        <Route
          path="/TreeVariableIdentification"
          element={<TreeVariableIdentification />}
        />
        <Route path="/TreeHypothesis" element={<TreeHypothesis />} />
        <Route path="/TreeExperiment" element={<TreeExperiment />} />
        <Route path="/TreeResults" element={<ResultsPage />} />
        <Route
          path="/PhysicsBackgroundReasearch"
          element={<PhysicsBackgroundReasearch />}
        />
        <Route
          path="/PhysicsVariableIdentification"
          element={<PhysicsVariableIdentification />}
        />
        <Route path="/PhysicsHypothesis" element={<PhysicsHypothesis />} />
        <Route path="/PhysicsExperiment" element={<PhysicsExperiment />} />
        <Route path="/PhysicsResults" element={<PhysicsResults />} />
        <Route
          path="/ChickenBackgroundReasearch"
          element={<ChickenBackgroundReasearch />}
        />
        <Route
          path="/ChickenVariableIdentification"
          element={<ChickenVariableIdentification />}
        />
        <Route path="/ChickenHypothesis" element={<ChickenHypothesis />} />
        <Route path="/ChickenExperiment" element={<ChickenExperiment />} />
        <Route path="/ChickenResultsPage" element={<ChickenResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
