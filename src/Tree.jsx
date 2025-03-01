import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TreeGrowth.css";
import "./ExperimentButtons.css";

class Tree {
  constructor(initialHeight, initialDiameter, initialAge) {
    this.height = initialHeight;
    this.diameter = initialDiameter;
    this.age = initialAge;
    this.isAlive = true;
    this.stressCounter = 0;
  }

  static getSeasonalGrowthModifier(age) {
    const month = (age % 12) + 1;
    if (month >= 3 && month <= 8) return 1.2; // Spring/Summer (Higher Growth)
    if (month >= 9 && month <= 11) return 0.8; // Fall (Moderate Growth)
    return 0.5; // Winter (Low Growth)
  }

  static getExtremeEventModifier() {
    const rand = Math.random();
    if (rand < 0.05) {
      return { impact: 0.6, event: "Drought", fallRisk: 0 }; // No fall risk in drought
    }
    if (rand < 0.08) {
      return { impact: 0.7, event: "Storm", fallRisk: 0.3 }; // 30% chance of falling
    }
    if (rand < 0.1) {
      return { impact: 0.5, event: "Disease", fallRisk: 0 }; // No fall risk in disease
    }
    return { impact: 1, event: "None", fallRisk: 0 }; // Normal year
  }

  static getDynamicCompetitionFactor(age) {
    if (age < 10) return 0.9; // Less competition
    if (age < 30) return 0.7; // Moderate competition
    return 0.5; // Older trees struggle with competition
  }

  static getRandomVariation() {
    return 1 + (Math.random() * 0.1 - 0.05); // ±5% growth variation
  }

  growthRate(environmentalFactor) {
    const ageFactor = Math.max(0.2, 1 - this.age / 100.0);
    return Math.max(0, environmentalFactor * ageFactor);
  }

  grow(environmentalFactor) {
    if (!this.isAlive) {
      if (this.age % 5 === 0) {
        this.height = Math.max(0, this.height - 0.05);
        this.diameter = Math.max(0, this.diameter - 0.03);
      }
      this.age += 1;
      return "🌳 This tree has already fallen and cannot grow further.";
    }

    const growthModifier = this.growthRate(environmentalFactor);
    const baseHeightGrowth = 0.5;
    const baseDiameterGrowth = 0.3;

    const seasonalGrowth = Tree.getSeasonalGrowthModifier(this.age);
    const extremeEventData = Tree.getExtremeEventModifier();
    const extremeEvent = extremeEventData.impact;
    this.lastExtremeEvent = extremeEventData.event;

    const randomVariation = Tree.getRandomVariation();
    const competitionFactor = Tree.getDynamicCompetitionFactor(this.age);

    // Check if the tree falls due to a storm
    if (
      extremeEventData.event === "Storm" &&
      Math.random() < extremeEventData.fallRisk
    ) {
      this.isAlive = false;
      this.height = 0;
      return `🌪️ Disaster! The tree fell due to a storm this year.`;
    }

    // Track stress accumulation
    if (extremeEvent < 1 || environmentalFactor < 0.5) {
      this.stressCounter += 1;
    } else {
      this.stressCounter = Math.max(0, this.stressCounter - 1);
    }

    const stressImpact = Math.max(0.5, 1 - this.stressCounter * 0.1);

    // Final growth factor check
    const finalGrowthFactor =
      growthModifier *
      seasonalGrowth *
      extremeEvent *
      stressImpact *
      randomVariation *
      competitionFactor;
    if (isNaN(finalGrowthFactor)) {
      console.error("⚠️ Final growth factor is NaN! Using default value.");
      return "⚠️ An error occurred in the growth calculation.";
    }

    this.height += baseHeightGrowth * finalGrowthFactor;
    this.diameter += baseDiameterGrowth * finalGrowthFactor;
    this.age += 1;

    return this.lastExtremeEvent !== "None"
      ? `🌍 Extreme Event - ${this.lastExtremeEvent}`
      : `🌿 Tree is growing normally.`;
  }
}

function TreeGrowth({ selectedVariables, setAllResults }) {
  const navigate = useNavigate();

  const VARIABLE_CONFIG = {
    "Water Availability": {
      min: 0,
      max: 100,
      step: 1,
      default: 50,
      unit: "%", // Soil moisture percentage
    },
    "Sunlight Exposure": {
      min: 0,
      max: 24,
      step: 1,
      default: 12,
      unit: "hours", // Standard measure of light intensity
    },
    "Soil pH": {
      min: 0,
      max: 14,
      step: 0.5,
      default: 6.5,
      unit: "pH",
    },
    Temperature: {
      min: -20,
      max: 50,
      step: 0.5,
      default: 25,
      unit: "°C",
    },
    "Nutreint Levels": {
      min: 0,
      max: 1000,
      step: 10,
      default: 500,
      unit: "ppm", // Parts per million for nutrient concentration
    },
    "Time of Day Watering Occurs": {
      type: "select",
      options: ["Morning", "Afternoon", "Evening"],
      default: "Morning",
    },
    "Orientation of tree": {
      type: "select",
      options: ["North", "South", "East", "West"],
      default: "North",
    },
    "Wind Exposure": {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "high",
    },
    "Closeness to Roads or noisey areas": {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "high",
    },
  };

  const variables = selectedVariables || {
    independent: [],
    dependent: [],
    controlled: [],
    firstValue: "",
    comparisonValue: "",
  };

  const variableMapping = {
    soilPh: "Soil pH",
    water: "Water Availability",
    light: "Sunlight Exposure",
    temperature: "Temperature",
    nutrients: "Nutreint Levels",
    wind: "Wind Exposure",
    closeness: "Closeness to Roads or noisey areas",
  };

  const initializeSliders = () => {
    const sliders = {};

    [...variables.independent, ...variables.controlled].forEach((variable) => {
      const mappedVariable = variableMapping[variable] || variable; // Convert display name to internal key
      const config = VARIABLE_CONFIG[mappedVariable];

      if (config) {
        // ✅ If the variable is a dropdown (select), set default string value
        if (config.type === "select") {
          sliders[mappedVariable] = config.default;
        }
        // ✅ If it's a numerical slider, set default numerical value
        else {
          sliders[mappedVariable] = config.default;
        }
      } else {
        console.warn(`⚠️ Variable "${variable}" not found in VARIABLE_CONFIG`);
        sliders[mappedVariable] = 0;
      }
    });

    console.log("✅ Final Slider Values:", sliders);
    return sliders;
  };

  const [sliderValues, setSliderValues] = useState(() => initializeSliders());
  const [results, setResults] = useState([]);
  const [experimentCount, setExperimentCount] = useState(1);
  const [isControl, setIsControl] = useState(false); // To indicate whether this is a control experiment

  const handleSliderChange2 = (variable, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [variable]: parseFloat(value),
    }));
  };

  const handleExperimentCountChange = (e) => {
    setExperimentCount(parseInt(e.target.value, 10) || 1);
  };

  const [isRunning, setIsRunning] = useState(false);
  const [eventMessages, setEventMessages] = useState([]);
  const isRunningRef = useRef(false);

  const runSimulation = useCallback(async () => {
    if (isRunningRef.current) {
      return;
    }
    isRunningRef.current = true;
    setIsRunning(true);
    setEventMessages([]);

    try {
      const timeSteps = 10;
      const initialHeight = 1.0; // meters
      const initialDiameter = 5.0; // cm
      const initialAge = 5;
      let competitionFactor = 0.8; // Base competition factor

      // Function to add small variation (±5%)
      const addVariation = (value, percentage = 0.05) => {
        const variation = value * (Math.random() * percentage * 2 - percentage);
        return value + variation;
      };

      // Use user-selected values or default to optimal levels (with variation)
      const water = addVariation(
        sliderValues["Water Availability"] !== undefined
          ? sliderValues["Water Availability"] / 100
          : 0.7
      );

      const light = addVariation(
        sliderValues["Sunlight Exposure"] !== undefined
          ? sliderValues["Sunlight Exposure"] / 24
          : 0.8
      );

      const soilPh = addVariation(
        sliderValues["Soil pH"] !== undefined ? sliderValues["Soil pH"] : 6.5,
        0.02 // Smaller variation for pH
      );

      const temperature = addVariation(
        sliderValues["Temperature"] !== undefined
          ? sliderValues["Temperature"]
          : 25
      );

      const nutrients = addVariation(
        sliderValues["Nutreint Levels"] !== undefined
          ? sliderValues["Nutreint Levels"] / 1000
          : 0.8
      );

      // Handle categorical variables (unchanged, as they are discrete values)
      const windExposureMultiplier = {
        high: 0.7,
        moderate: 0.9,
        low: 1.0,
      }[sliderValues["Wind Exposure"] || "low"];

      const roadProximityMultiplier = {
        high: 0.8,
        moderate: 0.9,
        low: 1.0,
      }[sliderValues["Closeness to Roads or noisey areas"] || "low"];

      const wateringTimeMultiplier = {
        Morning: 1.0,
        Afternoon: 0.9,
        Evening: 0.8,
      }[sliderValues["Time of Day Watering Occurs"] || "Morning"];

      const orientationMultiplier = {
        North: 1.0,
        South: 0.95,
        East: 0.9,
        West: 0.85,
      }[sliderValues["Orientation of tree"] || "North"];

      // Final environmental factor with added variation
      const environmentalFactor =
        water *
        light *
        (1 - Math.abs(soilPh - 6.5) / 3.0) *
        Math.max(0.5, 1 - Math.abs(temperature - 25) / 50) *
        nutrients *
        windExposureMultiplier *
        roadProximityMultiplier *
        wateringTimeMultiplier *
        orientationMultiplier;

      const allResults = [];
      const newEventMessages = [];

      for (let exp = 1; exp <= experimentCount; exp++) {
        const tree = new Tree(initialHeight, initialDiameter, initialAge);
        const newResults = [];

        for (let year = 1; year <= timeSteps; year++) {
          // Apply calculated environmental factor and run growth (with small variation)
          const eventMessage = tree.grow(
            competitionFactor * addVariation(environmentalFactor, 0.05)
          );

          const resultData = {
            experiment: exp,
            year: year,
            height: tree.height.toFixed(2),
            diameter: tree.diameter.toFixed(2),
            age: tree.age,
            event:
              eventMessage.includes("🌪️") ||
              eventMessage.includes("⚠️") ||
              eventMessage.includes("🌍")
                ? eventMessage // Store event message if it contains an extreme event
                : "No major event",
          };
          newResults.push(resultData);
        }

        allResults.push(...newResults);
      }

      setAllResults((prevResults) => [...prevResults, ...allResults]);
    } catch (error) {
      console.error("simulation error");
    } finally {
      setIsRunning(false);
    }
  }, [experimentCount, setAllResults]);

  const renderSlider = (variable) => {
    const config = VARIABLE_CONFIG[variable];

    if (!config) {
      console.warn(`⚠️ Variable "${variable}" not found in VARIABLE_CONFIG`);
      return null;
    }

    if (config.type === "select") {
      // ✅ Use a dropdown for categorical variables
      return (
        <div key={variable} className="input-group">
          <label htmlFor={variable}>{variable}</label>
          <select
            id={variable}
            value={sliderValues[variable] ?? config.default}
            onChange={(e) => handleSliderChange2(variable, e.target.value)}
          >
            {config.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // ✅ Use a slider for numerical variables
    return (
      <div key={variable} className="input-group">
        <label htmlFor={variable}>{variable}</label>
        <input
          type="range"
          id={variable}
          min={config.min}
          max={config.max}
          step={config.step}
          value={sliderValues[variable] ?? config.default}
          onChange={(e) => handleSliderChange2(variable, e.target.value)}
        />
        <span>
          {sliderValues[variable] ?? config.default} {config.unit || ""}
        </span>
      </div>
    );
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
        <h3>Independent Variables</h3>
        {variables.independent.map((variable) => renderSlider(variable))}

        <h3>Controlled Variables</h3>
        {variables.controlled.map((variable) => renderSlider(variable))}
      </div>

      <button
        onClick={runSimulation}
        disabled={isRunning}
        className={isRunning ? "button-disabled" : "button-active"}
      >
        {isRunning ? "Running..." : "Run Growth Simulation"}
      </button>
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
                <th>Event</th>
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
                  <td>{result.event}</td>
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
