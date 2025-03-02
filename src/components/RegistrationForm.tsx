import { FC, FormEventHandler, useState } from "react";

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
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="display name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Registration</button>
    </form>
  );
};
export default RegistrationForm;
