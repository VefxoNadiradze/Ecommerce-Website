import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

export default function PageNotFound() {
  return (
    <ErrorDiv>
      <h2>404</h2>
      <p>Page Not Found</p>
      <Link to={"/"}>
        Back to Home <FaHome />
      </Link>
    </ErrorDiv>
  );
}

const ErrorDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  h2 {
    font-size: 150px;
    color: red;
  }

  p {
    font-size: 28px;
    color: red;
    font-weight: bold;
  }

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-size: 17px;
    color: green;
    font-weight: bold;
  }
`;
