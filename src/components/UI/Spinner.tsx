import styled, { css, keyframes } from "styled-components";

const SpinnerKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerAnimation = () => css`
  ${SpinnerKeyframes} .7s linear infinite;
`;
const SpinnerStyled = styled.div`
  width: 20px;
  height: 20px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  animation: ${SpinnerAnimation};
}
`;

const Spinner = () => {
  return <SpinnerStyled className="spinner" />;
};
export default Spinner;
