import { useState, useEffect } from "react";
import styled from "styled-components";

import { useArticlesContext } from "../../contexts/ArticlesContext";
import Article from "../molecules/Article";
import Spinner from "../atoms/Spinner";

const StyledArticlesSection = styled.section`
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
