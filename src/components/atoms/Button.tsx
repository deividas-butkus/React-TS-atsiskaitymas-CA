import styled from "styled-components";

const StyledButton = styled.button<Props>`
  font-family: inherit;
  font-size: ${({ fontSize }) => fontSize || "14px"};
  background-color: ${({ bgColor }) => bgColor || "#a63f3d"};
  color: ${({ color }) => color || "#fbf9da"};
  padding: ${({ padding }) => padding || "10px 20px"};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ bgColor }) =>
      bgColor ? darkenColor(bgColor) : "#D73F03"};
  }
`;

type Props = {
  fontSize?: string;
  bgColor?: string;
  color?: string;
  padding?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const darkenColor = (color: string) => {
  let colorCode = color.replace("#", "");
  let r = parseInt(colorCode.substring(0, 2), 16) - 20;
  let g = parseInt(colorCode.substring(2, 4), 16) - 20;
  let b = parseInt(colorCode.substring(4, 6), 16) - 20;
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const Button = ({
  fontSize,
  children,
  bgColor,
  color,
  padding,
  onClick,
}: Props) => {
  return (
    <StyledButton
      fontSize={fontSize}
      bgColor={bgColor}
      color={color}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
