import React, { useState } from 'react';

const GridSize = 5;

const Grid = () => {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [robotOrientation, setRobotOrientation] = useState(0); // 0 = north, 1 = east, 2 = south, 3 = west

  const moveRobotForward = () => {
    let newX = robotPosition.x;
    let newY = robotPosition.y;

    switch (robotOrientation) {
      case 0: // north
        newY = Math.max(0, robotPosition.y - 1);
        break;
      case 1: // east
        newX = Math.min(GridSize - 1, robotPosition.x + 1);
        break;
      case 2: // south
        newY = Math.min(GridSize - 1, robotPosition.y + 1);
        break;
      case 3: // west
        newX = Math.max(0, robotPosition.x - 1);
        break;
    }

    setRobotPosition({ x: newX, y: newY });
  };

  const rotateRobotRight = () => {
    setRobotOrientation((prev) => (prev + 1) % 4);
  };

  const rotateRobotLeft = () => {
    setRobotOrientation((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <>
      <div
        id="grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GridSize}, 1fr)`,
          gridTemplateRows: `repeat(${GridSize}, 1fr)`,
          width: '500px',
          height: '500px',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        {Array.from({ length: GridSize * GridSize }, (_, index) => (
          <div
            key={index}
            className="grid-cell"
            style={{
              border: '1px solid #ccc',
            }}
          />
        ))}
        <div
          className="robot"
          style={{
            position: 'absolute',
            left: `${robotPosition.x * 100}px`,
            top: `${robotPosition.y * 100}px`,
            transform: `rotate(${robotOrientation * 90}deg)`,
          }}
        >
          🤖
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={moveRobotForward}>Move Forward</button>
        <button onClick={rotateRobotRight}>Rotate Right</button>
        <button onClick={rotateRobotLeft}>Rotate Left</button>
      </div>
    </>
  );
};

export default Grid;
