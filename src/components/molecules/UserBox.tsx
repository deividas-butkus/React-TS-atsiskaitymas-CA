import { Link } from "react-router-dom";
import styled from "styled-components";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useUsersContext } from "../../contexts/UsersContext";
import Button from "../atoms/Button";
import AvatarWithUsername from "./AvatarWithUsername";

const StyledUserBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 5px;
  > a,
  div,
  button {
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: inherit;
    &:hover {
      cursor: pointer;
      color: #d73f03;
    }
    > span {
      font-size: 12px;
    }
    > div {
      img:hover {
        background-color: #d73f03;
      }
    }
  }
`;

const UserBox = () => {
  const { loggedInUser, logout } = useUsersContext();

  return (
    <StyledUserBoxDiv>
      {!loggedInUser ? (
        <>
          <Link to={"/login"}>
            <LoginIcon fontSize="small" />
            <span>Prisijungti</span>
          </Link>
          <Link to={"/register"}>
            <HowToRegIcon fontSize="small" />
            <span>Registruotis</span>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/myFavorites"}>
            <AvatarWithUsername
              avatarImg={loggedInUser.avatarImg}
              username={loggedInUser.username}
            />
          </Link>
          <Button
            bgColor="transparent"
            color="#000"
            padding="0"
            onClick={logout}
          >
            <span>Atsijungti</span>
            <LogoutIcon fontSize="small" />
          </Button>
        </>
      )}
    </StyledUserBoxDiv>
  );
};

export default UserBox;
