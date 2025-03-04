import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import { useEffect, useState } from "react";
import { authApi } from "./api/auth";
import Spinner from "./components/UI/Spinner";
import styled from "styled-components";

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
    <StyledApp className="App">
      {fetching ? <Spinner /> : isAuth ? <HomePage /> : <AuthPage />}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

export default App;
