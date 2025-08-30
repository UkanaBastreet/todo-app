import { FC } from "react";
import styled from "styled-components";

interface AlertProps {
  title?: string;
  type: "success" | "info" | "error" | "warning";
  text: string;
  onClose?: () => void;
}

const getBackgroundColor = (type: AlertProps["type"]) => {
  const colors = {
    success: "#d4edda",
    info: "#d1ecf1",
    warning: "#fff3cd",
    error: "#f8d7da",
  };
  return colors[type];
};

const getBorderColor = (type: AlertProps["type"]) => {
  const colors = {
    success: "#c3e6cb",
    info: "#bee5eb",
    warning: "#ffeeba",
    error: "#f5c6cb",
  };
  return colors[type];
};

const StyledAlert = styled.div<{ type: AlertProps["type"] }>`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid ${(props) => getBorderColor(props.type)};
  border-radius: 4px;
  background-color: ${(props) => getBackgroundColor(props.type)};

  b {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1em;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const Alert: FC<AlertProps> = ({ text, type, title, onClose }) => {
  return (
    <StyledAlert type={type}>
      <span>
        {title && <b>{title}</b>}
        {onClose && <span onClick={onClose}>✖</span>}
      </span>
      <p>{text}</p>
    </StyledAlert>
  );
};

export default Alert;
