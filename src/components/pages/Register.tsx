import { useEffect, useState } from "react";
import styled from "styled-components";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";

import PageTemplate from "../templates/PageTemplate";
import InputWithLabel from "../molecules/InputWithLabel";
import Button from "../atoms/Button";
import { useUsersContext } from "../../contexts/UsersContext";

const StyledRegisterSection = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

const registerSchema = z
  .object({
    username: z.string().min(1, "Vartotojo vardas yra privalonmas"),
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
    passwordRepeat: z.string().min(1, "Privalote pakartoti slaptažodį"),
    dob: z.string().min(1, "Gimimo data yra privaloma"),
    avatarImg: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Slaptažodžiai nesutampa",
    path: ["passwordRepeat"],
  });

const Register = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    dob: "",
    avatarImg: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    passwordRepeat?: string;
    dob?: string;
    avatarImg?: string;
  }>({});
  const { register, loggedInUser, error } = useUsersContext();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();

  const validateAllFields = () => {
    const result = registerSchema.safeParse(formInputs);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        passwordRepeat: fieldErrors.passwordRepeat?.[0],
        dob: fieldErrors.dob?.[0],
        avatarImg: fieldErrors.avatarImg?.[0],
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowMessage(false);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formInputs, value);
  };

  const validateField = (name: keyof typeof formInputs, value: string) => {
    const updatedInputs = { ...formInputs, [name]: value };
    const result = registerSchema.safeParse(updatedInputs);

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
      const { username, email, password, dob, avatarImg } = formInputs;
      const formData = {
        username,
        email,
        password,
        dob,
        avatarImg,
      };
      await register(formData);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setFormInputs({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        dob: "",
        avatarImg: "",
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
      <StyledRegisterSection>
        <h2>Registruokitės</h2>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Vartotojo vardas"
            name="username"
            value={formInputs.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
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
          <InputWithLabel
            label="Pakartokite slaptažodį"
            type="password"
            name="passwordRepeat"
            value={formInputs.passwordRepeat}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passwordRepeat}
          />
          <InputWithLabel
            label="Gimimo data"
            type="date"
            name="dob"
            value={formInputs.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.dob}
          />
          <InputWithLabel
            type="url"
            label="Jūsų avataro paveikslėlis"
            name="avatarImg"
            value={formInputs.avatarImg}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passwordRepeat}
          />
          <Button>Pateikti</Button>
        </form>
        {showMessage && (
          <p>
            Jau turite paskyrą? Eikite{" "}
            <Link to="/login">
              <code>Prisijungti</code>
            </Link>
            .
          </p>
        )}
        {loggedInUser ? (
          <div style={{ color: "green" }}>
            <p>
              Vartotojas <strong>{loggedInUser.username}</strong> sėkmingai
              užregistruotas
            </p>
            {countdown !== null && (
              <p>Būsite nukreipti į Pradžios puslapį po {countdown} s...</p>
            )}
          </div>
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </StyledRegisterSection>
    </PageTemplate>
  );
};

export default Register;
