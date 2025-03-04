import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputStyled = styled.input`
  font-size: 18px;
  padding: 4px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid gray;
`;

const Input: FC<InputProps> = (props) => {
  return <InputStyled {...props} />;
};

export default Input;
