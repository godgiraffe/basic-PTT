import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledActionToolbar = styled.div`
  position: sticky;
  top: 40px;
  width: 100vw;
  max-width: 1200px;
  z-index: 1;
  .btn-group {
    padding: 0;
    margin: 0;
    background-color: #000;
    .btn {
      border: 1px solid #666;
      background-color: #444;
      color: #fff;
      height: 100%;
      line-height: 40px;
      font-size: 16px;
      padding: 8px 14px;
      &.active,
      &:hover {
        border: 1px solid #ccc;
        background-color: #bbb;
        color: #000;
      }
    }
  }
`;


const ActionToolbar = () => {
    return (
        <StyledActionToolbar>
          <div className="btn-group">
            <Link to={'/'} className="btn">熱門看板</Link>
          </div>
        </StyledActionToolbar>
    );
}


export default ActionToolbar;