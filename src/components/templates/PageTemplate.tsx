import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

type PropsType = {
  children: React.ReactElement;
};

const PageTemplate = ({ children }: PropsType) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PageTemplate;
