import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const { boardId } = useParams();
  const [articleListData, setArticleListData] = useState([]);

  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
    };

    const postBody = {
      boardId: boardId,
      page: page ? page : 2,
      searchKey: searchKey ? searchKey : "",
    };
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("ArticleListData", res);
        setArticleListData(res.data);
      })
      .catch((error) => {
        console.error("get error", error);
      });
  }, []);

  return (
    <>
      <ActionToolbar />
      <ArticleListContainer>
        <div className="articleContent">
          <div className="articleList">
            <div className="searchbar">
              <input type="text" id="searchKey" placeholder="搜尋文章..." />
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
