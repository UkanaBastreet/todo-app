import { FC } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px 0px;
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
  border-radius: 10px;
  padding: 16px 20px;
  
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
