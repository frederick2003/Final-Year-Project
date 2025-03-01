import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sketch from "react-p5";
import "./Styling/ChickenExperiment.css";

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

  const [experimentData, setExperimentData] = useState({
    independent: [],
    dependent: [],
    controlled: [],
    hypothesis: "",
    firstValue: "",
    comparisonValue: "",
  });

  useEffect(() => {
    if (location.state) {
      setExperimentData({
        independent: location.state.independent || [],
        dependent: location.state.dependent || [],
        controlled: location.state.controlled || [],
        hypothesis: location.state.hypothesis || "No hypothesis provided.",
        firstValue: location.state.firstValue || "Not specified",
        comparisonValue: location.state.comparisonValue || "Not specified",
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
      return Math.random() < (this.group === "music" ? 0.09 : 0.07);
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
      let musicBaseRate = 0.6 + Math.random() * 0.2; // 60-80% egg rate
      let noMusicBaseRate = 0.5 + Math.random() * 0.2; // 50-70% egg rate

      let musicEggs = Math.floor(chickensPerGroup * musicBaseRate);
      let noMusicEggs = Math.floor(chickensPerGroup * noMusicBaseRate);

      results.push({
        day,
        eggsWithMusic: musicEggs,
        eggsWithoutMusic: noMusicEggs,
      });
    }

    setEggCounts(results);

    // Navigate to results page after 3 seconds to show animation
    setTimeout(() => {
      navigate("/ChickenResultsPage", {
        state: {
          experimentData: results,
          hypothesis: experimentData.hypothesis,
          firstValue: experimentData.firstValue,
          comparisonValue: experimentData.comparisonValue,
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

    switch (independentVar) {
      case "Type Of Music":
        firstValue = `Chickens listening to ${
          experimentData.firstValue || "Classical Music"
        }`;
        comparisonValue = `Chickens with ${
          experimentData.comparisonValue || "No Music"
        }`;
        break;

      case "Volume Level":
        firstValue = `Chickens with ${
          experimentData.firstValue || "High Volume"
        } music`;
        comparisonValue = `Chickens with ${
          experimentData.comparisonValue || "No Music"
        }`;
        break;

      case "Duration Of Music Exposure":
        firstValue = `Music played for ${
          experimentData.firstValue || "8 hours"
        }`;
        comparisonValue = `${experimentData.comparisonValue || "No Music"}`;
        break;

      default:
        firstValue = "Chickens with Music";
        comparisonValue = "Chickens without Music";
        break;
    }

    return { firstValue, comparisonValue };
  };

  return (
    <div className="chicken-experiment">
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

              // Draw group labels
              p5.fill(0);
              p5.textSize(18);
              p5.textAlign(p5.CENTER);
              const { firstValue, comparisonValue } =
                getIndependentVariableValues(
                  experimentData.independent[0],
                  experimentData
                );

              p5.fill(255);
              p5.rect(0, 20, 395, 30, 10);
              p5.rect(405, 20, 400, 30, 10);

              p5.fill(0);
              p5.text(comparisonValue, 200, 40);
              p5.text(firstValue, 600, 40);

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
