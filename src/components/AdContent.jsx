import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const StyledAdContent = styled.div`
  position: sticky;
  top: 80px;
  height: 750px;
  width: 150px;
  background-color: #000;
  color: #000;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const AdContent = () => {
  const { API_BASEURL } = useContext(GlobalContext) || {};
  const API_ENDPOINT = `${API_BASEURL}/adInfo`;
  const { boardId } = useParams();
  const [isAdLoadingComplete, setisAdLoadingComplete] = useState(false);
  const [adInfo, setAdInfo] = useState({
    imageUrl: "",
    msg: "",
    redirectUrl: "",
    status: false,
  });

  useEffect(() => {
    fetchArticleList();
  }, []);

  const fetchArticleList = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBody = {
      boardId: boardId ? boardId : "A0",
    };
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          setAdInfo(res);
          setisAdLoadingComplete(true);
        } else {
          console.error("get AdInfo error", res.msg);
        }
      })
      .catch((error) => {
        console.error("get error", error);
      });
  };
  return (
    <StyledAdContent>
      {isAdLoadingComplete && adInfo.status === true ? (
        <a href={adInfo.redirectUrl} target="_blank" rel="noreferrer">
          {boardId === undefined ? (
            <img src={`/AdImages/A0.png`} alt="AdInfo" />
          ) : (
            <img src={`/AdImages/${boardId}.png`} alt="AdInfo" />
          )}
        </a>
      ) : (
        ""
      )}
    </StyledAdContent>
  );
};

export default AdContent;
