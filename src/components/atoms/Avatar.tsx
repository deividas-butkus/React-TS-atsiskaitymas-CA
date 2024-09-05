import styled from "styled-components";

const StyledAvatarDiv = styled.div`
  height: 30px;
  width: 30px;
  > img {
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
  }
`;

const Avatar = () => {
  return (
    <StyledAvatarDiv>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/02/Frank_Zappa_1973_2.JPG"
        alt="Frank"
      />
    </StyledAvatarDiv>
  );
};

export default Avatar;
