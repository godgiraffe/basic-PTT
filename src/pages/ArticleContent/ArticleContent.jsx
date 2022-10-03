import styled from "styled-components/macro";

const ArticleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  .authorContainer{

  }
  .titleContainer{

  }
  .createDateContainer{

  }
  .articleContent{

  }
  .responseDisabledInfo{

  }
`;

const ArticleContent = () => {
  return (
    <ArticleContentContainer>
      <div className="authorContainer">
        <div className="field">作者</div>
        <div className="author"></div>
        <div className="field">看板</div>
        <div className="board"></div>
      </div>
      <div className="titleContainer">
        <div className="field">標題</div>
        <div className="title"></div>
      </div>
      <div className="createDateContainer">
        <div className="field">時間</div>
        <div className="createDate"></div>
      </div>
      <div className="articleContent"></div>
      <div className="responseDisabledInfo"></div>
    </ArticleContentContainer>
  );
};

export default ArticleContent;
