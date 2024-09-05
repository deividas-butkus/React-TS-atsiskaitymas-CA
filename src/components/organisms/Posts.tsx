import styled from "styled-components";

const StyledPostsSection = styled.section`
  > div {
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    gap: 10px;
    > article {
      height: 100px;
      border: 1px solid blue;
    }
  }
`;

const Posts = () => {
  return (
    <StyledPostsSection>
      <h2>Žinutės</h2>
      <div>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
        <article>Article</article>
      </div>
    </StyledPostsSection>
  );
};

export default Posts;
