import { FC, useState } from "react";
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
  const login = (email: string, password: string) => {
    authApi.login({ email, password }).catch((e) => setError(e));
  };
  const registration = (email: string, password: string, name: string) => {
    authApi.registration({ email, password, name }).catch((e) => setError(e));
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
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export default AuthPageContainer;
