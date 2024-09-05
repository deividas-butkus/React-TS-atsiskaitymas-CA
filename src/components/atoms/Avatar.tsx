import styled from "styled-components";
import defaultAvatarImg from "./../../media/defaultAvatarImg.png";

const StyledAvatarDiv = styled.div`
  height: 30px;
  width: 30px;
  > img {
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
    background-color: #d63f03;
  }
`;

type AvatarImgProps = {
  avatarImg?: string;
  username: string;
};

const Avatar = ({ avatarImg, username }: AvatarImgProps) => {
  return (
    <StyledAvatarDiv>
      <img src={avatarImg || defaultAvatarImg} alt={username} />
    </StyledAvatarDiv>
  );
};

export default Avatar;
