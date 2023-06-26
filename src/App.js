import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "animate.css";
import Home from "./components/Home/Home";
import GlobalStyles from "./styles/GlobalStyles";
import ApodGallery from "./components/APOD/Gallery/ApodGallery";
import Asteroids from "./components/Asteroids/Asteroids";
import Navbar from "./components/Navbar/Navbar";
import APOD from "./components/APOD/APOD";
import Epic from "./components/EPIC/Epic";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalStyles />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/apod" element={<APOD />} />
        <Route exact path="/apodGallery" element={<ApodGallery />} />
        <Route exact path="/Asteroids" element={<Asteroids />} />
        <Route exact path="/epic" element={<Epic/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
