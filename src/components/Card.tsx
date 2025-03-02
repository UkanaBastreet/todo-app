import { FC } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`card ${props.className || ""}`}>
      {children}
    </div>
  );
};

export default Card;
