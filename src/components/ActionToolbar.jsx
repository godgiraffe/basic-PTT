import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledActionToolbar = styled.div`
  position: sticky;
  top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vw;
  max-width: 1200px;
  z-index: 1;
  background: #000;
  .btn-group {
    padding: 0;
    margin: 0;
    .btn {
      border: 1px solid #666;
      background-color: #444;
      color: #fff;
      height: 100%;
      line-height: 40px;
      font-size: 16px;
      padding: 8px 14px;
      &.active,
      &:hover {
        border: 1px solid #ccc;
        background-color: #bbb;
        color: #000;
      }
      &.disabled{
        border-color: #111;
        background-color: #222;
        color: #666;
        cursor: default;
      }
    }
  }
`;

const ActionToolbar = (props) => {
  const { boardId, pageStatus } = props;
  const { nowPage, totalPage } = pageStatus || {};
  const prevPage = !nowPage  && nowPage===0 ? totalPage-1 : nowPage-1;
  const nextPage = !nowPage  && nowPage===0 ? -1 : nowPage+1;
  // console.log('!pageStatus', !pageStatus);
  // console.log('pageStatus', pageStatus);
  // console.log('nowPage', nowPage);
  // console.log('totalPage', totalPage);
  // console.log('prevPage', prevPage);
  // console.log('nextPage', nextPage);
  return (
    <StyledActionToolbar>
      <div className="btn-group">
        <Link to={"/"} className="btn">
          熱門看板
        </Link>
      </div>
      {pageStatus ? (
        <div className="btn-group" style={{ marginLeft: "auto" }}>
          <Link
            to={`/ArticleList/${boardId}`}
            state={{ boardId: boardId, page: 1 }}
            className={ nowPage === 1 ? "disabled btn" : "btn"}
          >
            最舊
          </Link>
          <Link
            to={`/ArticleList/${boardId}`}
            state={{ boardId: boardId, page:  prevPage}}
            className={ nowPage === 1 ? "disabled btn" : "btn"}
          >
            ‹ 上頁
          </Link>
          <Link
            to={`/ArticleList/${boardId}`}
            state={{ boardId: boardId, page:  nextPage}}
            className={ nowPage === 0  || nowPage === totalPage ? "disabled btn" : "btn"}
          >
            下頁 ›
          </Link>
          <Link
            to={`/ArticleList/${boardId}`}
            state={{ boardId: boardId, page: 0 }}
            className={ nowPage === 0  || nowPage === totalPage ? "disabled btn" : "btn"}
          >
            最新
          </Link>
        </div>
      ) : (
        ""
      )}
    </StyledActionToolbar>
  );
};

export default ActionToolbar;
