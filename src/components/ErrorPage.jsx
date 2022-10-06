import styled from "styled-components/macro";

const ErrorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
        發生錯誤
    </ErrorPageContainer>
  );
};

export default ErrorPage;
