import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TreeGrowth.css";

class Tree {
  constructor(initialHeight, initialDiameter, initialAge) {
    this.height = initialHeight;
    this.diameter = initialDiameter;
    this.age = initialAge;
    this.isAlive = true;
  }

  growthRate(water, light, soilPh, competitionFactor) {
    const optimalWater = 1.0;
    const optimalLight = 1.0;
    const optimalPh = 6.5;

    // If conditions are unsuitable, set the tree to "dying" state
    if (water === 0 || light === 0 || soilPh < 5.5 || soilPh > 7.5) {
      this.isAlive = false;
      return 0; // No growth if tree is dying
    }

    // Calculate environmental growth modifiers
    const waterFactor = Math.max(0, Math.min(1, water / optimalWater));
    const lightFactor = Math.max(0, Math.min(1, light / optimalLight));

    let phFactor;
    if (soilPh >= 5.5 && soilPh <= 7.5) {
      phFactor = 1 - Math.abs(soilPh - optimalPh) / 3.0;
    } else {
      phFactor = 0;
    }

    const environmentalModifier = waterFactor * lightFactor * phFactor;

    // Age-related growth slowdown
    const ageFactor = Math.max(0.2, 1 - this.age / 100.0);

    // Combined growth modifier
    return environmentalModifier * ageFactor * competitionFactor;
  }

  grow(water, light, soilPh, competitionFactor) {
    // Check if the tree is alive
    if (!this.isAlive) {
      // If dying, reduce height and diameter gradually
      this.height = Math.max(0, this.height - 0.05); // Decrease height by 0.05 m per year
      this.diameter = Math.max(0, this.diameter - 0.03); // Decrease diameter by 0.03 cm per year
      this.age += 1;
      return;
    }

    // Calculate growth modifier from environmental and competitive conditions
    const growthModifier = this.growthRate(
      water,
      light,
      soilPh,
      competitionFactor
    );

    // Base growth rates for height and diameter (optimal conditions)
    const baseHeightGrowth = 0.5; // meters per year
    const baseDiameterGrowth = 0.3; // cm per year

    // Adjust growth based on calculated growth modifier
    this.height += baseHeightGrowth * growthModifier;
    this.diameter += baseDiameterGrowth * growthModifier;
    this.age += 1;
  }
}

function TreeGrowth({ selectedVariables, setAllResults }) {
  const navigate = useNavigate();
  const [environmentalFactors, setEnvironmentalFactors] = useState({
    water: 0.5,
    light: 0.5,
    soilPh: 7,
  });

  const variables = selectedVariables || {
    independent: [],
    dependent: [],
    controlled: [],
  };
  const initializeSliders = () => {
    const sliders = {
      light: 0.5,
      water: 0.5,
      soilPh: 7, // Default value for soil pH
    };

    variables.independent.forEach((variable) => {
      sliders[variable] = 0.5; // Default value
    });
    variables.controlled.forEach((variable) => {
      sliders[variable] = 0.5; // Default value
    });

    return sliders;
  };

  const [sliderValues, setSliderValues] = useState(initializeSliders());
  const [results, setResults] = useState([]);
  const [experimentCount, setExperimentCount] = useState(1);
  const [controlResults, setControlResults] = useState([]);
  const [isControl, setIsControl] = useState(false); // To indicate whether this is a control experiment

  const handleSliderChange2 = (variable, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [variable]: parseFloat(value),
    }));
  };

  const handleSliderChange = (name, value) => {
    setEnvironmentalFactors((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleExperimentCountChange = (e) => {
    setExperimentCount(parseInt(e.target.value, 10) || 1);
  };

  const runSimulation = () => {
    const timeSteps = 10;
    const initialHeight = 1.0; // meters
    const initialDiameter = 5.0; // cm
    const initialAge = 5;
    const competitionFactor = 0.8; // Competition factor from other trees

    const allResults = [];

    for (let exp = 1; exp <= experimentCount; exp++) {
      const tree = new Tree(initialHeight, initialDiameter, initialAge);
      const newResults = [];

      for (let year = 1; year <= timeSteps; year++) {
        const water = sliderValues.water * (0.9 + Math.random() * 0.2);
        const light = sliderValues.light * (0.9 + Math.random() * 0.2);
        const soilPh = sliderValues.soilPh + (Math.random() * 0.4 - 0.2);

        tree.grow(water, light, soilPh, competitionFactor);

        newResults.push({
          experiment: exp,
          year: year,
          height: tree.height.toFixed(2),
          diameter: tree.diameter.toFixed(2),
          age: tree.age,
        });
      }

      allResults.push(...newResults);
    }
    setAllResults(allResults);
  };

  return (
    <div className="container">
      <h1>Tree Growth Model</h1>
      <label htmlFor="experimentCount">Number of Experiment Runs:</label>
      <input
        type="number"
        id="experimentCount"
        value={experimentCount}
        min="1"
        onChange={handleExperimentCountChange}
      />

      {/* Add the toggle for Control Experiment here */}
      <div className="input-group">
        <label htmlFor="isControl">Run as Control Experiment:</label>
        <input
          type="checkbox"
          id="isControl"
          checked={isControl}
          onChange={(e) => setIsControl(e.target.checked)}
        />
      </div>

      <div className="input-container">
        {variables.independent.concat(variables.controlled).map((variable) => (
          <div key={variable} className="input-group">
            <label htmlFor={variable}>{variable}</label>
            <input
              type="range"
              id={variable}
              min="0"
              max="1"
              step="0.01"
              value={sliderValues[variable]}
              onChange={(e) => handleSliderChange2(variable, e.target.value)}
            />
            <span>{sliderValues[variable]}</span>
          </div>
        ))}
      </div>

      <button onClick={runSimulation}>Run Growth Simulation</button>

      {results.length > 0 && (
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Experiment</th>
                <th>Year</th>
                <th>Height (m)</th>
                <th>Diameter (cm)</th>
                <th>Age (years)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.experiment}</td>
                  <td>{result.year}</td>
                  <td>{result.height}</td>
                  <td>{result.diameter}</td>
                  <td>{result.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TreeGrowth;
