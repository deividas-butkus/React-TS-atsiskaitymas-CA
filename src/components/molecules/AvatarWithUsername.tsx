import styled from "styled-components";

import Avatar from "../atoms/Avatar";

const StyledAvatarWithUsernameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

type Props = {
  avatarImg: string;
  username: string;
};

const AvatarWithUsername = ({ avatarImg, username }: Props) => {
  return (
    <StyledAvatarWithUsernameDiv>
      <Avatar avatarImg={avatarImg} username={username} />
      <span>{username}</span>
    </StyledAvatarWithUsernameDiv>
  );
};

export default AvatarWithUsername;
