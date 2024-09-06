// FavoriteArticles.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUsersContext } from "../../contexts/UsersContext";
import { useArticlesContext } from "../../contexts/ArticlesContext";
import Article from "../molecules/Article";
import Spinner from "../atoms/Spinner";

const FavoriteArticles = () => {
  const { loggedInUser } = useUsersContext();
  const { articles, error } = useArticlesContext();
  const [isLoading, setIsLoading] = useState(true);

  const favoriteArticleIds = loggedInUser?.favoriteArticles || [];
  const favoriteArticles = articles.filter((article) =>
    favoriteArticleIds.includes(article.id)
  );

  useEffect(() => {
    if (articles.length > 0 || error) {
      setIsLoading(false);
    }
  }, [articles, error]);

  return (
    <section>
      <h2>Labiausiai patinka šie</h2>
      {isLoading ? (
        <Spinner size="50px" />
      ) : favoriteArticles.length > 0 ? (
        favoriteArticles.map((article) => (
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
        <p>
          Jūs neturite mėgstamų straipsnių. <br />
          Eikite į{" "}
          <Link to={"/"}>
            <code>Pradžios</code>
          </Link>{" "}
          puslapį ir pažymėkite mėgstamus.
        </p>
      )}
    </section>
  );
};

export default FavoriteArticles;
