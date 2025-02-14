import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sketch from "react-p5";

const ChickenExperiment = () => {
  const [groups, setGroups] = useState([]);
  const [groupCount, setGroupCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [eggCounts, setEggCounts] = useState([]);
  const [coins, setCoins] = useState(100);
  const Navigate = useNavigate();
  const groupCost = 5;

  class Hen {
    constructor(x, y, group) {
      this.x = x;
      this.y = y;
      this.group = group;
    }

    display(p5) {
      // Body
      p5.fill(255, 255, 150);
      p5.ellipse(this.x, this.y, 30, 20);

      // Head
      p5.ellipse(this.x + 10, this.y - 10, 15, 15);

      // Beak
      p5.fill(255, 165, 0);
      p5.triangle(
        this.x + 15,
        this.y - 10,
        this.x + 12,
        this.y - 5,
        this.x + 17,
        this.y - 5
      );

      // Eye
      p5.fill(0);
      p5.ellipse(this.x + 8, this.y - 12, 3, 3);

      // Comb
      p5.fill(255, 0, 0);
      p5.ellipse(this.x + 7, this.y - 16, 4, 4);
      p5.ellipse(this.x + 11, this.y - 17, 4, 4);

      // Legs
      p5.stroke(255, 165, 0);
      p5.strokeWeight(1.5);
      p5.line(this.x - 5, this.y + 10, this.x - 5, this.y + 15);
      p5.line(this.x + 5, this.y + 10, this.x + 5, this.y + 15);

      p5.noStroke();
    }

    display_different(p5) {
      // Body
      p5.fill(255, 127, 127);
      p5.ellipse(this.x, this.y, 30, 20);

      // Head
      p5.ellipse(this.x + 10, this.y - 10, 15, 15);

      // Beak
      p5.fill(255, 165, 0);
      p5.triangle(
        this.x + 15,
        this.y - 10,
        this.x + 12,
        this.y - 5,
        this.x + 17,
        this.y - 5
      );

      // Eye
      p5.fill(0);
      p5.ellipse(this.x + 8, this.y - 12, 3, 3);

      // Comb
      p5.fill(255, 0, 0);
      p5.ellipse(this.x + 7, this.y - 16, 4, 4);
      p5.ellipse(this.x + 11, this.y - 17, 4, 4);

      // Legs
      p5.stroke(255, 165, 0);
      p5.strokeWeight(1.5);
      p5.line(this.x - 5, this.y + 10, this.x - 5, this.y + 15);
      p5.line(this.x + 5, this.y + 10, this.x + 5, this.y + 15);

      p5.noStroke();
    }

    layEgg(p5) {
      return p5.random(1) < 0.02;
    }
  }

  const setupGroups = (count) => {
    const newGroups = [];
    for (let i = 0; i < count; i++) {
      newGroups.push({
        withMusic: new Hen(150 + i * 120, 250, "music"),
        withoutMusic: new Hen(150 + i * 120, 350, "noMusic"),
        eggsWithMusic: 0,
        eggsWithoutMusic: 0,
      });
    }
    setGroups(newGroups);
    setEggCounts([]);
  };

  const handleGroupCountChange = (e) => {
    const proposedGroupCount = parseInt(e.target.value);
    const totalCost = proposedGroupCount * groupCost;

    if (totalCost > coins) {
      alert(
        `Not enough coins! Running ${proposedGroupCount} groups costs ${totalCost} coins, but you only have ${coins} coins. Please enter a smaller number.`
      );
      e.target.value = "";
    } else {
      setGroupCount(proposedGroupCount);
      setupGroups(proposedGroupCount);
      setCoins(coins - totalCost);
    }
  };

  const calculateResults = () => {
    setEggCounts(
      groups.map((group) => ({
        eggsWithMusic: group.eggsWithMusic,
        eggsWithoutMusic: group.eggsWithoutMusic,
      }))
    );
  };

  const runExperiment = (p5) => {
    p5.textSize(18);
    p5.fill(0);
    p5.text("Input number of groups below", 20, 30);

    const updatedGroups = [...groups];
    for (let group of updatedGroups) {
      if (group.withMusic.layEgg(p5)) group.eggsWithMusic++;
      if (group.withoutMusic.layEgg(p5)) group.eggsWithoutMusic++;

      group.withMusic.display(p5);
      group.withoutMusic.display_different(p5);
    }
    setGroups(updatedGroups);
  };

  const displayResults = (p5) => {
    p5.background(220);
    p5.textSize(20);
    p5.text("Results of Egg Laying with and without Classical Music", 250, 30);

    const barWidth = 50;
    const spacing = 80;
    const maxEggs =
      Math.max(
        ...eggCounts.map((count) =>
          Math.max(count.eggsWithMusic, count.eggsWithoutMusic)
        )
      ) + 1;

    eggCounts.forEach((count, i) => {
      const withMusicHeight = p5.map(count.eggsWithMusic, 0, maxEggs, 0, 200);
      const withoutMusicHeight = p5.map(
        count.eggsWithoutMusic,
        0,
        maxEggs,
        0,
        200
      );
      const xPos = 100 + i * (2 * barWidth + spacing);

      // With music bar
      p5.fill(100, 200, 100);
      p5.rect(
        xPos,
        p5.height - 50 - withMusicHeight,
        barWidth,
        withMusicHeight
      );
      p5.textSize(12);
      p5.fill(0);
      p5.text("Music", xPos + 20, p5.height - 55 - withMusicHeight);

      p5.fill(0);
      p5.textSize(14);
      p5.text(count.eggsWithMusic, xPos + barWidth / 2, p5.height - 38);

      // Without music bar
      p5.fill(200, 100, 100);
      p5.rect(
        xPos + barWidth + 10,
        p5.height - 50 - withoutMusicHeight,
        barWidth,
        withoutMusicHeight
      );
      p5.fill(0);
      p5.text(
        "No Music",
        xPos + barWidth + 35,
        p5.height - 55 - withoutMusicHeight
      );

      p5.fill(0);
      p5.text(count.eggsWithoutMusic, xPos + barWidth + 35, p5.height - 38);

      p5.textSize(14);
      p5.textAlign(p5.CENTER);
      p5.text(`Group ${i + 1}`, xPos + barWidth / 2 + 5, p5.height - 20);
      p5.textAlign(p5.LEFT);
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1000, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);

    p5.textSize(18);
    p5.fill(0);
    p5.text(`Coins Remaining: ${coins}`, 20, 15);

    if (showResults) {
      displayResults(p5);
    } else {
      runExperiment(p5);
    }
  };

  const handleShowResults = () => {
    calculateResults();
    setShowResults(true);
    Navigate("/ChickenResultsPage", { state: { experimentData: eggCounts } });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Sketch setup={setup} draw={draw} />

      <div className="flex flex-col gap-2">
        <label className="text-lg">
          Enter the number of groups to monitor:
          <input
            type="number"
            onChange={handleGroupCountChange}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
      </div>
      <button
        onClick={handleShowResults}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Results
      </button>
    </div>
  );
};

export default ChickenExperiment;
