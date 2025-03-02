import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { authApi } from "../api/auth";
import Card from "../components/Card";

const AuthPage = () => {
  const [isLogining, setIsLogining] = useState(true);
  const [error, setError] = useState<{ code: string; message: string } | null>(
    null
  );
  const login = (email: string, password: string) => {
    authApi
      .login({ email, password })
      .then(console.log)
      .catch((e) => setError(e));
  };
  const registration = (email: string, password: string, name: string) => {
    authApi
      .registration({ email, password, name })
      .then(console.log)
      .catch((e) => setError(e));
  };
  return (
    <div className="auth-page">
      {error && (
        <div>
          <p>Error: {error.code}</p>
          <p>{error.message}</p>
        </div>
      )}
      <Card>
        <a href="/auth#" onClick={() => setIsLogining((l) => !l)}>
          {isLogining ? "Registration" : "Login"}
        </a>
        {isLogining ? (
          <LoginForm login={login} />
        ) : (
          <RegistrationForm registration={registration} />
        )}
      </Card>
    </div>
  );
};
export default AuthPage;
