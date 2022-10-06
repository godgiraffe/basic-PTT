import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ActionToolbar from "../../components/ActionToolbar";
import ArticleItem from "./ArticleItem";
import AdContent from "../../components/AdContent";
import GlobalContext from "../../contexts/GlobalContext";
import { Helmet } from "react-helmet";
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
    .articleList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 800px;
      width: 800px;
    }
  }
`;

const ArticleList = () => {
  const location = useLocation();
  const { boardName, page } = location.state || {};

  const { boardId } = useParams();
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
  const { boardInfo, setBoardInfo, API_BASEURL } =
    useContext(GlobalContext) || {};
  const gotoPage = page ? page : 0;

  const API_ENDPOINT = `${API_BASEURL}/searchArticle`;

  useEffect(() => {
    setFetchDataStatus({
      loadComplete: false,
      gotError: false,
    });
    fetchArticleList();
  }, [gotoPage, pageStatus.searchKey]);

  const fetchArticleList = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBody = {
      boardId: boardId,
      page: gotoPage,
      searchKey: pageStatus.searchKey ? pageStatus.searchKey : "",
    };
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          const sortedData = res.data.sort((article1, article2) => {
            return  new Date(article1.CreateDate) - new Date(article2.CreateDate);
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
          console.error("get error", res.result);
          setFetchDataStatus({
            loadComplete: false,
            gotError: true,
          });
        }
      })
      .catch((error) => {
        console.error("get error", error);
      });
    if (boardId !== boardInfo.boardId) {
      setBoardInfo({
        boardId: boardId,
        boardName: boardName,
      });
    }
  };

  const handleSearchKeyOnKeyUp = (e) => {
    // press enter
    if (e.keyCode === 13) {
      const searchKey = e.target.value;
      setPageStatus((prevPageStatus) => {
        console.log("");
        return {
          ...prevPageStatus,
          searchKey: searchKey,
        };
      });
    }
  };

  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="title" content={`批踢踢-鄉民之力 ${boardName}`} />
        <meta name="description" content={`批踢踢-鄉民之力 ${boardName}`} />
        <title>批踢踢-鄉民之力</title>
      </Helmet>
      <ActionToolbar boardId={boardId} pageStatus={pageStatus} />
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
            {fetchDataStatus.loadComplete === true
              ? articleListData.map((article) => {
                  const {
                    ArticleId,
                    ArticleTitle,
                    Author,
                    CreateDate,
                    IsFixed,
                  } = article;
                  return (
                    <ArticleItem
                      key={ArticleId}
                      BoardId={boardId}
                      ArticleId={ArticleId}
                      ArticleTitle={ArticleTitle}
                      Author={Author}
                      CreateDate={CreateDate}
                      IsFixed={IsFixed}
                    />
                  );
                })
              : fetchDataStatus.gotError === false ? <LoadingPage /> : <ErrorPage />
            }
          </div>
          <AdContent />
        </div>
      </ArticleListContainer>
    </div>
  );
};

export default ArticleList;
