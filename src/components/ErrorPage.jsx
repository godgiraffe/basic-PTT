import styled from "styled-components/macro";

const ErrorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 6em;
  color: #FFF;
`;

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
        發生錯誤
    </ErrorPageContainer>
  );
};

export default ErrorPage;
