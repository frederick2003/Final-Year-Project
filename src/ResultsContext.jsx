// ResultsContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
  // Initialize state from localStorage (if available) or null
  const [treeResults, setTreeResults] = useState(() => {
    const savedTreeResults = localStorage.getItem("treeResults");
    return savedTreeResults ? JSON.parse(savedTreeResults) : null;
  });

  const [chickenResults, setChickenResults] = useState(() => {
    const savedChickenResults = localStorage.getItem("chickenResults");
    return savedChickenResults ? JSON.parse(savedChickenResults) : null;
  });

  // Store treeResults in localStorage whenever it changes
  useEffect(() => {
    if (treeResults) {
      localStorage.setItem("treeResults", JSON.stringify(treeResults));
    } else if (treeResults === null) {
      localStorage.removeItem("treeResults");
    }
  }, [treeResults]);

  // Store chickenResults in localStorage whenever it changes
  useEffect(() => {
    if (chickenResults) {
      localStorage.setItem("chickenResults", JSON.stringify(chickenResults));
    } else if (chickenResults === null) {
      localStorage.removeItem("chickenResults");
    }
  }, [chickenResults]);

  // Wrapper functions to update state and localStorage
  const updateTreeResults = (newResults) => {
    setTreeResults(newResults);
  };

  const updateChickenResults = (newResults) => {
    setChickenResults(newResults);
  };

  // Reset functions to clear specific experiment results
  const resetTreeResults = () => {
    setTreeResults(null);
  };

  const resetChickenResults = () => {
    setChickenResults(null);
  };

  // Reset all experiment results
  const resetAllResults = () => {
    setTreeResults(null);
    setChickenResults(null);
  };

  return (
    <ResultsContext.Provider
      value={{
        treeResults,
        setTreeResults: updateTreeResults,
        resetTreeResults,
        chickenResults,
        setChickenResults: updateChickenResults,
        resetChickenResults,
        resetAllResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  return useContext(ResultsContext);
}
