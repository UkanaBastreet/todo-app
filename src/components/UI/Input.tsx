import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputStyled = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  outline: none;
  border: 1px solid var(--border);
  color: var(--text-color);
  background-color: var(--surface-soft);
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:focus {
    border-color: var(--accent);
    background-color: rgba(59, 130, 246, 0.15);
  }
`;

const Input: FC<InputProps> = (props) => {
  return <InputStyled {...props} />;
};

export default Input;
