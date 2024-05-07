import "./App.css";
import { ApiSection } from "./components/ApiSection/ApiSection";
import { Header } from "./components/Header/Header";

function App() {
  let API_KEY = "b66d75e8f7862c194f0cbd7322865cc6";
  return (
    <>
      <Header></Header>
      <ApiSection></ApiSection>
    </>
  );
}

export default App;
