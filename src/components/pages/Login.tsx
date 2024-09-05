import { useEffect, useState } from "react";
import styled from "styled-components";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import PageTemplate from "../templates/PageTemplate";
import InputWithLabel from "../molecules/InputWithLabel";
import Button from "../atoms/Button";
import { useUsersContext } from "../../contexts/UsersContext";

const StyledLoginSection = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > div {
      > input {
        max-width: 400px;
      }
    }
    > button {
      margin-top: 20px;
      align-self: flex-start;
    }
  }
`;

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El. paštas yra privalomas")
    .email("Neteisingas el. pašto adresas"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&./#-])[A-Za-z\d@$!%*?&./#-]{6,}$/,
      {
        message:
          "Slaptažodis privalo būti ne trumpesnis kaip 6 simbolių, turėti savyje raidžių, bent vieną didžiąją raidę, bent vieną skaičių ir bent vieną specialųjį simbolį",
      }
    ),
});

const Login = () => {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { login, loggedInUser, error } = useUsersContext();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number | null>(null);

  const validateAllFields = () => {
    const result = loginSchema.safeParse(formInputs);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formInputs, value);
  };

  const validateField = (name: keyof typeof formInputs, value: string) => {
    const updatedInputs = { ...formInputs, [name]: value };
    const result = loginSchema.safeParse(updatedInputs);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name]?.[0],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateAllFields();

    if (isValid) {
      login(formInputs.email, formInputs.password);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setFormInputs({
        email: "",
        password: "",
      });

      setCountdown(5);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (countdown === null || countdown < 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(intervalId);
  }, [countdown, navigate]);

  return (
    <PageTemplate>
      <h2>Prisijunkite</h2>
      <StyledLoginSection>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="El. paštas"
            type="email"
            name="email"
            value={formInputs.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <InputWithLabel
            label="Slaptažodis"
            type="password"
            name="password"
            value={formInputs.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Button>Pateikti</Button>
        </form>
        {loggedInUser ? (
          <div style={{ color: "green" }}>
            <p>
              Vartotojas <strong>{loggedInUser.username}</strong> sėkmingai
              prisijungė
            </p>
            {countdown !== null && (
              <p>Būsite nukreipti į Pradžios puslapį po {countdown} s...</p>
            )}
          </div>
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </StyledLoginSection>
    </PageTemplate>
  );
};

export default Login;
