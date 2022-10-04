import styled from "styled-components/macro";
import { Outlet, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";

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
    .arrowIcon {
      font-size: 24px;
      color: #aaa;
      padding: 0 5px;
    }
    .boardTitle {
      color: #fff;
      padding: 0 5px;
      font-size: 24px;
      .boardLabel {
        font-size: 13px;
        padding: 0 8px;
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
  const params = useParams();
  const [boardInfo, setBoardInfo] = useState({
    boardName: "",
    boardId: "",
  });
  const { boardId, boardName } = boardInfo;

  const GlobalContextValue = {
    setBoardInfo: setBoardInfo,
    // API_BASEURL: "http://103.251.113.51:5000/api",
    API_BASEURL: "http://pttwebs.com/bcc/api",
    // API_BASEURL: "http://loalhost:5000/api",
  };

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setBoardInfo({
        boardName: "",
        boardId: "",
      });
    }
  }, [params]);

  return (
    <GlobalContext.Provider value={GlobalContextValue}>
      <Wrap>
        <HeaderContainer>
          <div className="header">
            <Link to={"/"} className="headerTitle">
              批踢踢-鄉民之力
            </Link>
            {!boardId ? (
              ""
            ) : (
              <>
                <span className="arrowIcon">›</span>
                <Link
                  className="boardTitle"
                  to={`ArticleList/${boardId}`}
                  state={{ boardName: boardName }}
                >
                  <span className="boardLabel">看板</span>
                  {boardName}
                </Link>
              </>
            )}
            <Link className="contactInfo">Contact Info</Link>
          </div>
        </HeaderContainer>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </Wrap>
    </GlobalContext.Provider>
  );
};

export default Layout;
