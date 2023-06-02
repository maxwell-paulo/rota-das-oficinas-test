
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RomanNumbers } from "./pages/RomanNumbers"
import { GameOfLife } from "./pages/GameOfLife"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/numeros-romanos" element={<RomanNumbers />}/>
      <Route path="/game-of-life" element={< GameOfLife/>}/>
    </Routes>
  );
}

export default App;
