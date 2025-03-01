import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundResearchDropdown from "./treeBackgroundReasearch.jsx";

function ReturnTreeVariableIdentification() {
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
    if (
      independentVariables.includes(item) ||
      dependentVariables.includes(item) ||
      controlledVariables.includes(item)
    ) {
      alert(
        "Recheck your selected variables!\n" +
          item +
          " already exists in one of the lists."
      );
      return;
    }
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

export default ReturnTreeVariableIdentification;
