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
import { ResultsProvider } from "./ResultsContext.jsx";

import ReturnTreeBackgroundReasearch from "./TreeFolder/TreeBackground.jsx";
import ReturnTreeVariableIdentification from "./TreeFolder/TreeVariableIdentification.jsx";
import ReturnTreeHypothesis from "./TreeFolder/TreeHypothesis.jsx";
import ReturnTreeExperiment from "./TreeFolder/TreeExperiment.jsx";
import ResultsPage from "./TreeResults.jsx";

import DroppingBallSketch from "./PhysicsSketch.jsx";
import PhysicsLogic from "./PhysicsLogic.jsx";
import PhysicsBackgroundResearchDropdown from "./PhysicsBackgroundResearch.jsx";
import HomePage from "./HomePage/Home.jsx";

import ReturnChickenBackgroundResearch from "./Chicken/ChickenBackground.jsx";
import ReturnChickenVariableIdentification from "./Chicken/ReturnChickenVariableIdentification.jsx";
import ReturnChickenHypothesis from "./Chicken/ReturnChickenHypothesis.jsx";
import ChickenSketch from "./ChickenSketch.jsx";
import ChickenResults from "./ChickenResults.jsx";
import ChickConclusion from "./ChickenConclusion.jsx";
import Conclusion from "./TreeConclusion.jsx";
import "./TreeHypothesis.css";

// Home page for the microworld.
function Home() {
  return <HomePage />;
}

// Set of functions for Experiment #1: Tree Growth.
function TreeBackgroundReasearch() {
  return <ReturnTreeBackgroundReasearch />;
}

function TreeVariableIdentification() {
  return <ReturnTreeVariableIdentification />;
}

function TreeHypothesis() {
  return <ReturnTreeHypothesis />;
}

function TreeExperiment() {
  return <ReturnTreeExperiment />;
}

function TreeConclusion() {
  return (
    <div>
      <Conclusion />
    </div>
  );
}

// Set of Functions for Experiment #2 Chicken experiment.
function ChickenBackgroundReasearch() {
  return <ReturnChickenBackgroundResearch />;
}

function ChickenVariableIdentification() {
  return <ReturnChickenVariableIdentification />;
}

function ChickenHypothesis() {
  return <ReturnChickenHypothesis />;
}

function ChickenExperiment() {
  return <ChickenSketch />;
}

function ChickenResultsPage() {
  return (
    <div>
      <ChickenResults />
    </div>
  );
}

function ChickenConclusion() {
  return <ChickConclusion />;
}

// Set of functions for Experiment #3: Physics experiement.
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

function App() {
  return (
    <ResultsProvider>
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
          <Route path="/TreeConclusion" element={<TreeConclusion />} />

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
          <Route path="/ChickenConclusion" element={<ChickenConclusion />} />
        </Routes>
      </BrowserRouter>
    </ResultsProvider>
  );
}

export default App;
