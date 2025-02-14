import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/experiment1">
        <button>Experiment 1</button>
      </Link>
      <Link to="/experiment2">
        <button>Experiment 2</button>
      </Link>
      <Link to="/experiment3">
        <button>Experiment 3</button>
      </Link>
    </div>
  );
}

export default Sidebar;
