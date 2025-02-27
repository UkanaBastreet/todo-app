import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
