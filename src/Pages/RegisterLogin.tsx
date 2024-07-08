import styled from "styled-components";
import Login from "../Components/Login";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Register from "../Components/Register";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function RegisterLogin() {
  const { LoginRegister } = useParams();

  return (
    <LoginregisterContainer>
      <Link to={"/"} className="homeButton">
        Back to Home <FaHome />
      </Link>
      <div className="LoginHeader">
        <Link
          to={"/Login"}
          className={LoginRegister === "Login" ? "Login" : ""}
        >
          Login
        </Link>
        <Link
          to={"/Register"}
          className={LoginRegister === "Register" ? "Register" : ""}
        >
          Registration
        </Link>
      </div>
      {LoginRegister === "Login" ? <Login /> : <Register />}

      <div className="line">or</div>

      <div className="google-facebook">
        <button className="facebook">
          <FaFacebook />
          Facebook
        </button>
        <button className="google">
          <FaGoogle />
          Google
        </button>
      </div>
    </LoginregisterContainer>
  );
}

const LoginregisterContainer = styled.div`
  padding: 20px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: 350px;

  @media screen and (max-width: 430px) {
    max-width: 100%;

    padding: 20px 5px;
  }

  .homeButton {
    text-decoration: none;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: green;
  }

  .LoginHeader {
    display: flex;
    gap: 25px;
    padding: 15px 0;
    margin-bottom: 10px;

    a {
      text-decoration: none;
      text-align: center;
      position: relative;
      padding: 10px;
      width: 50%;
      font-weight: bold;
      font-size: 15px;
      letter-spacing: 2.5px;
      cursor: pointer;
      color: gray;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -5px;
        transform: translateX(-50%);
        height: 1px;
        background-color: gray;
        width: 100%;
      }
    }
  }
  .Login {
    color: black !important;

    &:after {
      height: 2px !important;
      background-color: black !important;
    }
  }
  .Register {
    color: black !important;

    &:after {
      height: 2px !important;
      background-color: black !important;
    }
  }

  .line {
    position: relative;
    margin: 20px 0;
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      width: 45%;
      background-color: gray;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      width: 45%;
      background-color: gray;
    }
  }

  .google-facebook {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      font-size: 17px;
      width: 50%;
      padding: 13px;
      background-color: transparent;
      border: 1px solid gray;
      border-radius: 5px;
      transition: 0.3s ease;
    }

    .facebook {
      color: rgb(24, 119, 242);

      &:hover {
        background-color: rgb(24, 119, 242);
        color: white;
      }
    }
    .google {
      color: rgb(242, 24, 24);

      &:hover {
        background-color: rgb(242, 24, 24);
        color: white;
      }
    }
  }
`;
