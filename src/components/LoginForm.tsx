import { FC, FormEventHandler, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import styled from "styled-components";

interface LoginFormProps {
  login: (email: string, password: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      login(email, password);
    }
  };

  return (
    <StyledLoginForm className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <input type="checkbox" name="rememberMe" id="" />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <Button>Login</Button>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export default LoginForm;
