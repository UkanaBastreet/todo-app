import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import { useEffect } from "react";
import { authApi } from "./api/auth";

function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   authApi.onAuthChanges((user) => {
  //     if (user) {
  //       navigate("/");
  //     } else {
  //       navigate("/auth");
  //     }
  //   });
  // }, [navigate]);
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
