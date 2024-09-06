import styled from "styled-components";
import { NavLink } from "react-router-dom";

import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const StyledNav = styled.nav`
  > ul {
    list-style: none;
    display: flex;
    gap: 15px;
    > li {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
        padding: 7px 14px;
        color: #d73f03;
        text-decoration: none;
        border: 2px solid transparent;
        transition: outline 0.2s;
        &.active {
          border: 2px solid #faeadd;
          border-radius: 20px;
          background-color: #faeadd;
          color: #d73f03;
        }
        &:hover {
          outline: 2px solid #faeadd;
          border-radius: 20px;
        }
      }
    }
    li:nth-child(3) {
      > a {
        color: grey;
        display: flex;
        align-items: center;
        gap: 3px;
        text-decoration: none;
        &.active {
          color: #5d8b0c;
        }
        > svg {
          transform: translateY(-11px);
        }
        &:hover {
          color: #5d8b0c;
          cursor: pointer;
        }
      }
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to={"/"}>Pradžia</NavLink>
        </li>
        <li>
          <NavLink to={"/myFavorites"}>Mano mėgstami</NavLink>
        </li>
        <li>
          <NavLink to={"/add"}>
            <span>Pridėti naują</span>
            <MapsUgcIcon />
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;
