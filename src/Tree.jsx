import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/TreeExperiment.css";
import "./TreeGrowth.css";
import "./ExperimentButtons.css";
import {
  FaTint,
  FaSun,
  FaLeaf,
  FaWind,
  FaQuestion,
  FaTree,
  FaTrophy,
  FaFlask,
  FaInfoCircle,
  FaChartLine,
  FaArrowAltCircleDown,
} from "react-icons/fa";

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
      return { impact: 0.7, event: "Storm", fallRisk: 0 }; // 30% chance of falling
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

function TreeGrowth({
  selectedVariables,
  setExperimentResults,
  setControlResults,
  onYearChange,
  onTreeCountChange,
  onExperimentStart,
  onExperimentEvent,
  onControlEvent,
}) {
  // Simulation settings
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [treesCount, setTreesCount] = useState(1);
  const [showTips, setShowTips] = useState(false);
  const [expertTip, setExpertTip] = useState("");
  const [achievements, setAchievements] = useState([]);
  // Environmental event state
  const [experimentEvent, setExperimentEvent] = useState("None");
  const [controlEvent, setControlEvent] = useState("None");
  const navigate = useNavigate();
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const LoadingIndicator = ({ isRunning, currentYear }) => {
    const displayYear = Math.floor(currentYear);

    return (
      <div className="loading-indicator">
        <div className="loading-spinner"></div>
        <div className="year-display">Year: {displayYear} / 10</div>
      </div>
    );
  };
  const validateSliderValues = () => {
    let isValid = true;
    let errorMessages = [];

    // Check each independent variable to ensure values match expected values
    variables.independent.forEach((variable) => {
      const mappedVariable = variableMapping[variable] || variable;
      const config = VARIABLE_CONFIG[mappedVariable];

      if (!config) return;

      // Convert values for comparison (to handle string vs number issues)
      const expValue = String(experimentSliderValues[mappedVariable]);
      const controlValue = String(controlSliderValues[mappedVariable]);
      const firstVal = String(variables.firstValue);
      const comparisonVal = String(variables.comparisonValue);

      // Check experiment group values against firstValue
      if (variables.firstValue && expValue !== firstVal) {
        isValid = false;
        errorMessages.push(
          `Error: ${mappedVariable} in Experiment Group 1 should be set to ${variables.firstValue}`
        );
      }

      // Check control group values against comparisonValue
      if (variables.comparisonValue && controlValue !== comparisonVal) {
        isValid = false;
        errorMessages.push(
          `Error: ${mappedVariable} in Experiment Group 2 should be set to ${variables.comparisonValue}`
        );
      }
    });

    return {
      isValid,
      errorMessage: errorMessages.length > 0 ? errorMessages.join(". ") : "",
    };
  };

  // Current tree state for visualization
  const [experimentTreeState, setExperimentTreeState] = useState({
    water: 50,
    light: 12,
    temperature: 25,
    wind: "moderate",
    event: "None",
  });

  const [controlTreeState, setControlTreeState] = useState({
    water: 50,
    light: 12,
    temperature: 25,
    wind: "moderate",
    event: "None",
  });

  const animationRef = useRef(null);

  const VARIABLE_CONFIG = {
    "Water Availability": {
      type: "select",
      options: ["abundant", "moderate", "poor"],
      default: "moderate",
      icon: <FaTint />,
      description:
        "Water affects the tree's ability to transport nutrients and perform photosynthesis.",
    },
    "Sunlight Exposure": {
      min: 0,
      max: 24,
      step: 1,
      default: 12,
      unit: "hours",
      icon: <FaSun />,
      description:
        "Sunlight provides energy for photosynthesis, which creates food for the tree.",
    },
    "Soil pH": {
      min: 0,
      max: 14,
      step: 0.5,
      default: 7.0,
      unit: "pH",
      icon: <FaLeaf />,
      description:
        "Soil pH affects nutrient availability and the tree's ability to absorb them.",
    },
    Temperature: {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "moderate",
      icon: <FaSun />,
      description:
        "Temperature affects the rate of photosynthesis and metabolic processes.",
    },
    "Nutreint Levels": {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "moderate",
      icon: <FaLeaf />,
      description:
        "Nutrients are essential minerals that trees need for growth and development.",
    },
    "Time of Day Watering Occurs": {
      type: "select",
      options: ["morning", "afternoon", "evening"],
      default: "morning",
      icon: <FaTint />,
      description:
        "The time of day affects water evaporation rates and absorption efficiency.",
    },
    "Orientation of tree": {
      type: "select",
      options: ["north", "south", "east", "west"],
      default: "north",
      icon: <FaQuestion />,
      description: "Orientation affects sunlight exposure and wind conditions.",
    },
    "Wind Exposure": {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "moderate",
      icon: <FaWind />,
      description:
        "Wind can affect water loss and physical stress on the tree.",
    },
    "Closeness to Roads or noisey areas": {
      type: "select",
      options: ["high", "moderate", "low"],
      default: "low",
      icon: <FaQuestion />,
      description:
        "Proximity to roads can expose trees to pollution and soil compaction.",
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
    "Soil pH": "Soil pH",
    "Water Availability": "Water Availability",
    "Sunlight Exposure": "Sunlight Exposure",
    Temperature: "Temperature",
    "Nutrient Levels": "Nutreint Levels", // Note the typo in the original code
    "Wind Exposure": "Wind Exposure",
    "Closeness to Roads or noisey areas": "Closeness to Roads or noisey areas",

    // Add reverse mappings for the keys coming from selectedVariables
    soilPh: "Soil pH",
    water: "Water Availability",
    light: "Sunlight Exposure",
    temperature: "Temperature",
    nutrients: "Nutreint Levels",
    wind: "Wind Exposure",
    closeness: "Closeness to Roads or noisey areas",
  };

  // Interesting facts about trees to display
  const treeFacts = [
    "Trees communicate with each other through an underground network of fungi called the 'Wood Wide Web'.",
    "The oldest tree in the world is over 5,000 years old!",
    "A single large tree can provide a day's supply of oxygen for up to four people.",
    "Trees can detect when deer are eating them and change their leaf chemistry to taste bad.",
    "Some trees release chemicals when being eaten that signal to other trees to start producing defensive chemicals.",
    "Tree rings grow faster in warm, wet years and slower in cold, dry years.",
    "Trees can lower air temperature by up to 10°F by shading and releasing water vapor.",
    "One acre of trees absorbs the carbon dioxide equivalent to driving your car 26,000 miles.",
    "Trees can help reduce stress and improve mental health just by being around them!",
    "Some trees can 'walk' up to 20cm per year by growing new roots in the direction they want to move.",
  ];

  const initializeSliders = (isExperiment) => {
    const sliders = {};

    [...variables.independent, ...variables.controlled].forEach((variable) => {
      // Get the display name for this variable
      const mappedVariable = variableMapping[variable] || variable;
      const config = VARIABLE_CONFIG[mappedVariable];

      if (config) {
        // If it's an independent variable for experiment, use the firstValue
        if (variables.independent.includes(variable) && isExperiment) {
          // Here we just use the default value as a placeholder
          sliders[mappedVariable] = config.default;
        }
        // If it's an independent variable for control, use the comparisonValue
        else if (variables.independent.includes(variable) && !isExperiment) {
          // For select types, pick a different option than the default
          if (config.type === "select") {
            const options = config.options;
            const defaultIndex = options.indexOf(config.default);
            // Pick a different option (next in list or first if default is last)
            const alternativeIndex = (defaultIndex + 1) % options.length;
            sliders[mappedVariable] = options[alternativeIndex];
          } else {
            // For numeric sliders, use 70% of default as before
            sliders[mappedVariable] = config.default;
          }
        }
        // For controlled variables, use the same value for both
        else {
          sliders[mappedVariable] = config.default;
        }
      } else {
        console.warn(
          `⚠️ Variable "${variable}" not found in VARIABLE_CONFIG. Mapped to: ${mappedVariable}`
        );
        sliders[mappedVariable] = 0;
      }
    });

    console.log(
      `✅ Final ${isExperiment ? "Experiment" : "Control"} Slider Values:`,
      sliders
    );
    return sliders;
  };

  const [experimentSliderValues, setExperimentSliderValues] = useState(() =>
    initializeSliders(true)
  );
  const [controlSliderValues, setControlSliderValues] = useState(() =>
    initializeSliders(false)
  );

  useEffect(() => {
    setExperimentTreeState({
      water: experimentSliderValues["Water Availability"] || "moderate",
      light: experimentSliderValues["Sunlight Exposure"] || 12,
      temperature: experimentSliderValues["Temperature"] || "moderate",
      wind: experimentSliderValues["Wind Exposure"] || "moderate",
      event: experimentEvent,
    });

    setControlTreeState({
      water: controlSliderValues["Water Availability"] || "moderate",
      light: controlSliderValues["Sunlight Exposure"] || 12,
      temperature: controlSliderValues["Temperature"] || "moderate",
      wind: controlSliderValues["Wind Exposure"] || "moderate",
      event: controlEvent,
    });
  }, [
    experimentSliderValues,
    controlSliderValues,
    experimentEvent,
    controlEvent,
  ]);
  const [experimentCount, setExperimentCount] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [eventMessages, setEventMessages] = useState([]);

  // Show random tree fact when component mounts
  useEffect(() => {
    const randomFact = treeFacts[Math.floor(Math.random() * treeFacts.length)];
    setExpertTip(randomFact);
  }, []);

  const handleExperimentCountChange = (e) => {
    setExperimentCount(parseInt(e.target.value, 10) || 1);
  };

  const handleTreeCountChange = (e) => {
    setTreesCount(parseInt(e.target.value, 10) || 1);
  };

  const handleSimulationSpeedChange = (e) => {
    setSimulationSpeed(parseInt(e.target.value, 10) || 1);
  };

  // Show a different tip when button is clicked
  const handleNewTip = () => {
    const currentTip = expertTip;
    let newTip;
    do {
      newTip = treeFacts[Math.floor(Math.random() * treeFacts.length)];
    } while (newTip === currentTip);
    setExpertTip(newTip);
  };

  // Animation frame for simulation
  const animateSimulation = useCallback(() => {
    setCurrentYear((prev) => {
      const newYear = prev + 0.05 * simulationSpeed;
      if (newYear >= 10) {
        return 10;
      }

      // Random chance to generate an extreme event
      if (Math.random() < 0.01 * simulationSpeed) {
        const events = ["Drought", "Storm", "Disease", "None"];
        const randomEvent = events[Math.floor(Math.random() * 3)]; // Bias toward extreme events
        setExperimentEvent(randomEvent);

        if (achievements.indexOf(`Experienced ${randomEvent}`) === -1) {
          setAchievements((prev) => [...prev, `Experienced ${randomEvent}`]);
        }
      }

      if (Math.random() < 0.01 * simulationSpeed) {
        const events = ["Drought", "Storm", "Disease", "None"];
        const randomEvent = events[Math.floor(Math.random() * 3)];
        setControlEvent(randomEvent);
      }

      if (
        Math.floor(newYear) > Math.floor(prev) &&
        Math.floor(newYear) % 2 === 0
      ) {
        // Add achievement for reaching a new year
        if (
          achievements.indexOf(`Year ${Math.floor(newYear)} Completed`) === -1
        ) {
          setAchievements((prev) => [
            ...prev,
            `Year ${Math.floor(newYear)} Completed`,
          ]);
        }
      }

      return newYear;
    });

    if (isRunningRef.current) {
      animationRef.current = requestAnimationFrame(animateSimulation);
    }
  }, [simulationSpeed, achievements]);

  const isRunningRef = useRef(false);

  // Modify the runSimulationBatch function to handle the categorical values correctly
  const runSimulationBatch = (sliderValues, count, type) => {
    const results = [];
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

    // Convert categorical values to numerical equivalents for calculation
    const waterValues = {
      abundant: 0.9,
      moderate: 0.7,
      poor: 0.4,
    };

    const temperatureValues = {
      high: 0.7, // High temps aren't optimal
      moderate: 0.9, // Moderate is good
      low: 0.5, // Low temps slow growth
    };

    const nutrientValues = {
      high: 0.9,
      moderate: 0.7,
      low: 0.4,
    };

    // Use user-selected values or default to optimal levels (with variation)
    const water = addVariation(
      sliderValues["Water Availability"] !== undefined
        ? waterValues[sliderValues["Water Availability"]]
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
        ? temperatureValues[sliderValues["Temperature"]]
        : 0.8
    );

    const nutrients = addVariation(
      sliderValues["Nutreint Levels"] !== undefined
        ? nutrientValues[sliderValues["Nutreint Levels"]]
        : 0.7
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
      morning: 1.0,
      afternoon: 0.9,
      evening: 0.8,
    }[sliderValues["Time of Day Watering Occurs"] || "morning"];

    const orientationMultiplier = {
      north: 1.0,
      south: 0.95,
      east: 0.9,
      west: 0.85,
    }[sliderValues["Orientation of tree"] || "north"];

    // Final environmental factor with added variation
    const environmentalFactor =
      water *
      light *
      (1 - Math.abs(soilPh - 6.5) / 3.0) *
      temperature * // Using the temperature value directly now
      nutrients *
      windExposureMultiplier *
      roadProximityMultiplier *
      wateringTimeMultiplier *
      orientationMultiplier;

    for (let exp = 1; exp <= count; exp++) {
      const tree = new Tree(initialHeight, initialDiameter, initialAge);

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
              ? eventMessage
              : "No major event",
        };
        results.push(resultData);
      }
    }

    setExperimentCompleted(true);
    return results;
  };

  // Start the visual simulation and calculate results
  // In Tree.jsx, replace the runSimulation function with this improved version:

  const runSimulation = useCallback(() => {
    const { isValid, errorMessage } = validateSliderValues();

    if (!isValid) {
      setValidationError(errorMessage);
      return; // Prevent simulation from running
    }

    // Clear any previous errors
    setValidationError("");
    setHasStarted(true);
    setIsRunning(true);
    isRunningRef.current = true;

    // Notify parent component
    if (onExperimentStart) onExperimentStart(true);

    // Reset simulation state
    setCurrentYear(0);
    setExperimentEvent("None");
    setControlEvent("None");

    // If this is the first run, add an achievement
    if (achievements.length === 0) {
      setAchievements(["First Experiment Started"]);
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animateSimulation);

    // Use a Promise to ensure results are calculated and state is updated
    const generateResults = () => {
      return new Promise((resolve) => {
        try {
          console.log("Generating experiment results...");
          const experimentResults = runSimulationBatch(
            experimentSliderValues,
            experimentCount,
            "experiment"
          );

          console.log("Generating control results...");
          const controlResults = runSimulationBatch(
            controlSliderValues,
            experimentCount,
            "control"
          );

          console.log("Simulation complete:", {
            experimentResults: experimentResults.length,
            controlResults: controlResults.length,
          });

          resolve({ experimentResults, controlResults });
        } catch (error) {
          console.error("Simulation error:", error);
          resolve({ experimentResults: [], controlResults: [] });
        }
      });
    };

    // Wait for animation to complete before generating results
    const animationTime = 10000 / simulationSpeed;
    console.log(
      `Animation will run for ${animationTime}ms at speed ${simulationSpeed}`
    );

    setTimeout(async () => {
      const { experimentResults, controlResults } = await generateResults();

      // Update state with results
      setExperimentResults(experimentResults);
      setControlResults(controlResults);

      setIsRunning(false);
      isRunningRef.current = false;
      setExperimentCompleted(true);

      // Add achievement for completing experiment
      setAchievements((prev) => [...prev, "Experiment Completed"]);

      // Log that results are ready for navigation
      console.log("Results ready for navigation:", {
        experimentData: experimentResults.length > 0 ? "Available" : "Empty",
        controlData: controlResults.length > 0 ? "Available" : "Empty",
      });
    }, animationTime);
  }, [
    experimentSliderValues,
    controlSliderValues,
    variables,
    experimentCount,
    experimentSliderValues,
    controlSliderValues,
    setExperimentResults,
    setControlResults,
    animateSimulation,
    simulationSpeed,
    achievements,
    onExperimentStart,
  ]);

  // Add this useEffect to communicate state changes to parent
  useEffect(() => {
    if (onYearChange) onYearChange(currentYear);
    if (onTreeCountChange) onTreeCountChange(treesCount);
    if (onExperimentEvent) onExperimentEvent(experimentEvent);
    if (onControlEvent) onControlEvent(controlEvent);
  }, [
    currentYear,
    treesCount,
    experimentEvent,
    controlEvent,
    onYearChange,
    onTreeCountChange,
    onExperimentEvent,
    onControlEvent,
  ]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Render a slider with icon and tooltip
  // Improved slider rendering function
  // In Tree.jsx, update the renderSlider function to include a help popup

  // Improved slider rendering function with help popup
  const renderSlider = (variable, sliderValues, handleChangeFunction) => {
    // Find the display name for internal variables (like 'water' → 'Water Availability')
    let displayVariable = variable;
    const mappedVariable = variableMapping[variable] || variable;

    // Check if we need to use the mapped variable to find config
    const config = VARIABLE_CONFIG[mappedVariable];

    if (!config) {
      console.warn(`⚠️ Variable "${variable}" not found in VARIABLE_CONFIG`);
      return null;
    }

    // Log slider state for debugging
    console.log(`Rendering slider for ${variable}:`, {
      displayName: mappedVariable,
      currentValue: sliderValues[mappedVariable] ?? config.default,
      config: config,
    });

    return (
      <div key={variable} className="input-group">
        <div className="slider-header">
          <span className="variable-icon">{config.icon}</span>
          <label htmlFor={variable}>{mappedVariable}</label>
          <div className="help-popup-container">
            <span className="help-icon">?</span>
            <div className="help-popup">
              <p>{config.description}</p>
            </div>
          </div>
        </div>

        {config.type === "select" ? (
          <select
            id={variable}
            value={sliderValues[mappedVariable] ?? config.default}
            onChange={(e) =>
              handleChangeFunction(mappedVariable, e.target.value)
            }
            className="fancy-select"
            disable={isRunning || experimentCompleted}
          >
            {config.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className="slider-container">
            <input
              type="range"
              id={variable}
              min={config.min}
              max={config.max}
              step={config.step}
              value={sliderValues[mappedVariable] ?? config.default}
              onChange={(e) =>
                handleChangeFunction(mappedVariable, e.target.value)
              }
              className="fancy-slider"
              disabled={isRunning || experimentCompleted}
            />
            <span className="slider-value">
              {sliderValues[mappedVariable] ?? config.default}{" "}
              {config.unit || ""}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderControlVariable = (variable, sliderValues) => {
    // Find the display name for internal variables (like 'water' → 'Water Availability')
    let displayVariable = variable;
    const mappedVariable = variableMapping[variable] || variable;

    // Check if we need to use the mapped variable to find config
    const config = VARIABLE_CONFIG[mappedVariable];

    if (!config) {
      console.warn(`⚠️ Variable "${variable}" not found in VARIABLE_CONFIG`);
      return null;
    }

    // Log slider state for debugging
    console.log(`Rendering slider for ${variable}:`, {
      displayName: mappedVariable,
      currentValue: sliderValues[mappedVariable] ?? config.default,
      config: config,
    });

    return (
      <div key={variable} className="input-group">
        <div className="slider-header">
          <span className="variable-icon">{config.icon}</span>
          <label htmlFor={variable}>{mappedVariable}</label>
          <div className="help-popup-container">
            <span className="help-icon">?</span>
            <div className="help-popup">
              <p>{config.description}</p>
            </div>
          </div>
        </div>
        <p>
          {variable} was selected as a controlled variable. Its level will
          remain the same for each experiment.
        </p>
      </div>
    );
  };

  // Updated handlers for slider changes
  const handleExperimentSliderChange = (variable, value) => {
    console.log(`Experiment slider change: ${variable} → ${value}`);
    setExperimentSliderValues((prev) => ({
      ...prev,
      [variable]:
        typeof value === "string" && !isNaN(parseFloat(value))
          ? parseFloat(value)
          : value,
    }));
  };

  const handleControlSliderChange = (variable, value) => {
    console.log(`Control slider change: ${variable} → ${value}`);
    setControlSliderValues((prev) => ({
      ...prev,
      [variable]:
        typeof value === "string" && !isNaN(parseFloat(value))
          ? parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="tree-growth-container">
      <div className="simulation-controls">
        <div className="control-panel">
          <div className="control-group">
            <h1>
              <FaFlask /> Experiment Setup
            </h1>
            <label htmlFor="treeCount">
              <FaTree /> Select the number of trees you would like to monitor
              during your experiment:
            </label>
            <input
              type="range"
              id="treeCount"
              min="1"
              max="9"
              value={treesCount}
              onChange={handleTreeCountChange}
              className="fancy-slider"
              disabled={isRunning || experimentCompleted}
            />
            <span className="slider-value">{treesCount}</span>
          </div>

          <div className="control-group">
            <label htmlFor="experimentCount">
              <FaSun /> Select how many groups of {treesCount} trees you wish to
              simulate:
            </label>
            <input
              type="range"
              id="experimentCount"
              min="1"
              max="5"
              value={experimentCount}
              onChange={handleExperimentCountChange}
              className="fancy-slider"
              disabled={isRunning || experimentCompleted}
            />
            <span className="slider-value">{experimentCount}</span>
          </div>
        </div>
      </div>

      <div className="split-controls">
        <div className="experiment-side">
          <div className="experiment-header">
            <h3 className="panel-title">
              Experiment control panel:
              <span className="variable-value">
                {selectedVariables.firstValueLabel || "Experiment"}{" "}
                <FaArrowAltCircleDown />
              </span>
            </h3>
          </div>
          <div className="variables-container">
            <h4>Independent Variable</h4>
            {selectedVariables.independent.map((variable) =>
              renderSlider(
                variable,
                experimentSliderValues,
                handleExperimentSliderChange
              )
            )}

            <h4>Controlled Variables</h4>
            {selectedVariables.controlled.map((variable) =>
              renderControlVariable(variable, experimentSliderValues)
            )}
          </div>
        </div>

        {/* Control Side */}
        <div className="control-side">
          <div className="experiment-header">
            <h3 className="panel-title">
              Comparison control panel:
              <span className="variable-value">
                {selectedVariables.comparisonValueLabel || "Control"}{" "}
                <FaArrowAltCircleDown />
              </span>
            </h3>
          </div>
          <div className="variables-container">
            <h4>Independent Variable</h4>
            {selectedVariables.independent.map((variable) =>
              renderSlider(
                variable,
                controlSliderValues,
                handleControlSliderChange
              )
            )}

            <h4>Controlled Variables</h4>
            {selectedVariables.controlled.map((variable) =>
              renderControlVariable(variable, controlSliderValues)
            )}
          </div>
        </div>
      </div>
      {validationError && (
        <div className="validation-error">
          <p>{validationError}</p>
        </div>
      )}

      <div className="run-button-container">
        {isRunning && (
          <LoadingIndicator isRunning={isRunning} currentYear={currentYear} />
        )}
        <button
          onClick={runSimulation}
          disabled={isRunning || experimentCompleted}
          className={
            isRunning
              ? "button-disabled pulse-animation"
              : experimentCompleted
              ? "button-disabled"
              : "button-active"
          }
        >
          {isRunning
            ? "Growing Trees... 🌱"
            : experimentCompleted
            ? "Experiment Completed ✓"
            : "Start Growth Simulation 🌳"}
        </button>
      </div>
    </div>
  );
}

export default TreeGrowth;
