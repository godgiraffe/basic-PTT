import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleItem from "../pages/ArticleList/ArticleItem";

const FixedContent = () => {
  const { boardName } = useParams();
  const [fixedArticleListData, setFixedArticleListData] = useState([]);

  const API_ENDPOINT = `${process.env.REACT_APP_API_BASEURL}/fixedArticle`;
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBody = {
      boardName: boardName,
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
            return (
              new Date(article1.CreateDate) - new Date(article2.CreateDate)
            );
          });
          setFixedArticleListData(sortedData);
        }
      })
      .catch((error) => {
        console.error("FixedContent - get error", error);
      });
  }, []);

  return (
    <>
      <div style={{ height: "0.5ex", backgroundColor: "#555" }}></div>
      {fixedArticleListData
        ? fixedArticleListData.map((article, key) => {
            const { ArticleId, ArticleTitle, Author, CreateDate } = article;
            return (
              <ArticleItem
                key={key}
                boardName={boardName}
                ArticleId={ArticleId}
                ArticleTitle={ArticleTitle}
                Author={Author}
                CreateDate={CreateDate}
              />
            );
          })
        : ""}
    </>
  );
};

export default FixedContent;
