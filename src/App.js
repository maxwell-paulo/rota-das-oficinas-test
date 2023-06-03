
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RomanNumbers } from "./pages/RomanNumbers"
import { GameOfLife } from "./pages/GameOfLife"
import { BillDivider } from "./pages/BillDivider"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/numeros-romanos" element={<RomanNumbers />}/>
      <Route path="/jogo-da-vida" element={<GameOfLife />}/>
      <Route path="/conta" element={<BillDivider />}/>
    </Routes>
  );
}

export default App;
