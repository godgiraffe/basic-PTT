import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import moment from "moment";

const StyledArticleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color:#aaa;
  background-color: #111;
  font-size: 20px;
  padding: 4px 8px;
  .titleContent{
    width: 800px;
    .articleTitle{
      color: #aaa;
      &:hover{
        color: #333;
        background-color: #ccc;
      }
    }
  }
  .articleDetailContent{
    display: flex;
    flex-direction: row;
    .author{

    }
    .createDate{
      margin-left: auto;
    }
  }
`;

const ArticleItem = (props) => {
  const { BoardId, ArticleId, ArticleTitle, Author, CreateDate, IsFixed } = props;
  return (
    <StyledArticleItem>
      <div className="titleContent">
        <Link className="articleTitle" to={`/ArticleContent/${BoardId}/${ArticleId}`}>{ArticleTitle}</Link>
      </div>
      <div className="articleDetailContent">
        <div className="author">{Author}</div>
        <div className="createDate">{moment().format('MM/DD', CreateDate)}</div>
      </div>
    </StyledArticleItem>
  );
};

export default ArticleItem;
