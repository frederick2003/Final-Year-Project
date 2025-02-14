import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReturnChickenBackgroundResearch() {
  const Navigate = useNavigate();

  const goToChickenVariableIdentification = () => {
    Navigate("/ChickenVariableIdentification");
  };

  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div>
            <h2>Type Of Music</h2>
            <p>
              The type of music played (e.g., classical, pop, or no music) can
              influence the results. Use consistent genres and volume levels for
              different test groups to observe how varying musical styles affect
              egg production.
            </p>
          </div>
        );
      case "content2":
        return (
          <div>
            <h2>Volume Level</h2>
            <p>
              Loud or soft music might impact the chickens differently. Maintain
              a consistent, moderate volume to avoid startling the chickens or
              masking other environmental noises critical to their well-being.
            </p>
          </div>
        );
      case "content3":
        return (
          <div>
            <h2>Duration Of Music Exposure</h2>
            <p>
              The length of time the music is played daily may influence the
              experiment's outcome. Ensure a consistent schedule (e.g., 8 hours
              per day) and compare against control groups with no music.
            </p>
          </div>
        );
      case "content4":
        return (
          <div>
            <h2>Breed Of Chicken</h2>
            <p>
              Different chicken breeds may respond to stimuli differently.
              Conduct the experiment with the same breed for consistency, or
              compare breeds to analyze breed-specific responses to music.
            </p>
          </div>
        );
      case "content5":
        return (
          <div>
            <h2>Age Of Chicken</h2>
            <p>
              The age of the chickens can influence egg production rates. Use
              chickens of similar age in both the experimental and control
              groups to minimize this variable’s impact on results.
            </p>
          </div>
        );
      case "content6":
        return (
          <div>
            <h2>Diet and Nutrition</h2>
            <p>
              Egg production heavily depends on nutrition. Provide the same
              high-quality feed and water to all groups to ensure differences in
              egg production are not due to dietary factors.
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
          Type Of Music
        </button>
        <button onClick={() => setActiveContent("content2")}>
          Volume Level
        </button>
        <button onClick={() => setActiveContent("content3")}>
          Duration Of Music Exposure
        </button>
        <button onClick={() => setActiveContent("content4")}>
          Breed Of Chicken
        </button>
        <button onClick={() => setActiveContent("content5")}>
          Age Of Chicken
        </button>
        <button onClick={() => setActiveContent("content6")}>
          Diet and Nutrition
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
        <button onClick={goToChickenVariableIdentification}>Next</button>
      </div>
    </div>
  );
}

export default ReturnChickenBackgroundResearch;
