
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RomanNumbers } from "./pages/RomanNumbers"
import { GameOfLife } from "./pages/GameOfLife"
import { BillDivider } from "./pages/BillDivider"
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/numeros-romanos" element={<RomanNumbers />}/>
      <Route path="/jogo-da-vida" element={<GameOfLife />}/>
      <Route path="/conta" element={<BillDivider />}/>
    </Routes>
    </div>
  );
}

export default App;
