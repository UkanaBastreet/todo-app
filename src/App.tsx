import "./App.css";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import { useEffect, useState } from "react";
import { authApi } from "./api/auth";
import Spinner from "./components/Spinner";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    authApi.onAuthChanges((user) => {
      setIsAuth(user !== null);
      setFetching(false);
    });
  }, []);
  return (
    <div className="App">
      {fetching ? <Spinner /> : isAuth ? <HomePage /> : <AuthPage />}
    </div>
  );
}

export default App;
