import Posts from "../organisms/Posts";
import PageTemplate from "../templates/PageTemplate";

const Home = () => {
  return (
    <PageTemplate>
      <main>
        <Posts />
      </main>
    </PageTemplate>
  );
};

export default Home;
