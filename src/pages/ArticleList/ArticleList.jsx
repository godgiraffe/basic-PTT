import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ActionToolbar from "../../components/ActionToolbar";
import ArticleItem from "./ArticleItem";
import AdContent from "../../components/AdContent";
import GlobalContext from "../../contexts/GlobalContext";
import { Helmet } from "react-helmet";
import FixedContent from "../../components/FixedContent";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";

const ArticleListContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  .searchbar {
    padding: 1ex 0;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
      padding: 1ex;
      position: sticky;
      top: 80px;
      background: #000;
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      width: 96vw;
      padding: 1ex;
      position: sticky;
      top: 80px;
      background: #000;
    }
    #searchKey {
      background-color: #222;
      border: 1px solid #333;
      padding: 0.8ex;
      color: #ccc;
      width: fill-available;
      font-size: 20px;
    }
  }
  .articleContent {
    width: 100vw;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    gap: 100px;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
      flex-direction: column;
      gap: 0px;
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      flex-direction: column;
      gap: 0px;
    }
    .articleList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 800px;
      width: 800px;
      @media ${(props) => props.theme.devices.tablet.mediaQuery} {
        max-width: 960px;
        width: 100vw;
      }
      @media ${(props) => props.theme.devices.mobile.mediaQuery} {
        max-width: 485px;
        width: 100vw;
      }
    }
    .emptyContent {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      font-size: 6em;
      color: #fff;
    }
  }
`;

const ArticleList = () => {
  const location = useLocation();
  const { page } = location.state || {};

  const { boardName } = useParams();
  const [articleListData, setArticleListData] = useState([]);
  const [fetchDataStatus, setFetchDataStatus] = useState({
    loadComplete: false,
    gotError: false,
  });
  const [pageStatus, setPageStatus] = useState({
    nowPage: 0,
    totalPage: 0,
    searchKey: "",
  });
  const { boardInfo, setBoardInfo } = useContext(GlobalContext) || {};
  const gotoPage = page ? page : 0;

  useEffect(() => {
    setFetchDataStatus({
      loadComplete: false,
      gotError: false,
    });
    fetchArticleList();
  }, [gotoPage, pageStatus.searchKey]);

  const API_ENDPOINT = `${process.env.REACT_APP_API_BASEURL}/searchArticle/${boardName}`;
  const fetchArticleList = () => {
    const postBody = {
      boardName: boardName,
      page: gotoPage,
      searchKey: pageStatus.searchKey ? pageStatus.searchKey : "",
    };

    const queryUrl = `${API_ENDPOINT}?`
      .concat(gotoPage ? `page=${gotoPage}` : "")
      .concat(gotoPage && pageStatus.searchKey ? "&" : "")
      .concat(pageStatus.searchKey ? `q=${pageStatus.searchKey}` : "");

    fetch(queryUrl, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          const sortedData = res.data.sort((article1, article2) => {
            return (
              new Date(article1.CreateDate) - new Date(article2.CreateDate)
            );
          });
          setArticleListData(sortedData);
          setPageStatus((prevPageStatus) => {
            return {
              ...prevPageStatus,
              nowPage: postBody.page,
              totalPage: res.totalPage,
            };
          });
          setFetchDataStatus({
            loadComplete: true,
            gotError: false,
          });
        } else {
          console.error("ArticleList - get error", res.result);
          setFetchDataStatus({
            loadComplete: false,
            gotError: true,
          });
        }
      })
      .catch((error) => {
        console.error("ArticleList - get error", error);
      });
    if (boardName !== boardInfo.boardName) {
      setBoardInfo({
        boardName: boardName,
      });
    }
  };

  const handleSearchKeyOnKeyUp = (e) => {
    // press enter
    if (e.keyCode === 13) {
      const searchKey = e.target.value;
      setPageStatus((prevPageStatus) => {
        return {
          ...prevPageStatus,
          searchKey: searchKey,
        };
      });
    }
  };

  const renderArticleList = () => {
    if (fetchDataStatus.loadComplete === true) {
      return (
        <>
          {articleListData.length !== 0 ? (
            articleListData.map((article) => {
              const { ArticleId, ArticleTitle, Author, CreateDate } = article;
              return (
                <ArticleItem
                  key={ArticleId}
                  boardName={boardName}
                  ArticleId={ArticleId}
                  ArticleTitle={ArticleTitle}
                  Author={Author}
                  CreateDate={CreateDate}
                />
              );
            })
          ) : (
            <div className="emptyContent">查無資料</div>
          )}
          {pageStatus.nowPage === 0 ? <FixedContent /> : ""}
        </>
      );
    }

    if (fetchDataStatus.gotError === true) return <ErrorPage />;

    if (
      fetchDataStatus.gotError === false &&
      fetchDataStatus.loadComplete === false
    )
      return <LoadingPage />;
  };

  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:site_name" content="批踢踢-鄉民之力" />
        <meta
          property="og:title"
          content={`看板 ${boardName} 文章列表 - 批踢踢-鄉民之力`}
        />
        <meta name="title" content={`批踢踢-鄉民之力 ${boardName}`} />
        <meta
          name="description"
          content={`看板 ${boardName} 文章列表 - 批踢踢-鄉民之力 `}
        />
        <title>看板 {boardName} 文章列表 - 批踢踢-鄉民之力</title>
      </Helmet>
      <ActionToolbar boardName={boardName} pageStatus={pageStatus} />
      <ArticleListContainer>
        <div className="articleContent">
          <div className="articleList">
            <div className="searchbar">
              <input
                type="text"
                id="searchKey"
                placeholder="搜尋文章..."
                onKeyUp={handleSearchKeyOnKeyUp}
              />
            </div>
            {renderArticleList()}
          </div>
          <AdContent />
        </div>
      </ArticleListContainer>
    </div>
  );
};

export default ArticleList;
