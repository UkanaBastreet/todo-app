import AuthPage from "./pages/Auth";
import TasksPage from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import PublicWallPage from "./pages/PublicWall";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/Users";
import { useEffect, useState } from "react";
import { authApi } from "./api/auth";
import Spinner from "./components/UI/Spinner";
import styled from "styled-components";
import { Routes, Route, Navigate, NavLink, Link } from "react-router-dom";
import Button from "./components/UI/Button";
import { NotificationProvider } from "./components/UI/Toast";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
      document.documentElement.dataset.theme = storedTheme;
    }
    setFetching(true);
    authApi.onAuthChanges((user) => {
      setIsAuth(user !== null);
      setFetching(false);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <StyledApp className="App">
      <NotificationProvider>
        {fetching ? (
          <Spinner />
        ) : (
          <>
            <AppHeader>
              <Brand to="/">TodoWall</Brand>
              {isAuth && (
                <HeaderNav>
                  <NavItem to="/profile">Профиль</NavItem>
                  <NavItem to="/tasks">Задачи</NavItem>
                  <NavItem to="/wall">Стена</NavItem>
                  <NavItem to="/users">Пользователи</NavItem>
                  <NavItem to="/settings">Настройки</NavItem>
                </HeaderNav>
              )}
              <Button design="outline" color="gray" onClick={toggleTheme}>
                {theme === "light" ? "Темная" : "Светлая"}
              </Button>
              {isAuth ? (
                <Button color="red" design="outline" onClick={() => authApi.logout()}>
                  Выйти
                </Button>
              ) : (
                <Link to="/auth">
                  <Button design="outline" color="blue">
                    Войти
                  </Button>
                </Link>
              )}
            </AppHeader>
            <Content>
              <Routes>
                <Route
                  path="/auth"
                  element={isAuth ? <Navigate to="/tasks" replace /> : <AuthPage />}
                />
                <Route
                  path="/tasks"
                  element={isAuth ? <TasksPage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/profile"
                  element={isAuth ? <ProfilePage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/wall"
                  element={isAuth ? <PublicWallPage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/users"
                  element={isAuth ? <UsersPage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/settings"
                  element={isAuth ? <SettingsPage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/"
                  element={<Navigate to={isAuth ? "/tasks" : "/auth"} replace />}
                />
                <Route
                  path="*"
                  element={<Navigate to={isAuth ? "/tasks" : "/auth"} replace />}
                />
              </Routes>
            </Content>
          </>
        )}
      </NotificationProvider>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  color: var(--text-color);
  min-height: 100vh;
  width: 100%;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const AppHeader = styled.header`
  width: min(1120px, 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  padding: 16px 20px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(18px);
`;

const Brand = styled(Link)`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--text-color);
  text-decoration: none;
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavItem = styled(NavLink)`
  padding: 10px 18px;
  border-radius: 14px;
  color: var(--text-muted);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;

  &.active {
    color: var(--text-color);
    background: rgba(79, 140, 255, 0.12);
  }

  &:hover {
    color: var(--text-color);
  }
`;

const Content = styled.main`
  width: min(1120px, 100%);
`;

export default App;
