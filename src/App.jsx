import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ApiMovieSection } from "./components/ApiMovieSection/ApiMovieSection";
import { ApiSection } from "./components/ApiSection/ApiSection";
import { Header } from "./components/HeaderComp/Header";
import { MovieDetails } from "./components/MovieDetailsDetails/MovieDetails";

function App() {
  const API_KEY = "b66d75e8f7862c194f0cbd7322865cc6";
  return (
    <Router basename="/goit-react-hw-05-movies">
      {/* basename="/goit-react-hw-05-movies" */}
      <Header />
      <Routes>
        <Route path="/" element={<ApiSection apiKey={API_KEY} />} />
        <Route path="/movies" element={<ApiMovieSection apiKey={API_KEY} />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails apiKey={API_KEY} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
