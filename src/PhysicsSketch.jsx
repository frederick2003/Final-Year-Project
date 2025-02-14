import React from "react";
import Sketch from "react-p5";

const DroppingBallSketch = () => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);
    p5.noStroke();
  };

  const draw = (p5) => {
    p5.background(135, 206, 235); // Sky blue

    // Draw the ground
    p5.fill(34, 139, 34); // Green grass
    p5.rect(0, p5.height * 0.95, p5.width, p5.height * 0.05);

    // Draw the cliff
    p5.fill(139, 69, 19); // Brown cliff
    p5.rect(p5.width * 0.6, p5.height * 0.5, p5.width * 0.4, p5.height * 0.5);

    // Draw the person
    p5.fill(255, 224, 189); // Skin color
    p5.ellipse(p5.width * 0.65, p5.height * 0.5 - 50, 30, 30); // Head

    p5.fill(0); // Black for body
    p5.rect(p5.width * 0.65 - 10, p5.height * 0.5 - 35, 20, 40); // Body

    // Arms reaching out to the ball
    p5.stroke(0);
    p5.line(
      p5.width * 0.65 - 10,
      p5.height * 0.5 - 25,
      p5.width * 0.6 + 10,
      p5.height * 0.5 - 35
    ); // Left arm reaching to ball
    p5.line(
      p5.width * 0.65 + 10,
      p5.height * 0.5 - 25,
      p5.width * 0.6 + 10,
      p5.height * 0.5 - 35
    ); // Right arm reaching to ball
    p5.noStroke();

    // Legs
    p5.line(
      p5.width * 0.65 - 10,
      p5.height * 0.5 + 5,
      p5.width * 0.64,
      p5.height * 0.5 + 25
    ); // Left leg
    p5.line(
      p5.width * 0.65 + 10,
      p5.height * 0.5 + 5,
      p5.width * 0.66,
      p5.height * 0.5 + 25
    ); // Right leg

    // Draw the cannonball
    p5.fill(50); // Dark gray cannonball
    p5.ellipse(p5.width * 0.57, p5.height * 0.5 - 35, 20, 20);

    // Draw height line and label
    p5.stroke(0);
    p5.line(p5.width * 0.4, p5.height * 0.5, p5.width * 0.4, p5.height); // Height line
    p5.noStroke();
    p5.fill(0);
    p5.textSize(16);
    p5.textAlign(p5.CENTER);
    p5.text("200 metres", p5.width * 0.4, p5.height * 0.5 - 5);

    // Draw left cliff
    p5.fill(139, 69, 19);
    p5.rect(0, p5.height * 0.5, p5.width * 0.2, p5.height * 0.6);

    // Draw the person
    p5.fill(255, 224, 189); // Skin color
    p5.ellipse(p5.width * 0.2 - 30, p5.height * 0.5 - 50, 30, 30); // Head

    p5.fill(0); // Black for body
    p5.rect(p5.width * 0.2 - 40, p5.height * 0.5 - 35, 20, 40); // Body

    // Arms holding the feather
    p5.stroke(0);
    p5.line(
      p5.width * 0.2 - 40,
      p5.height * 0.5 - 25,
      p5.width * 0.3 - 55,
      p5.height * 0.5 - 35
    ); // Left arm holding feather
    p5.line(
      p5.width * 0.2 + 20,
      p5.height * 0.5 - 25,
      p5.width * 0.3 - 55,
      p5.height * 0.5 - 35
    ); // Right arm holding feather
    p5.noStroke();

    // Legs
    p5.line(
      p5.width * 0.2 - 40,
      p5.height * 0.5 + 5,
      p5.width * 0.2 - 45,
      p5.height * 0.5 + 25
    ); // Left leg
    p5.line(
      p5.width * 0.2 + 20,
      p5.height * 0.5 + 5,
      p5.width * 0.2 + 15,
      p5.height * 0.5 + 25
    ); // Right leg

    // Draw the feather shape
    p5.noStroke(); // Disable stroke for the feather
    p5.fill(200, 200, 255); // Light blue for the feather
    p5.ellipse(p5.width * 0.3 - 55, p5.height * 0.5 - 35, 10, 20); // Feather shape
  };

  return (
    <div className="flex justify-center items-center">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default DroppingBallSketch;
