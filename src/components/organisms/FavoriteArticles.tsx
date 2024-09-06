// FavoriteArticles.js
import { Link } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";
import { useArticlesContext } from "../../contexts/ArticlesContext";
import Article from "../molecules/Article"; // Ensure the correct import path for Article

const FavoriteArticles = () => {
  const { loggedInUser } = useUsersContext();
  const { articles } = useArticlesContext();

  const favoriteArticleIds = loggedInUser?.favoriteArticles || [];
  const favoriteArticles = articles.filter((article) =>
    favoriteArticleIds.includes(article.id)
  );

  return (
    <section>
      <h2>Labiausiai patinka šie</h2>
      {favoriteArticles.length > 0 ? (
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
