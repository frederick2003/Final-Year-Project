import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sketch from "react-p5";
import "./Styling/ChickenExperiment.css";
import "./Styling/HelpContainer.css";
import ScientistSvg from "./assets/Scientist.svg";

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
          <h3>Experiment</h3>
          <p>
            <strong>Task:</strong>
          </p>
          <p>Adjust the sliders to select:</p>
          <li>The amount of chickens per group.</li>
          <li>The duration of the experiment.</li>
          <p>Then run your experiment!</p>
        </div>
      </div>
    </div>
  );
}

const ChickenExperiment = () => {
  const [chickensPerGroup, setChickensPerGroup] = useState(0);
  const [days, setDays] = useState(0);
  const [experimentStarted, setExperimentStarted] = useState(false);
  const [musicGroup, setMusicGroup] = useState([]);
  const [noMusicGroup, setNoMusicGroup] = useState([]);
  const [eggCounts, setEggCounts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const experimentCount = location.state?.experimentCount || 1;
  const previousConclusion = location.state?.previousConclusion || "";
  const [showTips, setShowTips] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleIntro = () => {
    setShowIntro(false);
  };

  const [experimentData, setExperimentData] = useState({
    independent: [],
    dependent: [],
    controlled: [],
    hypothesis: "",
    firstValue: "",
    comparisonValue: "",
  });

  // In ChickenSketch.jsx, replace the useEffect that handles location state with this enhanced version:

  // Replace the existing useEffect in ChickenSketch.jsx with this more robust version:

  useEffect(() => {
    if (location.state) {
      // Debug what we're working with
      console.log("ChickenSketch received state:", location.state);

      // Extract firstValue and comparisonValue with fallbacks
      const firstValue =
        location.state.firstValue ||
        location.state.experimentData?.firstValue ||
        "";
      const comparisonValue =
        location.state.comparisonValue ||
        location.state.experimentData?.comparisonValue ||
        "";

      // Extract independent variable with proper type handling
      let independentVar;
      if (location.state.independent) {
        independentVar = location.state.independent;
      } else if (location.state.experimentData?.independent) {
        independentVar = location.state.experimentData.independent;
      } else {
        independentVar = [];
      }

      // Ensure independent is an array (convert from string if needed)
      if (typeof independentVar === "string") {
        independentVar = [independentVar];
      } else if (!Array.isArray(independentVar)) {
        // Handle null, undefined, or non-array objects
        independentVar = [];
      }

      // Same for dependent
      let dependentVar;
      if (location.state.dependent) {
        dependentVar = location.state.dependent;
      } else if (location.state.experimentData?.dependent) {
        dependentVar = location.state.experimentData.dependent;
      } else {
        dependentVar = [];
      }

      // Ensure dependent is an array
      if (typeof dependentVar === "string") {
        dependentVar = [dependentVar];
      } else if (!Array.isArray(dependentVar)) {
        // Handle null, undefined, or non-array objects
        dependentVar = [];
      }

      // Same for controlled
      let controlledVars;
      if (location.state.controlled) {
        controlledVars = location.state.controlled;
      } else if (location.state.experimentData?.controlled) {
        controlledVars = location.state.experimentData.controlled;
      } else {
        controlledVars = [];
      }

      // Ensure controlled is an array
      if (typeof controlledVars === "string") {
        controlledVars = [controlledVars];
      } else if (!Array.isArray(controlledVars)) {
        // Handle null, undefined, or non-array objects
        controlledVars = [];
      }

      // Update the experiment data state with properly structured data
      setExperimentData({
        independent: independentVar,
        dependent: dependentVar,
        controlled: controlledVars,
        hypothesis: location.state.hypothesis || "",
        firstValue,
        comparisonValue,
      });

      console.log("Updated experimentData:", {
        independent: independentVar,
        dependent: dependentVar,
        controlled: controlledVars,
        hypothesis: location.state.hypothesis || "",
        firstValue,
        comparisonValue,
      });
    }
  }, [location]);

  class Hen {
    constructor(x, y, group, boundaryX) {
      this.x = x;
      this.y = y;
      this.group = group;
      this.minBoundaryX = group === "music" ? 400 : 0;
      this.maxBoundaryX = group === "music" ? 800 : 400;
      this.eggsLaid = 0;
      this.direction = Math.random() > 0.5 ? 1 : -1; // randomize initial direction
      this.movementCounter = 0;
      this.movementInterval = Math.floor(Math.random() * 60) + 30; // random movement pattern
      this.speed = Math.random() * 0.7 + 0.3; // random speed
    }

    move() {
      this.movementCounter++;
      if (this.movementCounter > this.movementInterval) {
        this.direction = -this.direction;
        this.movementCounter = 0;
        this.movementInterval = Math.floor(Math.random() * 60) + 30;
      }

      let dx = this.direction * this.speed;
      let dy = (Math.random() * 2 - 1) * this.speed;

      // Calculate new position
      let newX = this.x + dx;

      // Check if new position would cross boundary
      if (newX < this.minBoundaryX || newX > this.maxBoundaryX) {
        this.direction = -this.direction; // Reverse direction
        dx = this.direction * this.speed; // Recalculate dx with new direction
        newX = this.x + dx; // Recalculate new position
      }

      // Apply movement with boundary enforcement
      this.x = Math.max(this.minBoundaryX, Math.min(this.maxBoundaryX, newX));
      this.y = Math.max(50, Math.min(350, this.y + dy));
    }

    display(p5) {
      this.move();

      // Shadow
      p5.fill(0, 0, 0, 30);
      p5.ellipse(this.x, this.y + 15, 25, 8);

      // Body
      p5.fill(this.group === "music" ? "#B85C38" : "#E4B363");
      p5.ellipse(this.x, this.y, 30, 20);

      // Wings
      p5.fill(this.group === "music" ? "#A05030" : "#D4A353");
      p5.ellipse(this.x - 5, this.y - 2, 20, 15);

      // Head direction based on movement
      let headOffset = this.direction > 0 ? 10 : -10;
      p5.fill(this.group === "music" ? "#B85C38" : "#E4B363");
      p5.ellipse(this.x + headOffset, this.y - 10, 15, 15);

      // Beak
      p5.fill(255, 165, 0);
      if (this.direction > 0) {
        p5.triangle(
          this.x + 15,
          this.y - 10,
          this.x + 12,
          this.y - 5,
          this.x + 17,
          this.y - 5
        );
      } else {
        p5.triangle(
          this.x - 15,
          this.y - 10,
          this.x - 12,
          this.y - 5,
          this.x - 17,
          this.y - 5
        );
      }

      // Eye
      p5.fill(0);
      p5.ellipse(this.x + headOffset * 0.8, this.y - 12, 3, 3);

      // Comb
      p5.fill(255, 0, 0);
      p5.ellipse(this.x + headOffset * 0.7, this.y - 16, 4, 4);
      p5.ellipse(this.x + headOffset * 1.1, this.y - 17, 4, 4);

      // Legs
      p5.stroke(255, 165, 0);
      p5.strokeWeight(1.5);
      p5.line(this.x - 5, this.y + 10, this.x - 5, this.y + 15);
      p5.line(this.x + 5, this.y + 10, this.x + 5, this.y + 15);

      p5.noStroke();
    }

    layEgg() {
      return Math.random() < (this.group === "music" ? 0.1 : 0.07);
    }
  }

  const updateChickens = (num) => {
    let music = [];
    let noMusic = [];
    for (let i = 0; i < num; i++) {
      music.push(
        new Hen(Math.random() * 380 + 410, Math.random() * 280 + 70, "music")
      );
      noMusic.push(
        new Hen(
          Math.random() * 380 + 10,
          Math.random() * 280 + 70,
          "noMusic",
          380
        )
      );
    }
    setMusicGroup(music);
    setNoMusicGroup(noMusic);
  };

  const handleChickensChange = (e) => {
    const num = Number(e.target.value);
    setChickensPerGroup(num);
    updateChickens(num);
  };

  const startExperiment = () => {
    if (chickensPerGroup <= 0 || days <= 0) {
      alert("Please set valid numbers of chickens and days!");
      return;
    }

    setExperimentStarted(true);
    let results = [];

    // Generate more realistic data with slight advantage for music group
    for (let day = 1; day <= days; day++) {
      let musicBaseRate = 0.65 + Math.random() * 0.2; // 60-80% egg rate
      let noMusicBaseRate = 0.6 + Math.random() * 0.2; // 50-70% egg rate

      let musicEggs = Math.floor(chickensPerGroup * musicBaseRate);
      let noMusicEggs = Math.floor(chickensPerGroup * noMusicBaseRate);

      results.push({
        day,
        eggsWithMusic: musicEggs,
        eggsWithoutMusic: noMusicEggs,
      });
    }

    setEggCounts(results);

    // Get the complete formatted values using getIndependentVariableValues
    let independentVar = "";
    if (
      Array.isArray(experimentData.independent) &&
      experimentData.independent.length > 0
    ) {
      independentVar = experimentData.independent[0];
    } else if (
      typeof experimentData.independent === "string" &&
      experimentData.independent
    ) {
      independentVar = experimentData.independent;
    } else {
      independentVar = "Presence of Music"; // Default fallback
    }

    const formattedValues = getIndependentVariableValues(
      independentVar,
      experimentData
    );

    // Navigate to results page after 3 seconds to show animation
    setTimeout(() => {
      navigate("/ChickenResultsPage", {
        state: {
          experimentData: results,
          hypothesis: experimentData.hypothesis,
          firstValue: formattedValues.firstValue,
          comparisonValue: formattedValues.comparisonValue,
          chickensPerGroup: chickensPerGroup,
          days: days,
          experimentCount: experimentCount,
          previousConclusion: previousConclusion,
        },
      });
    }, 3000);
  };

  const resetExperiment = () => {
    setExperimentStarted(false);
    setEggCounts([]);
  };

  const getIndependentVariableValues = (independentVar, experimentData) => {
    let firstValue = "";
    let comparisonValue = "";

    // Check if firstValue or comparisonValue already contain prefixes to avoid duplication
    const hasFirstPrefix =
      experimentData.firstValue &&
      (experimentData.firstValue.includes("Chickens listening to") ||
        experimentData.firstValue.includes("Chickens in") ||
        experimentData.firstValue.includes("Chickens with") ||
        experimentData.firstValue.includes("Leghorn") ||
        experimentData.firstValue.includes("Plymouth") ||
        experimentData.firstValue.includes("Rhode"));

    const hasCompPrefix =
      experimentData.comparisonValue &&
      (experimentData.comparisonValue.includes("Chickens listening to") ||
        experimentData.comparisonValue.includes("Chickens in") ||
        experimentData.comparisonValue.includes("Chickens with") ||
        experimentData.comparisonValue.includes("Leghorn") ||
        experimentData.comparisonValue.includes("Plymouth") ||
        experimentData.comparisonValue.includes("Rhode"));

    switch (independentVar) {
      case "Presence of Music":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens listening to ${experimentData.firstValue || "Music"}`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens listening to ${
              experimentData.comparisonValue || "no music"
            }`;
        break;

      case "Type Of Music":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens listening to ${
              experimentData.firstValue || "classical music"
            }`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens listening to ${
              experimentData.comparisonValue || "no music"
            }`;
        break;

      case "Volume Level":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens listening to ${
              experimentData.firstValue || "medium volume"
            } music`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens listening to ${
              experimentData.comparisonValue || "no"
            } music`;
        break;

      case "Duration Of Music Exposure":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens listening to music for ${
              experimentData.firstValue || "8"
            } hours`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens listening to music for ${
              experimentData.comparisonValue || "0"
            } hours`;
        break;

      case "Breed Of Chickens":
        firstValue = `${
          experimentData.firstValue || "Rhode Island Red"
        } chickens listening to music`;
        comparisonValue = `${
          experimentData.comparisonValue || "Leghorn"
        } chickens listening to music`;
        break;

      case "Environmental Conditions":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens in ${
              experimentData.firstValue || "moderate"
            } temperature conditions`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens in ${
              experimentData.comparisonValue || "hot"
            } temperature conditions`;
        break;

      case "Diet and Nutrition":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens with ${experimentData.firstValue || "balanced"} diet`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens with ${
              experimentData.comparisonValue || "high protein"
            } diet`;
        break;

      case "Stress Levels":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `Chickens with ${experimentData.firstValue || "low"} stress levels`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `Chickens with ${
              experimentData.comparisonValue || "high"
            } stress levels`;
        break;

      case "Age Of Chickens":
        firstValue = hasFirstPrefix
          ? experimentData.firstValue
          : `${experimentData.firstValue || "Adult"}-aged chickens`;
        comparisonValue = hasCompPrefix
          ? experimentData.comparisonValue
          : `${experimentData.comparisonValue || "Young"}-aged chickens`;
        break;

      default:
        firstValue = "Experimental group chickens";
        comparisonValue = "Control group chickens";
        break;
    }

    return { firstValue, comparisonValue };
  };

  return (
    <div className="chicken-experiment">
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
            <h2>Welcome to your Experiment</h2>

            <li>
              <strong>Independent Variable:</strong>{" "}
              {Array.isArray(experimentData.independent)
                ? experimentData.independent.join(", ")
                : experimentData.independent}
            </li>
            <li>
              <strong>Dependent Variable:</strong> Amount of eggs layed.
            </li>
            <li>
              <strong>Controlled Variables:</strong>{" "}
              {Array.isArray(experimentData.controlled)
                ? experimentData.controlled.join(", ")
                : experimentData.controlled}
            </li>
            <p>
              Adjust the sliders, run the simulation, and observe how{" "}
              <strong>
                {" "}
                "
                {Array.isArray(experimentData.independent)
                  ? experimentData.independent[0]
                  : experimentData.independent}
                "{" "}
              </strong>{" "}
              affects the number of eggs layed by the groups of chickens!
            </p>
            <button className="close-intro-button" onClick={handleIntro}>
              Start Experimenting
            </button>
          </div>
        </div>
      )}
      <HelpSection />
      <div className="progress-message">
        <h2>🔬 Experiment Progress</h2>
        <p>
          You have published your results {experimentCount - 1} time(s). Run the
          experiment again to get a deeper analysis!
        </p>
        <p>{previousConclusion}</p>
      </div>

      <div className="experiment-container">
        <div className="experiment-header">
          <h1>🐔 Chicken Experiment 🐔</h1>
          <button
            className="tips-button"
            onClick={() => setShowTips(!showTips)}
          >
            {showTips ? "Hide Tips" : "Show Tips"}
          </button>
        </div>

        {showTips && (
          <div className="tips-box">
            <h3>🔍 Experiment Tips</h3>
            <ul>
              <li>
                Start with at least 10 chickens per group for better results
              </li>
              <li>Run the experiment for at least 7 days to see patterns</li>
              <li>
                The more chickens and days, the more reliable your results!
              </li>
            </ul>
          </div>
        )}

        <div className="hypothesis-box">
          <h3>Your Hypothesis:</h3>
          <p>{experimentData.hypothesis || "No hypothesis provided yet."}</p>
        </div>

        <div className="controls-container">
          <div className="control-group">
            <label htmlFor="chickens">Chickens per Group:</label>
            <input
              id="chickens"
              type="range"
              min="0"
              max="30"
              value={chickensPerGroup}
              onChange={handleChickensChange}
              disabled={experimentStarted}
            />
            <span className="slider-value">{chickensPerGroup}</span>
          </div>

          <div className="control-group">
            <label htmlFor="days">Days to Monitor:</label>
            <input
              id="days"
              type="range"
              min="0"
              max="30"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              disabled={experimentStarted}
            />
            <span className="slider-value">{days}</span>
          </div>

          <div className="button-group">
            {!experimentStarted ? (
              <button
                className="start-button"
                onClick={startExperiment}
                disabled={chickensPerGroup <= 0 || days <= 0}
              >
                Start Experiment 🔬
              </button>
            ) : (
              <button className="reset-button" onClick={resetExperiment}>
                Reset Experiment 🔄
              </button>
            )}
          </div>
        </div>

        <div className="experiment-canvas">
          <Sketch
            setup={(p5, canvasParentRef) => {
              p5.createCanvas(800, 400).parent(canvasParentRef);
            }}
            draw={(p5) => {
              // Background
              p5.background("#78A86F");

              // Draw pen divider
              p5.stroke(100, 50, 0);
              p5.strokeWeight(10);
              p5.line(400, 0, 400, 400);
              p5.noStroke();

              // Draw coop in each pen
              p5.fill("#8B4513");
              p5.rect(50, 270, 80, 60);
              p5.rect(670, 270, 80, 60);

              // Coop roofs
              p5.fill("#A52A2A");
              p5.triangle(40, 270, 90, 230, 140, 270);
              p5.triangle(660, 270, 710, 230, 760, 270);

              // Draw food and water
              p5.fill("#77B5FE");
              p5.ellipse(200, 320, 40, 15);

              p5.fill("#F5DEB3");
              p5.ellipse(300, 320, 40, 15);

              p5.fill("#77B5FE");
              p5.ellipse(500, 320, 40, 15);

              p5.fill("#F5DEB3");
              p5.ellipse(600, 320, 40, 15);

              // Draw chickens
              musicGroup.forEach((hen) => hen.display(p5));
              noMusicGroup.forEach((hen) => hen.display(p5));

              // Inside the Sketch draw function, replace the group labels section with this code:
              // Draw group labels
              p5.fill(0);
              p5.textSize(18);
              p5.textAlign(p5.CENTER);

              // Get formatted label values
              // Get formatted label values
              let labelValues;
              if (
                Array.isArray(experimentData.independent) &&
                experimentData.independent.length > 0
              ) {
                labelValues = getIndependentVariableValues(
                  experimentData.independent[0],
                  experimentData
                );
              } else if (
                typeof experimentData.independent === "string" &&
                experimentData.independent
              ) {
                labelValues = getIndependentVariableValues(
                  experimentData.independent,
                  experimentData
                );
              } else {
                labelValues = getIndependentVariableValues(
                  "Presence of Music", // Default fallback
                  experimentData
                );
              }

              // Draw label backgrounds
              p5.fill(255);
              p5.rect(0, 20, 395, 30, 10);
              p5.rect(405, 20, 400, 30, 10);

              // Draw label text
              p5.fill(0);
              p5.text(labelValues.comparisonValue, 600, 40);
              p5.text(labelValues.firstValue, 200, 40);
              // Draw experiment status
              if (experimentStarted) {
                p5.fill(255, 0, 0);
                p5.textSize(24);
                p5.text("Experiment Running...", 400, 380);
              }
            }}
          />
        </div>

        {experimentStarted && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Collecting experimental data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChickenExperiment;
