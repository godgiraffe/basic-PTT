import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import AdContent from "../../components/AdContent";
import GlobalContext from "../../contexts/GlobalContext";
import { Helmet } from "react-helmet";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";

const ArticleContentContainer = styled.div`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 100px;
  font-size: 24px;
  .leftContent {
    width: 100vw;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    .articleDetail {
      display: flex;
      flex-direction: column;
      background-color: #008;
      .authorContainer,
      .titleContainer,
      .createDateContainer {
        display: flex;
        flex-direction: row;
        color: #999;
        background-color: #008;
        .field {
          color: #008;
          background-color: #999;
        }
        div {
          padding: 0 1ex;
        }
      }
      .authorContainer {
        .field:nth-child(3) {
          margin-left: auto;
        }
      }
    }
    .articleContent {
      margin-top: 1em;
      background-color: #000;
      color: #999;
      white-space: pre-line;
    }

    .responseDisabledInfo {
      margin: 10px auto;
      background-color: #222;
      color: #999;
      width: fill-available;
    }
  }
`;


const ArticleContent = () => {
  const { API_BASEURL } = useContext(GlobalContext) || {};
  const [article, setArticle] = useState({
    author: "",
    title: "",
    content: "",
    kind: "",
    release_time: "",
  });
  const [fetchDataStatus, setFetchDataStatus] = useState({
    loadComplete: false,
    gotError: false,
    errorMsg: "",
  });
  const { boardId, ArticleId } = useParams();
  const API_ENDPOINT = `${API_BASEURL}/getArticle/${boardId}/${ArticleId}`;

  useEffect(() => {
    fetch(API_ENDPOINT, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === false) {
          setFetchDataStatus({
            loadComplete: false,
            gotError: true,
            errorMsg: res.result,
          });
          console.error("articleContent - get error", res);
        }else{
          setFetchDataStatus({
            loadComplete: true,
            gotError: false,
          });
          setArticle(res);
        }
      })
      .catch((error) => {
        console.error("articleContent - get  error", error);
      });
  }, []);

  const renderArticleContent = () => {
    if (fetchDataStatus.gotError === true) return <ErrorPage msg={fetchDataStatus.errorMsg}/>;
    if (fetchDataStatus.loadComplete === false) return <LoadingPage />;

    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="title" content={article.title} />
          <meta
            name="description"
            content={`批踢踢-鄉民之力 (pttwebs.com)${article.content
              .substring(0, 150)
              .replace(/(\r\n|\n|\r)/gm, "")}`}
          />
          <title>批踢踢-鄉民之力</title>
        </Helmet>
        <ArticleContentContainer>
          <div className="leftContent">
            <div className="articleDetail">
              <div className="authorContainer">
                <div className="field">作者</div>
                <div className="author">{article.author}</div>
                <div className="field">看板</div>
                <div className="board">{article.kind}</div>
              </div>
              <div className="titleContainer">
                <div className="field">標題</div>
                <div className="title">{article.title}</div>
              </div>
              <div className="createDateContainer">
                <div className="field">時間</div>
                <div className="createDate">{article.release_time}</div>
              </div>
            </div>
            <div className="articleContent">{article.content}</div>
            <div className="responseDisabledInfo">推文自動更新已關閉</div>
          </div>
          <AdContent />
        </ArticleContentContainer>
      </div>
    )


  }

  return (
    <>
      {renderArticleContent()}
    </>
  );
};

export default ArticleContent;
