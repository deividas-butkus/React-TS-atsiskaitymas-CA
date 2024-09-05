import styled from "styled-components";

import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import logo from "./../../media/logo.png";

const StyledMain = styled.main`
  min-height: calc(100vh - 100px);
  background-color: #faeadd;
  padding-bottom: 20px;
`;

type PropsType = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PropsType) => {
  return (
    <>
      <Header logoImg={logo} />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
};

export default PageTemplate;
