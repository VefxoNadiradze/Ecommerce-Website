import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "/Images/logo.webp";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
export default function Header() {
  return (
    <HeaderComponent>
      <HeaderTop>
        <Link className="Logo" to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>

        <form className="searchParent">
          <input type="text" placeholder="Search..." />
          <GoSearch className="searchIcon" />
        </form>

        <div className="login-cart">
          <div className="cart-wishlist">
            <Link to={"/"}>
              <FaRegHeart />
            </Link>
            <Link to={"/"}>
              <FaCartShopping />
            </Link>
          </div>

          <div className="signIn-signUp">
            <button className="SignInbtn">Sign in</button>
            <button className="SignUpbtn">Sign up</button>
          </div>
        </div>
      </HeaderTop>
      <nav>
        <ul>
          <li>
            {" "}
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={`/Shopping/Electronics`}>Electronics</Link>
          </li>
          <li>
            <Link to={"/Shopping/Fitness"}>Fitness</Link>
          </li>
          <li>
            <Link to={"/Shopping/Clothes&Shoes"}>Clothes & Shoes</Link>
          </li>
          <li>
            <Link to={"/Shopping/Bottles&Bags"}>Bottles & Bags</Link>
          </li>
        </ul>
      </nav>
    </HeaderComponent>
  );
}

const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .Logo {
    height: 120px;

    img {
      height: 100%;
    }
  }

  .searchParent {
    position: relative;
    width: 45%;
    input {
      width: 100%;
      padding: 15px 20px;
      outline: none;
      border-radius: 25px;
      font-size: 15px;
      border: none;
      background-color: #f2f2f2;
    }
    .searchIcon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }

  .login-cart {
    display: flex;
    align-items: center;
    column-gap: 50px;

    .cart-wishlist {
      display: flex;
      align-items: center;
      column-gap: 10px;

      a {
        font-size: 17px;
      }
    }

    .signIn-signUp {
      display: flex;
      align-items: center;
      column-gap: 15px;

      button {
        cursor: pointer;
        background-color: transparent;
        border: none;
      }

      .SignInbtn {
        background-color: yellow;
        padding: 10px;
        font-weight: bold;
        border-radius: 5px;
        box-shadow: 0px 0px 2px gray;
      }
    }
  }
`;

const HeaderComponent = styled.header`
  padding: 0 20px;

  nav {
    ul {
      display: flex;
      justify-content: center;
      column-gap: 10px;
      list-style: none;
      li {
        a {
          display: block;
          padding: 5px;
          color: black;
          position: relative;
          text-decoration: none;
          font-weight: bold;

          &:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            width: 100%;
            border-radius: 15px;
            background-color: black;
            opacity: 0;
          }

          @keyframes animate {
            0% {
              left: -100px;
              opacity: 0;
            }
            33% {
              left: 20px;
              opacity: 1;
            }
            66% {
              left: -20px;
              opacity: 1;
            }
            100% {
              left: 0px;
              opacity: 1;
            }
          }

          &:hover:after {
            animation: animate 0.5s ease forwards;
          }
        }
      }
    }
  }
`;
