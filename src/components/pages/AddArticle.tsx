import { useEffect, useState } from "react";
import styled from "styled-components";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import PageTemplate from "../templates/PageTemplate";
import InputWithLabel from "../molecules/InputWithLabel";
import Button from "../atoms/Button";
import { useArticlesContext } from "../../contexts/ArticlesContext";
import { useUsersContext } from "../../contexts/UsersContext";

const StyledAddArticleSection = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > button {
      margin-top: 20px;
      align-self: flex-start;
    }
  }
`;

const addArticleSchema = z.object({
  title: z.string().min(1, "Straipsnio pavadinimas yra privalomas"),
  articleImg: z.string().optional(),
  description: z.string().min(1, "Straipsnio tekstas yra privalomas"),
});

const AddArticle = () => {
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    articleImg: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    articleImg?: string;
  }>({});
  const { addArticle, error } = useArticlesContext();
  const { loggedInUser } = useUsersContext();
  const [articleAdded, setArticleAdded] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  const validateAllFields = () => {
    const result = addArticleSchema.safeParse(formInputs);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        articleImg: fieldErrors.articleImg?.[0],
        description: fieldErrors.description?.[0],
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
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formInputs, value);
  };

  const validateField = (name: keyof typeof formInputs, value: string) => {
    const updatedInputs = { ...formInputs, [name]: value };
    const result = addArticleSchema.safeParse(updatedInputs);

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

    if (isValid && loggedInUser) {
      const { title, description, articleImg } = formInputs;
      const formData = {
        authorId: loggedInUser.id,
        title,
        description,
        articleImg,
      };
      await addArticle(formData);
      setArticleAdded(true);
    }
  };

  useEffect(() => {
    if (articleAdded) {
      setFormInputs({
        title: "",
        description: "",
        articleImg: "",
      });

      setCountdown(5);
    }
  }, [articleAdded]);

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
      <StyledAddArticleSection>
        <h2>Parašykite straipsnį</h2>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Pavadinimas"
            name="title"
            value={formInputs.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.title}
          />
          <InputWithLabel
            type="textarea"
            label="Tekstas"
            name="description"
            value={formInputs.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description}
          />
          <InputWithLabel
            type="url"
            label="Paveikslėlis"
            name="articleImg"
            value={formInputs.articleImg}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.articleImg}
          />
          <Button $bgColor="#5D8B0C">Publikuoti</Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display errors if any */}
        {articleAdded && (
          <p style={{ color: "green" }}>
            Straipsnis sėkmingai publikuotas! Jūs būsite nukreipti į Pradžios
            puslapį po {countdown} sek.
          </p>
        )}
      </StyledAddArticleSection>
    </PageTemplate>
  );
};

export default AddArticle;
