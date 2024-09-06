import { useState } from "react";
import styled from "styled-components";

import defaultAvatarImg from "./../../media/defaultAvatarImg.png";

const StyledAvatarDiv = styled.div`
  height: 30px;
  width: 30px;
  > img {
    background-color: #000;
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
    &:hover {
      background-color: #d73f03;
    }
  }
`;

type AvatarImgProps = {
  avatarImg?: string;
  username: string;
};

const Avatar = ({ avatarImg, username }: AvatarImgProps) => {
  const [imgSrc, setImgSrc] = useState<string>(avatarImg || defaultAvatarImg);

  const handleError = () => {
    setImgSrc(defaultAvatarImg);
  };

  return (
    <StyledAvatarDiv>
      <img src={imgSrc} alt={username} onError={handleError} />
    </StyledAvatarDiv>
  );
};

export default Avatar;
