import styled from "styled-components";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUsersContext } from "../../contexts/UsersContext";
import AvatarWithUsername from "./AvatarWithUsername";

const StyledArticle = styled.article`
  height: fit-content;
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
  > div:hover {
    > img:hover {
      background-color: grey;
    }
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
  const { users } = useUsersContext();

  const user = users.find((u) => u.id === authorId);

  return (
    <StyledArticle key={id}>
      <h3>{title}</h3>
      {user && (
        <AvatarWithUsername
          avatarImg={user.avatarImg}
          username={user.username}
        />
      )}
      <img src={articleImg} alt={title} style={{ width: "100px" }} />
      <p>{description}</p>
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
      <BookmarkAddIcon className="bookmarkAdd" />
      <BookmarkRemoveIcon className="bookmarkRemove" />
      <DeleteIcon className="delete" />
    </StyledArticle>
  );
};

export default Article;
