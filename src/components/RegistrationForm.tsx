import { FC, FormEventHandler, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import styled from "styled-components";

interface RegistrationFormProps {
  registration: (email: string, password: string, name: string) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ registration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      registration(email, password, name);
    }
  };
  return (
    <StyledRegistrationForm className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <Input
        type="text"
        placeholder="display name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button>Registration</Button>
    </StyledRegistrationForm>
  );
};


const StyledRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export default RegistrationForm;
