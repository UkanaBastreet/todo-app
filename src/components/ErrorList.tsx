import { FC } from "react";
import styled from "styled-components";
import Alert from "./UI/Alert";

interface IError {
  id: number;
  text: string;
  title: string;
  type: "success" | "info" | "error" | "warning";
}

interface ErrorListProps {
  errors: IError[];
}
const StyledErrorList = styled.div``;
const ErrorList: FC<ErrorListProps> = ({ errors }) => {
  return (
    <StyledErrorList>
      {errors.map((error) => (
        <Alert key={error.id} {...error} />
      ))}
    </StyledErrorList>
  );
};

export default ErrorList;
