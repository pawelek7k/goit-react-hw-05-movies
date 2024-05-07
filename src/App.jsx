import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ApiMovieSection } from "./components/ApiMovieSection/ApiMovieSection";
import { ApiSection } from "./components/ApiSection/ApiSection";
import { Header } from "./components/HeaderComp/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ApiSection />} />
        <Route path="/movies" element={<ApiMovieSection />} />
      </Routes>
    </Router>
  );
}

export default App;
