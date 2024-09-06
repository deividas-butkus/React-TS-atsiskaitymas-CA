import styled from "styled-components";

import Avatar from "../atoms/Avatar";

type Props = {
  avatarImg: string;
  username: string;
};

const StyledAvatarWithUsernameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AvatarWithUsername = ({ avatarImg, username }: Props) => {
  return (
    <StyledAvatarWithUsernameDiv>
      <Avatar avatarImg={avatarImg} username={username} />
      <span>{username}</span>
    </StyledAvatarWithUsernameDiv>
  );
};

export default AvatarWithUsername;
