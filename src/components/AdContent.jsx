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
  const { boardName } = useParams();
  const [isAdLoadingComplete, setIsAdLoadingComplete] = useState(false);
  const [adInfo, setAdInfo] = useState({
    imgSrc: "",
    msg: "",
    redirectUrl: "",
    alt: "AdInfo",
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
      boardName: boardName ? boardName : "Gossiping",
    };
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          try {
            const adImageFileName = boardName === undefined ? 'Gossiping.png' : `${boardName}.png`;
            const imgSrc = require(`../assetes/adImages/${adImageFileName}`);
            console.log('imgSrc', imgSrc)
            res['imgSrc'] = imgSrc;
            res['alt'] = "AdInfo";
            setAdInfo(res);
            setIsAdLoadingComplete(true);
          } catch (error) {
            console.log('get Image error', error);
          }
        } else {
          console.error("get AdInfo error", res.msg);
        }
      })
      .catch((error) => {
        console.error("AdComtent - get error", error);
      });
  };
  return (
    <StyledAdContent>
      {isAdLoadingComplete && adInfo.status === true ? (
        <a href={adInfo.redirectUrl} target="_blank" rel="noreferrer">
          <img src={adInfo.imgSrc} alt={adInfo.alt} />
        </a>
      ) : (
        <span style={{color:'white'}}>廣告招募中</span>
      )}
    </StyledAdContent>
  );
};

export default AdContent;
