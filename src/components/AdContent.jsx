
import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useMedia } from "react-use";
import { useParams } from "react-router-dom";

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
  @media ${(props) => props.theme.devices.mobile.mediaQuery} {
      max-width: 485px;
      width: 100vw;
      height: 64px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

const AdContent = () => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_BASEURL}/adInfo`;
  const { boardName } = useParams();
  const [isAdLoadingComplete, setIsAdLoadingComplete] = useState(false);
  const [adInfo, setAdInfo] = useState({
    imgSrc: "",
    msg: "",
    redirectUrl: "",
    alt: "AdInfo",
    status: false,
  });
  const theme = useTheme();
  const isMobile = useMedia(`${theme.devices.mobile.hookMediaQuery}`);
  const isTablet = useMedia(`${theme.devices.tablet.hookMediaQuery}`);
  const platform = isMobile ? "mobile" : isTablet ?  "tablet" : "desktop";

  useEffect(() => {
    fetchAdContentImage();
  }, []);

  const fetchAdContentImage = () => {
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
            const adImageFileName = boardName === undefined ? "Gossiping.png" : `${boardName}.png`;
            const imgSrc = getImgSrc(platform, adImageFileName);
            res["imgSrc"] = imgSrc;
            res["alt"] = "AdInfo";
            setAdInfo(res);
            setIsAdLoadingComplete(true);
          } catch (error) {
            console.error("get Image error", error);
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
        <span style={{ color: "white" }}>廣告招募中</span>
      )}
    </StyledAdContent>
  );
};

const getImgSrc = (platform, adImageFileName) => {
  if (platform === "mobile") return require(`../assetes/adImages/mobile/${adImageFileName}`);
  if (platform === "tablet") return require(`../assetes/adImages/tablet/${adImageFileName}`);
  return require(`../assetes/adImages/desktop/${adImageFileName}`);
}

export default AdContent;
