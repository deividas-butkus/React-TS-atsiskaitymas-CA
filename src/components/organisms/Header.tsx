import styled from "styled-components";

import Logo from "../atoms/Logo";
import NavBar from "../molecules/NavBar";
import UserBox from "../molecules/UserBox";

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
      <NavBar />

      <UserBox />
    </StyledHeader>
  );
};

export default Header;
