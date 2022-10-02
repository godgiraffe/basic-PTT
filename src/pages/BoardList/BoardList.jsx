import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import BoardItem from "./BoardItem";
import { useState, useEffect } from "react";
import ActionToolbar from "../../components/ActionToolbar";

const BoardListContent = styled.div`
  .content {
    position: relative;
    width: 100vw;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    gap: 100px;
    .boardList {
      max-width: 800px;
    }
  }
`;


const AdContent = styled.div`
  position: sticky;
  top: 80px;
  height: 80vh;
  width: 150px;
  background-color: #ccc;
  color: #000;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const API_ENDPOINT = "http://103.251.113.51:5000/api/hotBoard";
// const API_ENDPOINT = "http://localhost:5000/api/hotBoard";

const BoardList = () => {
  const [boardData, setboardData] = useState([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    fetch(API_ENDPOINT, {method: "GET"})
      .then((res) => res.json())
      .then((res) => {
        setboardData(res.data);
      })
      .catch((error) => {
        console.error("get error", error);
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ActionToolbar />
      <BoardListContent>
        <div className="content">
          <div className="boardList">
            {boardData ? boardData.map((board) => {
              <BoardItem />;
              const { boardId, name, activeUser, category, title } = board;
              return (
                <BoardItem
                  key={boardId}
                  boardId={boardId}
                  name={name}
                  activeUser={activeUser}
                  category={category}
                  title={title}
                />
              );
            }) : ""}
          </div>
          <AdContent>AD Content</AdContent>
        </div>
      </BoardListContent>
    </div>
  );
};

export default BoardList;
