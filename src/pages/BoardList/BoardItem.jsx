import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import styled, { useTheme } from "styled-components/macro";

const BoardItemLink = styled(Link)`
  display: flex;
  width: 800px;
  @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    width: 800px;
  }
  @media ${(props) => props.theme.devices.mobile.mediaQuery} {
    flex-direction: column;
    width: 100vw;
    max-width: 485px;
    margin: 8px 4px;
    background-color: #111;
    .boardInfoContainer{
      display: flex;
      flex-direction: row;
    }
  }
  font-size: 20px;
  line-height: 30px;
  color: #bbb;
  &:hover {
    color: #888;
    background-color: #ccc;
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      color: #bbb;
      background-color: #111;
    }
  }
  .board-name {
    width: 8em;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      width: 60vw;
      color: #fff;
    }
  }
  .board-activeUser {
    width: 6em;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      width: 20vw;
    }
  }
  .board-category {
    width: 3em;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      margin-left: auto;
      padding-right: 4px;
      width: fit-content;
    }
  }
  .board-title {
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    }
    @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      font-size: 16px;
    }
  }
`;

const BoardItem = (props) => {
  const { boardName, activeUser, category, title } = props;
  const userColor = getUserColor(activeUser);
  const theme = useTheme();
  const isMobile = useMedia(`${theme.devices.mobile.hookMediaQuery}`);

  return (
    <BoardItemLink
      to={`ArticleList/${boardName}`}
      state={{ boardName: boardName }}
    >
      {isMobile ? (
        <>
          <div className="boardInfoContainer">
            <div className="board-name">{boardName}</div>
            <div className="board-activeUser" style={{ color: userColor }}>
              {activeUser}
            </div>
            <div className="board-category">{category}</div>
          </div>
          <div className="board-title">{title}</div>
        </>
      ) : (
        <>
          <div className="board-name">{boardName}</div>
          <div className="board-activeUser" style={{ color: userColor }}>
            {activeUser}
          </div>
          <div className="board-category">{category}</div>
          <div className="board-title">{title}</div>
        </>
      )}
    </BoardItemLink>
  );
};

function getUserColor(activeUser) {
  if (activeUser >= 100000) return "#f6f";
  if (activeUser >= 60000 && activeUser <= 99999) return "#ff6";
  if (activeUser >= 30000 && activeUser <= 59999) return "#6f6";
  if (activeUser >= 10000 && activeUser <= 29999) return "#6ff";

  if (activeUser >= 5000 && activeUser <= 9999) return "#66f";
  if (activeUser >= 2000 && activeUser <= 4999) return "#f66";

  if (activeUser >= 1000 && activeUser <= 1999) return "#fff";
  if (activeUser >= 100 && activeUser <= 999) return "#fff";
  if (activeUser >= 50 && activeUser <= 99) return "#f66";
  if (activeUser >= 11 && activeUser <= 49) return "#bbb";
  if (activeUser >= 1 && activeUser <= 10) return "#ff6";
  return "#000";
}

export default BoardItem;
