import React from "react";
import TreeGrowth from "../Tree.jsx";

// This is a wrapper component to connect TreeGrowth with parent state
function TreeGrowthContainer({
  selectedVariables,
  setExperimentResults,
  setControlResults,
  setCurrentYear,
  setTreeCount,
  setHasStarted,
  setExperimentEvent,
  setControlEvent,
}) {
  // Forward the state updates from TreeGrowth to parent component
  const handleExperimentEvent = (event) => {
    if (setExperimentEvent) setExperimentEvent(event);
  };

  const handleControlEvent = (event) => {
    if (setControlEvent) setControlEvent(event);
  };

  const handleCurrentYear = (year) => {
    if (setCurrentYear) setCurrentYear(year);
  };

  const handleTreeCount = (count) => {
    if (setTreeCount) setTreeCount(count);
  };

  const handleHasStarted = (started) => {
    if (setHasStarted) setHasStarted(started);
  };

  return (
    <TreeGrowth
      selectedVariables={selectedVariables}
      setExperimentResults={setExperimentResults}
      setControlResults={setControlResults}
      onYearChange={handleCurrentYear}
      onTreeCountChange={handleTreeCount}
      onExperimentStart={handleHasStarted}
      onExperimentEvent={handleExperimentEvent}
      onControlEvent={handleControlEvent}
    />
  );
}

export default TreeGrowthContainer;
