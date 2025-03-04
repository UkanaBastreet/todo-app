import { FC, FormEventHandler, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";

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
    <form className="login-form" onSubmit={handleSubmit}>
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
      <Button>Login</Button>
    </form>
  );
};
export default LoginForm;
