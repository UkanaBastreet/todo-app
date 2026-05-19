import { FC } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: var(--surface);
  backdrop-filter: blur(18px);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  border-radius: 22px;
  padding: 20px 24px;
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ children, ...props }) => {
  return (
    <CardContainer
      {...props}
      // className={`card ${props.className || ""}`}
    >
      {children}
    </CardContainer>
  );
};

export default Card;
