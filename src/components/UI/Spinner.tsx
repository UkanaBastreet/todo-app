import styled, { keyframes } from "styled-components";

const SpinnerKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerStyled = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid rgba(255, 255, 255, 0.18);
  border-left-color: var(--accent);
  border-radius: 50%;
  animation: ${SpinnerKeyframes} 0.75s linear infinite;
`;

const Spinner = () => {
  return <SpinnerStyled className="spinner" />;
};
export default Spinner;
