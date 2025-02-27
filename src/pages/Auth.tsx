import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { authApi } from "../api/auth";

const AuthPage = () => {
  const [isLogining, setIsLogining] = useState(true);
  const login = (email: string, password: string) => {
    authApi.login({ email, password });
  };
  const registration = (email: string, password: string) => {
    authApi.registration({ email, password });
  };
  return (
    <div className="auth-page">
      <h1>Auth Page</h1>
      <a onClick={() => setIsLogining((l) => !l)}>
        {isLogining ? "Registration" : "Login"}
      </a>
      <div>
        {isLogining ? (
          <LoginForm login={login} />
        ) : (
          <RegistrationForm registration={registration} />
        )}
      </div>
    </div>
  );
};
export default AuthPage;
