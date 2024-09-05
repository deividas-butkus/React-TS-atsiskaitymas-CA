import { Link } from "react-router-dom";
import styled from "styled-components";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "../atoms/Avatar";

const StyledUserBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 5px;
  > a,
  div {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover {
      cursor: pointer;
      color: #d73f03;
    }
  }
  button {
    background-color: transparent;
    border: none;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const UserBox = () => {
  return (
    <StyledUserBoxDiv>
      <Link to={"/myFavorites"}>
        <Avatar />
        <span>Frank</span>
      </Link>
      <Link to={"/login"}>
        <LoginIcon fontSize="small" />
        <span>Prisijungti</span>
      </Link>
      <Link to={"/register"}>
        <HowToRegIcon fontSize="small" />
        <span>Registruotis</span>
      </Link>
      <button>
        <span>Atsijungti</span>
        <LogoutIcon fontSize="small" />
      </button>
    </StyledUserBoxDiv>
  );
};

export default UserBox;
