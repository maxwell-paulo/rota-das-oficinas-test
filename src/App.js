
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RomanNumbers } from "./pages/RomanNumbers"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/numeros-romanos" element={<RomanNumbers />}/>
    </Routes>
  );
}

export default App;
