import { Link } from "react-router-dom";
import styled from "styled-components";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";

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
`;

const UserBox = () => {
  return (
    <StyledUserBoxDiv>
      <Link to={"/login"}>
        <LoginIcon />
        <span>Prisijungti</span>
      </Link>
      <Link to={"/register"}>
        <HowToRegIcon />
        <span>Registruotis</span>
      </Link>
      <div>
        <span>Atsijungti</span>
        <LogoutIcon />
      </div>
    </StyledUserBoxDiv>
  );
};

export default UserBox;
