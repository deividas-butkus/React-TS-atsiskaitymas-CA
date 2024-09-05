import styled from "styled-components";

const FieldContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "10px"};
`;

const StyledLabel = styled.label<{ color?: string; fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "#333"};
`;

type StyledInputProps = {
  padding?: string;
  $borderColor?: string;
};

const StyledInput = styled.input<StyledInputProps>`
  font-family: inherit;
  padding: ${(props) => props.padding || "8px"};
  border: 1px solid ${(props) => props.$borderColor || "#ccc"};
  border-radius: 15px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

type InputWithLabelProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  labelColor?: string;
  labelFontSize?: string;
  inputPadding?: string;
  inputBorderColor?: string;
  errorBorderColor?: string;
  gap?: string;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  labelColor,
  labelFontSize,
  inputPadding,
  inputBorderColor,
  errorBorderColor = "red",
  gap,
}) => {
  const borderColor = error ? errorBorderColor : inputBorderColor;

  return (
    <FieldContainer gap={gap}>
      <StyledLabel htmlFor={name} color={labelColor} fontSize={labelFontSize}>
        {label}
      </StyledLabel>
      <StyledInput
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        padding={inputPadding}
        $borderColor={borderColor}
      />
      <p>
        To declare a variable in JavaScript, you use the <code>let</code>{" "}
        keyword.
      </p>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
  );
};

export default InputWithLabel;
