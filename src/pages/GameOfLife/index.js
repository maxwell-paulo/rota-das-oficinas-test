import { useState, useEffect } from "react"

export function GameOfLife() {

  const [grid, setGrid] = useState(generateEmptyGrid())
  const [running, setRunning] = useState(false)

  function generateEmptyGrid() {
    const rows = []
    for (let i = 0; i < 10; i++) {
      rows.push(Array.from(Array(10), () => 0))
    }
    return rows
  }

  useEffect(() => {
    const newGrid = generateEmptyGrid()
    newGrid[3][3] = 1;
    newGrid[3][4] = 1;
    newGrid[3][5] = 1;
    newGrid[4][2] = 1;
    newGrid[5][2] = 1;
    newGrid[6][2] = 1;
    newGrid[7][3] = 1;
    newGrid[7][4] = 1;
    newGrid[7][5] = 1;
    newGrid[4][6] = 1;
    newGrid[5][6] = 1;
    newGrid[6][6] = 1;
    setGrid(newGrid)
  }, [])

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setGrid((prevGrid) => {
          return getNextGeneration(prevGrid);
        });
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [running]);

  function getNextGeneration(currGrid) {
    const newGrid = generateEmptyGrid()

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const neighbors = countNeighbors(currGrid, i, j);
        if (currGrid[i][j] === 1) {
          if (neighbors === 2 || neighbors === 3) {
            newGrid[i][j] = 1;
          } else {
            newGrid[i][j] = 0;
          }
        } else {
          if (neighbors === 3) {
            newGrid[i][j] = 1;
          } else {
            newGrid[i][j] = 0;
          }
        }
      }
    }
    return newGrid;
  }

  function countNeighbors(currGrid, row, col) {
    let count = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < 10 &&
        newCol >= 0 &&
        newCol < 10 &&
        currGrid[newRow][newCol] === 1
      ) {
        count++;
      }
    }
    return count;
  }

  function handleCellClick(i, j) {
    if (!running) {
      const newGrid = [...grid];
      newGrid[i][j] = grid[i][j] ? 0 : 1;
      setGrid(newGrid);
    }
  }

  function handleStart() {
    setRunning(true);
  }

  function handleStop() {
    setRunning(false)
  }

  function handleReset() {
    setGrid(generateEmptyGrid())
    setRunning(false)
  }

  return(
    <div>
       <h1>Jogo da Vida de Conway</h1>
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${10}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              className="cell"
              onClick={() => handleCellClick(i, j)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? '#000000' : '#ffffff',
                border: 'solid 1px #cccccc',
              }}
            ></div>
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={handleStart} disabled={running}>Iniciar</button>
        <button onClick={handleStop} disabled={!running}>Parar</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )

}
