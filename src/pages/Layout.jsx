import styled from "styled-components/macro";
import { Outlet, Link } from "react-router-dom";

const Wrap = styled.div`
  height: fit-content;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #000;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100vw;
  background-color: #0c0a66;
  z-index: 5;
  a {
    &:link,
    &:visited,
    &:hover {
      text-decoration: none;
    }
    &:hover {
      background-color: #338;
    }
  }
  .header {
    display: flex;
    width: 100vw;
    max-width: 1200px;
    line-height: 40px;
    .headerTitle {
      font-size: 24px;
      color: #ff6;
      padding: 0 10px;
      &:hover {
        color: #fff;
      }
    }
    .contactInfo {
      font-size: 13px;
      color: #aaaaaa;
      margin-left: auto;
      &:hover {
        color: #fff;
      }
    }
  }
`;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    &:link,
    &:visited,
    &:hover {
      text-decoration: none;
    }
  }
`;

const Layout = () => {
  return (
    <Wrap>
      <HeaderContainer>
        <div className="header">
          <Link to={"/"} className="headerTitle">
            批踢踢-鄉民之力
          </Link>
          <Link className="contactInfo">Contact Info</Link>
        </div>
      </HeaderContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrap>
  );
};

export default Layout;
