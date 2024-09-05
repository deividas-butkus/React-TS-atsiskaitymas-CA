import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import logo from "./../../media/logo.png";

type PropsType = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PropsType) => {
  return (
    <>
      <Header logoImg={logo} />
      {children}
      <Footer />
    </>
  );
};

export default PageTemplate;
