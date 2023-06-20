import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import 'animate.css'
import Home from "./components/Home";
import GlobalStyles from "./styles/GlobalStyles";
import Gallery from "./components/Gallery/Gallery";
function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
