import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Logo from "../atoms/Logo";

const StyledHeader = styled.header`
  padding: 0 10%;
  height: 100px;
  background-color: #fcd306;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div.logo {
    max-width: 100px;
    height: 100px;
  }
  > nav {
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
  }
  > div.userBox {
    display: flex;
    flex-direction: column;
    color: #d73f03;
    > div {
      display: flex;
      gap: 5px;
      &:hover {
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: #d73f03;
      }
    }
  }
`;

type Props = {
  logoImg: string;
};

const Header = ({ logoImg }: Props) => {
  return (
    <StyledHeader>
      <div className="logo">
        <Logo logoImg={logoImg} />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Pradžia</NavLink>
          </li>
          <li>
            <NavLink to={"/userPage"}>Mano mėgstami</NavLink>
          </li>
        </ul>
      </nav>
      <div className="userBox">User box</div>
    </StyledHeader>
  );
};

export default Header;
