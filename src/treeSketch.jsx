import React from "react";
import Sketch from "react-p5";

function TreeSketch() {
  const drawBackground = (p5) => {
    // Draw sky gradient
    for (let i = 0; i < p5.height / 2; i++) {
      let inter = p5.map(i, 0, p5.height / 2, 0, 1);
      let colorTop = p5.lerpColor(
        p5.color(135, 206, 235),
        p5.color(173, 216, 230),
        inter
      );
      p5.stroke(colorTop);
      p5.line(0, i, p5.width, i);
    }

    // Draw ground
    p5.fill(144, 238, 144); // Light green color for grass
    p5.noStroke();
    p5.rect(0, p5.height / 2, p5.width, p5.height / 2);
  };
  const drawSun = (p5, x, y, radius) => {
    p5.fill(255, 204, 0);
    p5.ellipse(x, y, radius * 2, radius * 2);

    p5.stroke(255, 204, 0);
    p5.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      let angle = (p5.PI / 6) * i;
      let rayX = x + p5.cos(angle) * radius * 1.8;
      let rayY = y + p5.sin(angle) * radius * 1.8;
      p5.line(x, y, rayX, rayY);
    }
    p5.noStroke();
  };
  const drawTree = (p5, x, y, trunkWidth, trunkHeight) => {
    // Draw trunk
    p5.fill(139, 69, 19); // Brown color for trunk
    p5.rect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

    // Draw main branches
    p5.stroke(139, 69, 19);
    p5.strokeWeight(trunkWidth / 4);
    p5.line(x, y - trunkHeight / 2, x - 60, y - trunkHeight - 50); // Left branch
    p5.line(x, y - trunkHeight / 2, x + 60, y - trunkHeight - 50); // Right branch

    // Draw smaller branches
    p5.strokeWeight(trunkWidth / 8);
    p5.line(x - 60, y - trunkHeight - 50, x - 90, y - trunkHeight - 90); // Left small branch
    p5.line(x + 60, y - trunkHeight - 50, x + 90, y - trunkHeight - 90); // Right small branch

    // Draw canopy with multiple ellipses for a fuller look
    p5.noStroke();
    p5.fill(34, 139, 34); // Green color for canopy
    p5.ellipse(x, y - trunkHeight, trunkWidth * 3, trunkHeight); // Center canopy
    p5.ellipse(x - 50, y - trunkHeight + 20, trunkWidth * 2, trunkHeight * 0.8); // Left canopy
    p5.ellipse(x + 50, y - trunkHeight + 20, trunkWidth * 2, trunkHeight * 0.8); // Right canopy
    p5.ellipse(x, y - trunkHeight - 30, trunkWidth * 2.5, trunkHeight * 0.9); // Top canopy
  };

  const drawGrass = (p5) => {
    // Draw simple blades of grass at the bottom
    p5.stroke(0, 100, 0);
    p5.strokeWeight(2);
    for (let i = 0; i < p5.width; i += 10) {
      let grassHeight = p5.random(10, 30);
      p5.line(i, p5.height, i, p5.height - grassHeight);
    }
  };

  const drawCloud = (p5, x, y, size) => {
    p5.fill(255); // White color for clouds
    p5.noStroke();
    p5.ellipse(x, y, size, size / 2);
    p5.ellipse(x - size / 3, y, size / 1.5, size / 2);
    p5.ellipse(x + size / 3, y, size / 1.5, size / 2);
  };

  const drawClouds = (p5) => {
    // Draw clouds with multiple ellipses
    drawCloud(p5, 150, 100, 80);
    drawCloud(p5, 400, 130, 100);
    drawCloud(p5, 250, 70, 60);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    drawBackground(p5);
    drawSun(p5, 500, 100, 50);
    drawTree(p5, 300, 400, 40, 150);
    drawGrass(p5);
    drawClouds(p5);
  };

  const cleanup = (p5) => {
    p5.remove();
  };

  return <Sketch setup={setup} draw={draw} cleanup={cleanup} />;
}

export default TreeSketch;
