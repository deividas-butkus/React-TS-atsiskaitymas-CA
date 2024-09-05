import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNav = styled.nav`
  > ul {
    list-style: none;
    display: flex;
    gap: 15px;
    > li {
      cursor: pointer;
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
          <NavLink to={"/userPage"}>Mano mėgstami</NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;
