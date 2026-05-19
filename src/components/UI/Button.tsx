import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  design?: DesignType;
  color?: ColorType;
  size?: SizeType;
}
type DesignType = "default" | "text" | "outline";
type ColorType = "black" | "blue" | "red" | "green" | "gray" | "yellow";
type SizeType = "default" | "large" | "small";

const Button: FC<ButtonProps> = ({
  children,
  design = "default",
  color = "blue",
  size = "default",
  ...props
}) => {
  return (
    <StyledButton color={color} design={design} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const colorMap = {
  black: "#000000",
  blue: "#1890FF",
  red: "#FF4D4F",
  green: "#52C41A",
  gray: "#8C8C8C",
  yellow: "#FAAD14",
};
const sizeStyles = {
  small: {
    padding: "0 14px",
    fontSize: "13px",
    lineHeight: "20px",
    minHeight: "36px",
  },
  default: {
    padding: "0 20px",
    fontSize: "15px",
    lineHeight: "24px",
    minHeight: "52px",
  },
  large: {
    padding: "0 26px",
    fontSize: "16px",
    lineHeight: "26px",
    minHeight: "60px",
  },
};

const getDesignStyles = (design: DesignType, color: ColorType) => {
  const mainColor = colorMap[color];

  switch (design) {
    case "default":
      return `
        background: ${mainColor};
        color: #FFFFFF;
        border: 1px solid transparent;
        
        &:hover {
          background: ${getHoverColor(color)};
        }
        
        &:active {
          background: ${getActiveColor(color)};
        }
      `;
    case "text":
      return `
        color: ${mainColor};
        background: transparent;
        border: none;
        
        &:hover {
          background: rgba(${hexToRgb(mainColor)}, 0.06);
        }
        
        &:active {
          background: rgba(${hexToRgb(mainColor)}, 0.15);
        }
      `;
    case "outline":
      return `
        border: 1px solid ${mainColor};
        color: ${mainColor};
        background: transparent;
        
        &:hover {
          background: rgba(${hexToRgb(mainColor)}, 0.06);
          border-color: ${getHoverColor(color)};
        }
        
        &:active {
          background: rgba(${hexToRgb(mainColor)}, 0.15);
        }
      `;
  }
};
interface StyledButtonProps {
  design: DesignType;
  color: ColorType;
  size: SizeType;
}
const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  border-width: 1px;
  border-style: solid;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: none;
  white-space: nowrap;

  ${({ size }) => `
    padding: ${sizeStyles[size].padding};
    font-size: ${sizeStyles[size].fontSize};
    line-height: ${sizeStyles[size].lineHeight};
    min-height: ${sizeStyles[size].minHeight};
  `}

  ${({ design, color }) => getDesignStyles(design, color)}

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;

    ${({ design }) =>
      design === "outline"
        ? `border-color: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.55);`
        : `background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.55);`}
  }
`;

// Вспомогательные функции
const getHoverColor = (color: ColorType) => {
  const hoverMap = {
    black: "#262626",
    blue: "#40A9FF",
    red: "#FF7875",
    green: "#73D13D",
    gray: "#A6A6A6",
    yellow: "#FFC53D",
  };
  return hoverMap[color];
};

const getActiveColor = (color: ColorType) => {
  const activeMap = {
    black: "#434343",
    blue: "#096DD9",
    red: "#D9363E",
    green: "#389E0D",
    gray: "#595959",
    yellow: "#D48806",
  };
  return activeMap[color];
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "0,0,0";
};
