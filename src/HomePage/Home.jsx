import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeStyle.css";
import MicroworldDescription from "./Description.jsx";

function HomePage() {
  const Navigate = useNavigate();

  const goToTreeBackgroundReasearch = () => {
    Navigate("/TreeBackgroundReasearch");
  };
  const goToChickenBackgroundReasearch = () => {
    Navigate("/ChickenBackgroundReasearch");
  };
  const goToPhysicsBackgroundReasearch = () => {
    Navigate("/PhysicsBackgroundReasearch");
  };

  return (
    <div>
      <h1>Scientific Method MicroWorld</h1>
      <div className="experiment-section">
        <div className="card">
          <button onClick={goToTreeBackgroundReasearch}>
            Start Experiment 1
          </button>
          <div className="card-body">
            Click the above button the start your first experiment where you
            will be testing how{" "}
            <strong>Environmental Factors Effect Tree Growth.</strong>
          </div>
        </div>
      </div>
      <div className="experiment-section">
        <div className="card">
          <button onClick={goToChickenBackgroundReasearch}>
            Start Experiment 2
          </button>
          <div className="card-body">
            {" "}
            Click the above button the start your second experiment where you
            will be testing how music effects{" "}
            <strong>Music Effects Egg Production on Hens.</strong>
          </div>
        </div>
      </div>
      <div className="experiment-section">
        <div className="card">
          <button onClick={goToPhysicsBackgroundReasearch}>
            Start Experiment 3
          </button>
          <div className="card-body">This is some text within a card body.</div>
        </div>
      </div>
      <div className="help-section">
        <h2>Help Section:</h2>
        <h3>
          The menu bellow explain the steps to be completed for each experiment.
        </h3>
      </div>
      <div>
        <MicroworldDescription />
      </div>
    </div>
  );
}

export default HomePage;
