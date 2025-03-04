import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button`
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 2px;
  padding: 4px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid dimgray;

  cursor: pointer;
  transition: 0.2s;
  background-color: dimgray;
  color: #fff;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

export default Button;
