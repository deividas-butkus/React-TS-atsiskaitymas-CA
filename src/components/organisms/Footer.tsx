import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const StyledFooter = styled.footer`
  height: 20vh;
  background-color: #5d8b0e;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: top;
  > div {
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #d73f03;
      }
    }
  }
  > div.social {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>Music lowers, UAB</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
      <div>
        <p>
          <Link to={"/policies/privacy"}>Privatumo politika</Link>
        </p>
        <p>
          <Link to={"/policies/cookies"}>Slapukai</Link>
        </p>
        <p>
          <Link to={"/policies/terms"}>Naudojimo sąlygos</Link>
        </p>
      </div>
      <div className="social">
        <a href="https://www.facebook.com/">
          <FacebookIcon />
        </a>
        <a href="https://www.youtube.com/">
          <YouTubeIcon />
        </a>
        <a href="https://www.instagram.com/">
          <InstagramIcon />
        </a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
