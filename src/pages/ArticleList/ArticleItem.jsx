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
  const { boardName, ArticleId, ArticleTitle, Author, CreateDate } = props;
  return (
    <StyledArticleItem>
      <div className="titleContent">
        <Link className="articleTitle" to={`/ArticleContent/${boardName}/${ArticleId}`}>{ArticleTitle}</Link>
      </div>
      <div className="articleDetailContent">
        <div className="author">{Author}</div>
        <div className="createDate">{moment(CreateDate).format('MM/DD')}</div>
      </div>
    </StyledArticleItem>
  );
};

export default ArticleItem;
