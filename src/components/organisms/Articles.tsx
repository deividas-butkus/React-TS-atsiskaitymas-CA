import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

import { useArticlesContext } from "../../contexts/ArticlesContext";
import Article from "../molecules/Article";
import Spinner from "../atoms/Spinner";

const StyledArticlesSection = styled.section`
  > div.headingWithAdd {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
        color: grey;
        display: flex;
        align-items: center;
        gap: 3px;
        text-decoration: none;
        > svg {
          transform: translateY(-13px);
        }
        &:hover {
          color: #5d8b0c;
          cursor: pointer;
        }
      }
    }
  }
  > div.articles {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Articles = () => {
  const { articles, error } = useArticlesContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articles.length > 0 || error) {
      setIsLoading(false);
    }
  }, [articles, error]);

  return (
    <StyledArticlesSection>
      <div className="headingWithAdd">
        <div>
          <h2>Straipsniai</h2>
          <Link to={"/add"}>
            <span>Pridėti naują</span>
            <MapsUgcIcon />
          </Link>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <Spinner size="50px" />
      ) : (
        <div className="articles">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                authorId={article.authorId}
                title={article.title}
                articleImg={article.articleImg}
                description={article.description}
                createdAt={article.createdAt}
              />
            ))
          ) : (
            <p>Nėra straipsnių... :(</p>
          )}
        </div>
      )}
    </StyledArticlesSection>
  );
};

export default Articles;
