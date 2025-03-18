import React, { useEffect, useState, useRef } from "react";
import Sketch from "react-p5";

function TreeSketch({
  position = "left",
  environmentalFactors = {},
  numberOfTrees = 1,
  hasStarted = false,
  yearsPassed = 0,
}) {
  // Animation states
  const [raindrops, setRaindrops] = useState([]);
  const [sunIntensity, setSunIntensity] = useState(1);
  const [windStrength, setWindStrength] = useState(0);
  const [trees, setTrees] = useState([]);
  const [growthStage, setGrowthStage] = useState(0);

  // Use refs for animation values to avoid re-renders
  const raindropRef = useRef([]);
  const currentEventRef = useRef("None");

  // Growth stage effect remains the same
  useEffect(() => {
    if (yearsPassed <= 0) {
      setGrowthStage(0); // Initial stage
    } else if (yearsPassed <= 2) {
      setGrowthStage(0.2); // Early growth
    } else if (yearsPassed <= 5) {
      setGrowthStage(0.5); // Mid growth
    } else if (yearsPassed <= 8) {
      setGrowthStage(0.8); // Late growth
    } else {
      setGrowthStage(1); // Mature
    }
  }, [yearsPassed]);

  // Initialize trees with depth effect for 400x400 canvas
  useEffect(() => {
    const newTrees = [];
    // Center of 400px canvas is now at 200px
    const centerX = 200;

    // Calculate number of rows based on tree count
    // For 1-3 trees: 1 row, 4-6 trees: 2 rows, 7-8 trees: 3 rows
    const maxTreesPerRow = 3;
    const numRows = Math.ceil(numberOfTrees / maxTreesPerRow);

    // Distribute trees across rows
    let treeIndex = 0;

    for (let row = 0; row < numRows; row++) {
      // Determine how many trees go in this row
      const treesInThisRow = Math.min(
        maxTreesPerRow,
        numberOfTrees - treeIndex
      );

      // Calculate horizontal spacing for this row
      const rowWidth = 300;
      const spacing = treesInThisRow <= 1 ? 0 : rowWidth / (treesInThisRow - 1);

      // Calculate row depth position (further back = higher in canvas)
      // First row is closest to viewer (bottom), last row furthest
      const rowDepthY = 350 - row * 50;

      // Scale factor makes trees in back appear smaller
      const depthScale = 1 - row * 0.15;

      // Start x-position for trees in this row
      const rowStartX = centerX - rowWidth / 2;

      for (let i = 0; i < treesInThisRow; i++) {
        // Add slight randomization to position for natural look
        const xOffset = treesInThisRow === 1 ? 0 : i * spacing;
        const randomOffset = Math.random() * 10 - 5;

        newTrees.push({
          x: rowStartX + xOffset + randomOffset,
          y: rowDepthY + (Math.random() * 10 - 5), // Small random vertical variation
          depth: row, // Store depth for drawing order
          height: (1.0 + Math.random() * 0.5) * depthScale, // Scale height by depth
          width: (20 + Math.random() * 10) * depthScale, // Scale width by depth
          angle: Math.random() * 0.1 - 0.05, // Slight random lean
          health: 1.0,
          age: 1 + Math.floor(Math.random() * 3),
        });

        treeIndex++;
        if (treeIndex >= numberOfTrees) break;
      }
    }

    // Sort trees by depth so farther trees are drawn first (painter's algorithm)
    newTrees.sort((a, b) => b.depth - a.depth);

    console.log(
      `TreeSketch ${position} initialized ${numberOfTrees} trees with depth effect`
    );

    setTrees(newTrees);
  }, [numberOfTrees, position]);

  // Environment effects update
  useEffect(() => {
    currentEventRef.current = environmentalFactors.event || "None";

    if (environmentalFactors.water > 70) {
      // Create rain effect across full 400px canvas
      const newRaindrops = Array(25)
        .fill()
        .map(() => ({
          x: Math.random() * 400,
          y: Math.random() * 200,
          speed: Math.random() * 5 + 5,
          length: Math.random() * 10 + 5,
        }));
      setRaindrops(newRaindrops);
      raindropRef.current = newRaindrops;
    } else {
      setRaindrops([]);
      raindropRef.current = [];
    }

    setSunIntensity(environmentalFactors.light / 24 || 0.5);

    if (environmentalFactors.wind === "high") {
      setWindStrength(0.2);
    } else if (environmentalFactors.wind === "moderate") {
      setWindStrength(0.1);
    } else {
      setWindStrength(0);
    }
  }, [environmentalFactors, position]);

  // Updated setup for 400x400 canvas
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  // Background now extends to 400x400
  const drawBackground = (p5) => {
    // Dynamic sky color based on light levels
    const skyBrightness = 135 + sunIntensity * 40;

    // Sky gradient - now covers full 400px height
    for (let i = 0; i < p5.height / 2; i++) {
      let inter = p5.map(i, 0, p5.height / 2, 0, 1);
      let colorTop = p5.lerpColor(
        p5.color(skyBrightness, 206, 235),
        p5.color(skyBrightness + 30, 216, 230),
        inter
      );
      p5.stroke(colorTop);
      p5.line(0, i, p5.width, i);
    }

    // Add distant hills for depth
    drawDistantHills(p5);

    // Draw ground - color varies with water availability
    const soilMoisture = environmentalFactors.water || 50;
    const greenValue =
      soilMoisture > 50 ? 238 : Math.max(180, 238 - (50 - soilMoisture) * 2);
    p5.fill(144, greenValue, 144);
    p5.noStroke();
    p5.rect(0, p5.height / 2, p5.width, p5.height / 2);
  };

  // New function to draw distant hills
  const drawDistantHills = (p5) => {
    // First hill (distant)
    p5.fill(100, 155, 100, 150);
    p5.beginShape();
    p5.vertex(0, 200);
    for (let x = 0; x <= p5.width; x += 50) {
      const hillHeight = 20 + Math.sin(x / 30) * 15;
      p5.vertex(x, 200 - hillHeight);
    }
    p5.vertex(p5.width, 200);
    p5.endShape(p5.CLOSE);

    // Second hill (middle distance)
    p5.fill(120, 165, 120, 180);
    p5.beginShape();
    p5.vertex(0, 220);
    for (let x = 0; x <= p5.width; x += 40) {
      const hillHeight = 30 + Math.cos(x / 40) * 20;
      p5.vertex(x, 220 - hillHeight);
    }
    p5.vertex(p5.width, 220);
    p5.endShape(p5.CLOSE);
  };

  // Sun position adjusted for 400px width
  const drawSun = (p5, x, y, intensity) => {
    // Sun color changes with intensity
    const radius = 30 + intensity * 10;
    p5.fill(255, 204 + intensity * 50, 0, 200 + intensity * 55);
    p5.ellipse(x, y, radius * 2, radius * 2);

    // Sun rays
    p5.stroke(255, 204 + intensity * 50, 0, 150 + intensity * 100);
    p5.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      const rayLength = radius * (1.5 + intensity * 0.5);
      const wobble = hasStarted ? Math.sin(p5.frameCount * 0.05 + i) * 5 : 0;
      let angle = (p5.PI / 6) * i;
      let rayX = x + p5.cos(angle) * (rayLength + wobble);
      let rayY = y + p5.sin(angle) * (rayLength + wobble);
      p5.line(x, y, rayX, rayY);
    }
    p5.noStroke();
  };

  // Update drawTree for depth effect
  const drawTree = (p5, tree, windEffect) => {
    const { x, y, height, width, angle, health, age, depth } = tree;

    // Calculate growth factor based on stage and health
    const growthFactor = 0.5 + growthStage * 1.5;

    // Tree dimensions based on depth and growth
    const trunkHeight = 50 + height * 20 * growthFactor;
    const trunkWidth = (width / 2) * growthFactor;

    // Apply wind sway if tree is alive
    const windSway = windEffect * Math.sin(p5.frameCount * 0.05) * 10;
    // Less wind effect on deeper/distant trees
    const depthWindFactor = 1 - depth * 0.25;
    const adjustedWindSway = windSway * depthWindFactor;

    // Draw trunk with slight lean and wind effect
    p5.push();
    p5.translate(x, y);
    p5.rotate(angle + adjustedWindSway / 100);

    // Trunk color varies with health
    const brownR = 139 - (1 - health) * 30;
    const brownG = 69 - (1 - health) * 30;
    p5.fill(brownR, brownG, 19);
    p5.rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight);

    // Canopy - color varies with health and growth
    p5.noStroke();
    const leafHealth = Math.max(0, health);
    p5.fill(34 + (1 - leafHealth) * 60, 139 * leafHealth, 34 * leafHealth);

    // Canopy size increases with growth and sways with wind
    const canopySize = 25 * growthFactor;
    const sway = adjustedWindSway / 3;

    // Multiple overlapping ellipses for fuller look
    p5.ellipse(0 + sway / 2, -trunkHeight, canopySize * 2.5, canopySize * 2);
    p5.ellipse(
      -canopySize / 2 + sway / 3,
      -trunkHeight + 10,
      canopySize * 2,
      canopySize * 1.6
    );
    p5.ellipse(
      canopySize / 2 + sway / 3,
      -trunkHeight + 10,
      canopySize * 2,
      canopySize * 1.6
    );
    p5.ellipse(
      0 + sway / 4,
      -trunkHeight - 20,
      canopySize * 2,
      canopySize * 1.5
    );

    // Draw age indicator - smaller for distant trees
    p5.fill(255);
    const textSize = 12 - depth * 2;
    p5.textSize(textSize);

    p5.pop();
  };

  // Adjust cloud positions for 400px width
  const drawClouds = (p5) => {
    p5.fill(255, 255, 255, 200);

    // Make clouds move slightly with the wind
    const cloudOffset = windStrength * Math.sin(p5.frameCount * 0.02) * 10;

    // Clouds distributed across 400px width
    const cloudPositions = [
      { x: 100, y: 90, size: 1.0 },
      { x: 200, y: 60, size: 1.2 },
      { x: 300, y: 110, size: 0.9 },
    ];

    cloudPositions.forEach((cloud) => {
      const adjustedX = cloud.x + cloudOffset * cloud.size;
      const size = cloud.size;

      p5.ellipse(adjustedX - 50 * size, cloud.y, 60 * size, 40 * size);
      p5.ellipse(adjustedX - 70 * size, cloud.y, 40 * size, 30 * size);
      p5.ellipse(adjustedX - 30 * size, cloud.y, 40 * size, 30 * size);
    });
  };

  const drawRain = (p5, drops) => {
    p5.stroke(120, 180, 255, 200);

    drops.forEach((drop) => {
      p5.strokeWeight(1.5);
      p5.line(drop.x, drop.y, drop.x, drop.y + drop.length);
    });

    p5.noStroke();
  };

  const updateRaindrops = (p5) => {
    return raindropRef.current.map((drop) => {
      drop.y += drop.speed;
      if (drop.y > p5.height / 2) {
        drop.y = Math.random() * 100;
        drop.x = Math.random() * p5.width;
      }
      return drop;
    });
  };

  const draw = (p5) => {
    p5.clear();
    drawBackground(p5);

    // Position sun based on new canvas size
    const centerX = p5.width / 2;
    drawSun(p5, centerX, 100, sunIntensity);

    // Draw clouds
    drawClouds(p5);

    // Draw all trees
    trees.forEach((tree) => {
      drawTree(p5, tree, windStrength);
    });

    // Draw and update rain if present
    if (raindropRef.current.length > 0) {
      const updatedRaindrops = updateRaindrops(p5);
      raindropRef.current = updatedRaindrops;
      drawRain(p5, updatedRaindrops);
    }

    // Add event indicators
    if (hasStarted && currentEventRef.current !== "None") {
      if (currentEventRef.current === "Drought") {
        p5.fill(255, 150, 0);
        p5.textSize(24);
        p5.textAlign(p5.CENTER);
        p5.text("DROUGHT!", p5.width / 2, 50);
      } else if (currentEventRef.current === "Storm") {
        p5.fill(100, 100, 255);
        p5.textSize(24);
        p5.textAlign(p5.CENTER);
        p5.text("STORM!", p5.width / 2, 50);
      } else if (currentEventRef.current === "Disease") {
        p5.fill(150, 255, 0);
        p5.textSize(24);
        p5.textAlign(p5.CENTER);
        p5.text("DISEASE!", p5.width / 2, 50);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default TreeSketch;
