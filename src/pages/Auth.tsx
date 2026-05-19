import { FC, useState } from "react";
import { useNotification } from "../components/UI/Toast";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { authApi } from "../api/auth";
import Card from "../components/UI/Card";
import styled from "styled-components";
import Button from "../components/UI/Button";

interface AuthPageProps {
  error: { code: string; message: string } | null;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string, name: string) => void;
  isLoginMode: boolean;
  changeAuthMethod: () => void;
}

const AuthPage: FC<AuthPageProps> = ({
  error,
  login,
  registration,
  isLoginMode,
  changeAuthMethod,
}) => {
  return (
    <AuthPageStyled className="auth-page">
      {error && (
        <div>
          <p>Error: {error.code}</p>
          <p>{error.message}</p>
        </div>
      )}
      <Card>
        <Button design="text" color="blue" onClick={changeAuthMethod}>
          {isLoginMode ? "Registration" : "Login"}
        </Button>
        {isLoginMode ? (
          <LoginForm login={login} />
        ) : (
          <RegistrationForm registration={registration} />
        )}
      </Card>
    </AuthPageStyled>
  );
};

const AuthPageContainer = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState<{ code: string; message: string } | null>(
    null
  );
  const { notify } = useNotification();

  const login = (email: string, password: string) => {
    authApi
      .login({ email, password })
      .then(() => {
        notify({
          type: "success",
          title: "Вход выполнен",
          message: "Добро пожаловать!",
        });
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        setError({ code: "LOGIN_FAILED", message });
        notify({
          type: "error",
          title: "Ошибка входа",
          message,
        });
      });
  };
  const registration = (email: string, password: string, name: string) => {
    authApi
      .registration({ email, password, name })
      .then(() => {
        notify({
          type: "success",
          title: "Регистрация успешна",
          message: "Пользователь создан.",
        });
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        setError({ code: "REGISTRATION_FAILED", message });
        notify({
          type: "error",
          title: "Ошибка регистрации",
          message,
        });
      });
  };
  const changeAuthMethod = () => {
    setIsLoginMode((l) => !l);
  };
  return (
    <AuthPage
      error={error}
      isLoginMode={isLoginMode}
      login={login}
      registration={registration}
      changeAuthMethod={changeAuthMethod}
    />
  );
};

const AuthPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 140px);
  padding: 20px 20px 0;

  > section,
  > div,
  > div > div {
    width: min(480px, 100%);
  }
`;

export default AuthPageContainer;
