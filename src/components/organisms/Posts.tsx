import styled from "styled-components";

const StyledPostsSection = styled.section`
  min-height: calc(100vh - 100px);
  background-color: #faeadd;
  > h1 {
    margin: 0;
    padding: 20px 0;
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

const Posts = () => {
  return (
    <StyledPostsSection>
      <h1>Žinutės</h1>
    </StyledPostsSection>
  );
};

export default Posts;
