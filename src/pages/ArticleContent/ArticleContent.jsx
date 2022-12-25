import { useState, useEffect } from "react";
import { useMedia } from "react-use";
import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components/macro";
import parse from 'html-react-parser';
import AdContent from "../../components/AdContent";
import { Helmet } from "react-helmet";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";

const ArticleContentContainer = styled.div`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    flex-direction: column;
    gap: 0px;
  }
  @media ${(props) => props.theme.devices.mobile.mediaQuery} {
    flex-direction: column;
    gap: 0px;
  }
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
          flex-shrink: 0;
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
      .mobileAuthorContainer,
      .mobileBoardContainer {
        display: flex;
        flex-direction: row;
        color: #999;
        background-color: #008;
        .field {
          padding: 0 12px;
          color: #008;
          background-color: #999;
          flex-shrink: 0;
        }
        .author,
        .board {
          padding: 0 12px;
        }
      }
    }
    .articleContent {
      margin-top: 1em;
      background-color: #000;
      color: #999;
      white-space: pre-line;
      max-width: inherit;
      @media ${(props) => props.theme.devices.tablet.mediaQuery} {
        padding: 1em;
        word-break: break-all;
      }
      @media ${(props) => props.theme.devices.mobile.mediaQuery} {
        padding: 1em;
        word-break: break-all;
      }
      img {
        max-width: inherit;
      }
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
  const { boardName, ArticleId } = useParams();
  const API_ENDPOINT = `${process.env.REACT_APP_API_BASEURL}/getArticle/${boardName}/${ArticleId}`;
  const theme = useTheme();
  const isMobile = useMedia(`${theme.devices.mobile.hookMediaQuery}`);

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
        } else {
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
    if (fetchDataStatus.gotError === true) return <ErrorPage msg={fetchDataStatus.errorMsg} />;
    if (fetchDataStatus.loadComplete === false) return <LoadingPage />;

    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <meta property="og:site_name" content="批踢踢-鄉民之力"></meta>
          <meta property="og:title" content={article.title} />
          <meta
            property="og:description"
            content={`${article.content.substring(0, 150).replace(/(\r\n|\n|\r)/gm, "")}`}
          />
          <meta name="keywords" content="Ptt BBS 批踢踢 鄉民之力" />
          <meta name="title" content={article.title} />
          <meta name="description" content={`${article.content.substring(0, 150).replace(/(\r\n|\n|\r)/gm, "")}`} />
          <title>
            {article.title} - 看板{article.kind} - 批踢踢-鄉民之力
          </title>
        </Helmet>
        <ArticleContentContainer>
          <div className="leftContent">
            <div className="articleDetail">
              {isMobile ? (
                <>
                  <div className="mobileAuthorContainer">
                    <div className="field">作者</div>
                    <div className="author">{article.author}</div>
                  </div>
                  <div className="mobileBoardContainer">
                    <div className="field">看板</div>
                    <div className="board">{article.kind}</div>
                  </div>
                </>
              ) : (
                <div className="authorContainer">
                  <div className="field">作者</div>
                  <div className="author">{article.author}</div>
                  <div className="field">看板</div>
                  <div className="board">{article.kind}</div>
                </div>
              )}
              <div className="titleContainer">
                <div className="field">標題</div>
                <div className="title">{article.title}</div>
              </div>
              <div className="createDateContainer">
                <div className="field">時間</div>
                <div className="createDate">{article.release_time}</div>
              </div>
            </div>
            <div className="articleContent">{parse(addImgTag(article.content))}</div>
            <div className="responseDisabledInfo">推文自動更新已關閉</div>
          </div>
          <AdContent />
        </ArticleContentContainer>
      </div>
    );
  };

  return <>{renderArticleContent()}</>;
};

const addImgTag = (content, startPosition = 0) => {
  let httpPosition = content.indexOf("http", startPosition);
  while (httpPosition !== -1) {
    let endPositionArr = [];
    content.indexOf(" ", httpPosition) !== -1 && endPositionArr.push(content.indexOf(" ", httpPosition));
    content.indexOf("\r", httpPosition) !== -1 && endPositionArr.push(content.indexOf("\r", httpPosition));
    content.indexOf("\n", httpPosition) !== -1 && endPositionArr.push(content.indexOf("\n", httpPosition));
    let endPosition = endPositionArr.sort((a, b) => a - b)[0];
    let prevContent = content.slice(0, httpPosition);
    let urlPattern = content.slice(httpPosition, endPosition);
    let afterContent = content.slice(endPosition, content.length);
    const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlPattern);
    if (isImage === true){
      content = prevContent + `${urlPattern}\n<img src="${urlPattern}" />` + afterContent;
    }
    startPosition = endPosition;
    httpPosition = content.indexOf("http", startPosition);
  }

  return content;
};
export default ArticleContent;
