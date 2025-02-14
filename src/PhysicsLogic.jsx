import Sketch from "react-p5";
import React, { useState } from "react";

class FallingObject {
  constructor(
    mass,
    area,
    dragCoefficient,
    airDensity,
    gravitational_acceleration
  ) {
    this.mass = mass;
    this.area = area;
    this.dragCoefficient = dragCoefficient;
    this.airDensity = airDensity;
    this.gravitational_acceleration = gravitational_acceleration;
    this.terminalVelocity = this.calculate_terminal_velocity();
  }
  calculate_terminal_velocity() {
    return Math.sqrt(
      (2 * this.mass * this.gravitational_acceleration) /
        (this.airDensity * this.dragCoefficient * this.area)
    );
  }

  calculateFallTime(height) {
    const terminal_velocity = this.terminalVelocity;
    const time_to_terminal_velocity =
      (terminal_velocity * this.mass) /
      (this.gravitational_acceleration * this.mass);
    const distance_to_terminal_velocity =
      (1 / 2) * terminal_velocity * time_to_terminal_velocity;

    let fallTime;
    if (height <= distance_to_terminal_velocity) {
      fallTime = Math.sqrt((2 * height) / this.gravitational_acceleration);
    } else {
      const remainingDistance = height - distance_to_terminal_velocity;
      const timeAtTerminal = remainingDistance / terminal_velocity;
      fallTime = time_to_terminal_velocity + timeAtTerminal;
    }

    const variation = (Math.random() * 0.04 - 0.02) * fallTime;
    return fallTime + variation;
  }
}

const PhysicsLogic = () => {
  const [coins, setCoins] = useState(50);
  const [results, setResults] = useState([]);
  const cost_of_experiment = 5;

  const runFeatherSimulation = () => {
    if (coins < cost_of_experiment) {
      alert("Not enough coins!");
      return;
    }
    const feather = new FallingObject(0.002, 0.01, 1.2, 1.225, 9.8);
    const fallTime = feather.calculateFallTime(200);

    setResults((prev) => [
      ...prev,
      {
        objectName: "Feather",
        height: 200,
        fallTime: fallTime,
      },
    ]);

    setCoins((prev) => prev - cost_of_experiment);
  };

  const runCanonBallSimulation = () => {
    if (coins < cost_of_experiment) {
      alert("Not enough coins!");
      return;
    }

    const canonBall = new FallingObject(6, 0.0314, 0.47, 1.225, 9.8);
    const fallTime = canonBall.calculateFallTime(200);

    setResults((prev) => [
      ...prev,
      {
        objectName: "Cannonball",
        height: 200,
        fallTime: fallTime,
      },
    ]);

    setCoins((prev) => prev - cost_of_experiment);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">Physics Model</h1>

      <div className="text-2xl text-teal-600 mb-4">Coins: {coins}</div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={runFeatherSimulation}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Feather Simulation
        </button>
        <button
          onClick={runCanonBallSimulation}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Cannonball Simulation
        </button>
      </div>

      <div className="w-full max-w-4xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 bg-gray-100">Object</th>
              <th className="border p-3 bg-gray-100">Height (meters)</th>
              <th className="border p-3 bg-gray-100">Fall Time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className="border p-3">{result.objectName}</td>
                <td className="border p-3">{result.height}</td>
                <td className="border p-3">{result.fallTime.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicsLogic;
