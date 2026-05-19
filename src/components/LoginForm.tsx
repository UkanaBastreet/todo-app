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
  const [remember, setRemember] = useState(false);

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
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <span>Remember me</span>
      </CheckboxLabel>
      <Button type="submit">Login</Button>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h2 {
    margin: 0;
    font-size: 1.9rem;
    color: var(--text-color);
  }

  button {
    width: 100%;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 0.95rem;
  cursor: pointer;

  span {
    display: inline-block;
  }
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(255, 255, 255, 0.92);
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  &:checked {
    background: var(--accent);
    border-color: var(--accent);
  }

  &:checked::after {
    content: "";
    width: 6px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 2px;
    left: 5px;
  }
`;

export default LoginForm;
