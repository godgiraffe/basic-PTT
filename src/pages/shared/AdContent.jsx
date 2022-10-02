
import styled from "styled-components";

const StyledAdContent = styled.div`
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

const AdContent = () => {
  return <StyledAdContent>AD Content</StyledAdContent>;
};


export default AdContent;