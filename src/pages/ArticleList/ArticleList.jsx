import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ActionToolbar from "../../components/ActionToolbar";
import ArticleItem from "./ArticleItem";
import AdContent from "../shared/AdContent";

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
    }
  }
`;

const API_ENDPOINT = "http://103.251.113.51:5000/api/getArticleList";

const ArticleList = (props) => {
  const { boardName, page, searchKey } = props;
  const location = useLocation();
  const { boardId: boardIdFromState, page: pageFormState } =
    location.state || {};
  const { boardId } = useParams();
  const [articleListData, setArticleListData] = useState([]);
  const [pageStatus, setPageStatus] = useState({
    nowPage: 0,
    totalPage: 0,
    searchKey: "",
  });
  const gotoPage = pageFormState ? pageFormState : page ? page : 0;

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBody = {
      boardId: boardIdFromState ? boardIdFromState : boardId,
      page: gotoPage,
      searchKey: searchKey ? searchKey : "",
    };
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          setArticleListData(res.data);
          setPageStatus({
            nowPage: postBody.page,
            totalPage: res.totalPage,
          });
        } else {
          console.error("get error", res.msg);
        }
      })
      .catch((error) => {
        console.error("get error", error);
      });
  }, [gotoPage, searchKey]);


  const handleSearchKeyOnKeyUp = (e) => {
    // press enter
    if (e.keyCode === 13) {
      const searchKey = e.target.value;
      setPageStatus((prevPageStatus) => {
        return {
          ...prevPageStatus,
          searchKey,
        };
      });
    }
  };

  return (
    <>
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
            {articleListData
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
              : ""}
          </div>
          <AdContent />
        </div>
      </ArticleListContainer>
    </>
  );
};

export default ArticleList;
