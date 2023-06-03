import { useState, useEffect } from "react"
import style from "./style.module.css";

export function GameOfLife() {

  const [grid, setGrid] = useState(generateEmptyGrid()) // Estado para armazenar o grid
  const [running, setRunning] = useState(false) // Estado para controlar a simulação

  // Função para gerar um grid vazio
  function generateEmptyGrid() {
    const rows = []
    for (let i = 0; i < 10; i++) {
      rows.push(Array.from(Array(10), () => 0))
    }
    return rows
  }

  // Efeito para definir o estado inicial do grid
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

  // Efeito para controlar a simulação do Jogo da Vida
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setGrid((prevGrid) => {
          const nextGrid = getNextGeneration(prevGrid); // Obter a próxima geração do grid
        if (isGridEmpty(nextGrid)) {
          setRunning(false); // Parar a simulação se o grid estiver vazio
        }
        return nextGrid;
        });
        console.log(grid)
      }, 500);

      return () => {
        clearInterval(interval); // Limpar o intervalo quando o componente é desmontado ou quando running muda
      };
    }
  }, [running]);

  // Função para verificar se o grid está vazio
  function isGridEmpty(grid) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (grid[i][j] === 1) {
          return false;
        }
      }
    }
    return true;
  }

  // Função para obter a próxima geração do grid
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

  // Função para contar o número de vizinhos vivos de uma célula
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

    // Percorre todas as direções para verificar os vizinhos
    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const newRow = row + dx; // Coordenada da linha do vizinho
      const newCol = col + dy; // Coordenada da coluna do vizinho

      // Verifica se as coordenadas estão dentro dos limites do grid
    // e se o vizinho está vivo (valor igual a 1)
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

  // Função para contar o número de vizinhos vivos de uma célula
  function handleCellClick(i, j) {
    if (!running) {
      const newGrid = [...grid];
      newGrid[i][j] = grid[i][j] ? 0 : 1;
      setGrid(newGrid);
    }
  }

  // Função para iniciar a simulação
  function handleStart() {
    setRunning(true);
  }

  // Função para parar a simulação
  function handleStop() {
    setRunning(false)
  }

  // Função para resetar o grid
  function handleReset() {
    setGrid(generateEmptyGrid())
    setRunning(false)
  }

  return (
    <div>

      <div className={style.container}>
      <h1 className={style.title}>Jogo da Vida de Conway</h1>
      <div className={style.grid}>
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              className={style.cell}
              onClick={() => handleCellClick(i, j)}
              style={{
                backgroundColor: grid[i][j] ? "#4b7fbb" : "#ffffff",
              }}
            ></div>
          ))
        )}
      </div>
      <div className={style.controls}>
        <button onClick={handleStart} disabled={running} className={style.button}>
          Iniciar
        </button>
        <button onClick={handleStop} disabled={!running} className={style.button}>
          Parar
        </button>
        <button onClick={handleReset} className={style.button}>Reset</button>
      </div>
      </div>
    </div>
  );

}
