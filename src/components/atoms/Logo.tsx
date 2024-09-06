//TODO logo shrinking

import { useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const StyledLogoDiv = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
  display: grid;
  place-items: center;
  > img {
    height: 100%;
    width: 100%;
    display: none;
  }
`;

type PropsType = {
  logoImg: string;
};

const Logo = ({ logoImg }: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <StyledLogoDiv>
      {loading && <Spinner />}
      {!error ? (
        <img
          src={logoImg}
          alt="Music Lowers logo"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: loading ? "none" : "block" }}
        />
      ) : (
        <p>Paveikslėlio nepavyko užkrauti</p>
      )}
    </StyledLogoDiv>
  );
};

export default Logo;
