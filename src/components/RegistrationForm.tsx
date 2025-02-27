import { FC, FormEventHandler, useState } from "react";

interface RegistrationFormProps {
  registration: (email: string, password: string) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ registration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      registration(email, password);
    }
  };
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <input
        type="email"
        placeholder=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Registration</button>
    </form>
  );
};
export default RegistrationForm;
