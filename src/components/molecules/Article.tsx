import styled from "styled-components";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUsersContext } from "../../contexts/UsersContext";
import AvatarWithUsername from "./AvatarWithUsername";
import { useArticlesContext } from "../../contexts/ArticlesContext";

const StyledArticle = styled.article`
  height: fit-content;
  position: relative;
  > h3 {
    margin-bottom: 0;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 0;
  }
  > img {
    border-radius: 10px;
  }

  > svg {
    color: grey;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      &.bookmarkAdd {
        color: #5d8b0c;
      }
      &.bookmarkRemove {
        color: #d63f03;
      }
      &.delete {
        color: red;
      }
    }
  }

  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background-color: #c68383;
    margin: 20px 0;
    opacity: 0.7;
  }
`;

type Props = {
  id: string;
  authorId: string;
  title: string;
  articleImg: string;
  description: string;
  createdAt: string;
};

const Article = ({
  id,
  authorId,
  title,
  articleImg,
  description,
  createdAt,
}: Props) => {
  const { users, loggedInUser, addFavorite, removeFavorite } =
    useUsersContext();
  const { deleteArticle } = useArticlesContext();

  const user = users.find((u) => u.id === authorId);

  const isFavorite = Array.isArray(loggedInUser?.favoriteArticles)
    ? loggedInUser?.favoriteArticles.includes(id)
    : false;

  const handleBookmarkToggle = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(id);
    }
  };

  return (
    <StyledArticle key={id}>
      <h3>{title}</h3>
      <div>
        {user && (
          <AvatarWithUsername
            avatarImg={user.avatarImg}
            username={user.username}
          />
        )}
        <small>
          {new Date(createdAt).toLocaleString("lt-LT", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: undefined,
          })}
        </small>
      </div>
      {articleImg && (
        <img src={articleImg} alt={title} style={{ width: "200px" }} />
      )}
      <p>{description}</p>
      {loggedInUser && (
        <>
          {isFavorite ? (
            <BookmarkRemoveIcon
              className="bookmarkRemove"
              onClick={handleBookmarkToggle}
            />
          ) : (
            <BookmarkAddIcon
              className="bookmarkAdd"
              onClick={handleBookmarkToggle}
            />
          )}
        </>
      )}
      {loggedInUser && loggedInUser.id === authorId && (
        <DeleteIcon className="delete" onClick={handleDelete} />
      )}
    </StyledArticle>
  );
};

export default Article;
