import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<{ size: string; $borderColor: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: ${(props) => props.$borderColor};
  animation: ${spin} 1s infinite linear;
`;

type SpinnerProps = {
  size?: string;
  borderColor?: string;
};

const Spinner = ({
  size = "30px",
  borderColor = "#d73f0350",
}: SpinnerProps) => {
  return <StyledSpinner size={size} $borderColor={borderColor} />;
};

export default Spinner;
