import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const BoardItemLink = styled(Link)`
  display: flex;
  width: 800px;
  font-size: 20px;
  line-height: 30px;
  color: #bbb;
  &:hover{
    color: #888;
    background-color: #ccc;
  }
  .board-name{
    width: 8em;
  }
  .board-activeUser{
    width: 4em;
  }
  .board-category{
    width: 3em;
  }
`

const BoardItem = (props) => {
  const { boardName, activeUser, category, title } = props;
  const userColor = getUserColor(activeUser);

  return (
    <BoardItemLink to={`ArticleList/${boardName}`} state={{boardName: boardName}}>
      <div className="board-name">{boardName}</div>
      <div className="board-activeUser" style={{color:userColor}}>{activeUser}</div>
      <div className="board-category">{category}</div>
      <div className="board-title">{title}</div>
    </BoardItemLink>
  );
};

function getUserColor(activeUser){
  if (activeUser >= 100000 ) return '#f6f';
  if (activeUser >= 60000 && activeUser <= 99999 ) return '#ff6';
  if (activeUser >= 30000 && activeUser <= 59999 ) return '#6f6';
  if (activeUser >= 10000 && activeUser <= 29999 ) return '#6ff';

  if (activeUser >= 5000 && activeUser <= 9999 ) return '#66f';
  if (activeUser >= 2000 && activeUser <= 4999 ) return '#f66';

  if (activeUser >= 1000 && activeUser <= 1999 ) return '#fff';
  if (activeUser >= 100 && activeUser <= 999 ) return '#fff';
  if (activeUser >= 50 && activeUser <= 99 ) return '#f66';
  if (activeUser >= 11 && activeUser <= 49 ) return '#bbb';
  if (activeUser >= 1 && activeUser <= 10 ) return '#ff6';
  return '#000';
}

export default BoardItem;
