import styled from "styled-components/macro";
import BoardItem from "./BoardItem";
import { useState, useEffect } from "react";
import ActionToolbar from "../../components/ActionToolbar";
import AdContent from "../../components/AdContent";
import { Helmet } from "react-helmet";

const BoardListContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 100px;
  @media ${(props) => props.theme.devices.tablet.mediaQuery} {
    flex-direction: column;
    gap: 4px;
  }
  .boardList {
    max-width: 800px;
    min-width: 485px;
    @media ${(props) => props.theme.devices.tablet.mediaQuery} {
      max-width: 800px;
      width: 800px;
    }
  }
`;

const BoardList = () => {
  const [boardData, setboardData] = useState([]);
  const API_ENDPOINT = `${process.env.REACT_APP_API_BASEURL}/hotBoard`;

  useEffect(() => {
    fetch(API_ENDPOINT, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          const baordData = res.data.sort((prevItem, nextItem) => {
            const prevItem_activeUser = parseInt(prevItem.activeUser);
            const nextItem_activeUser = parseInt(nextItem.activeUser);
            if (prevItem_activeUser > nextItem_activeUser) return -1;
            if (prevItem_activeUser < nextItem_activeUser) return 1;
            return 0;
          });
          setboardData(baordData);
        } else {
          console.error(
            "BoardList - get error",
            `status: ${res.status}, msg: ${res.msg}`
          );
        }
      })
      .catch((error) => {
        console.error("BoardList - get error", error);
      });
  }, []);

  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:site_name" content="批踢踢-鄉民之力 熱門看板"></meta>
        <meta property="og:title" content="批踢踢-鄉民之力 熱門看板" />
        <meta name="title" content="批踢踢-鄉民之力 熱門看板" />
        <meta name="description" content="批踢踢-鄉民之力 熱門看板" />
        <title>批踢踢-鄉民之力 熱門看板</title>
      </Helmet>

      <div style={{ position: "relative" }}>
        <ActionToolbar />
        <BoardListContainer>
          <div className="boardList">
            {boardData
              ? boardData.map((board, key) => {
                  <BoardItem />;
                  const {
                    name: boardName,
                    activeUser,
                    category,
                    title,
                  } = board;
                  return (
                    <BoardItem
                      key={key}
                      boardName={boardName}
                      activeUser={activeUser}
                      category={category}
                      title={title}
                    />
                  );
                })
              : ""}
          </div>
          <AdContent />
        </BoardListContainer>
      </div>
    </div>
  );
};

export default BoardList;
