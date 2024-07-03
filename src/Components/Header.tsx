import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "/Images/logo.webp";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import data from "../data.json";

interface Idata {
  cart: Product[];
  wishlist: Product[];
}
export default function Header() {
  let cartItems = useSelector((state: Idata) => state.cart);
  let wishlistItems = useSelector((state: Idata) => state.wishlist);
  let [value, setValue] = useState<string>("");
  let [FindItem, setItem] = useState<Product[]>([]);
  let [hideLinksm, setHideLinks] = useState<boolean>(true);

  // search items by input
  let findItems = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setHideLinks(true);

    if (value.trim() !== "") {
      let items = data.products.filter((item) => {
        if (item.name.toLowerCase().includes(value)) {
          setHideLinks(false);
          return item.name.toLowerCase().includes(value);
        }
      });
      setItem(items);
    }
    if (value.length === 1) {
      setHideLinks(true);
    }
  };

  return (
    <HeaderComponent>
      <HeaderTop>
        <Link className="Logo" to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>

        <form className="searchParent">
          <input
            value={value}
            onChange={findItems}
            type="text"
            placeholder="Search..."
          />

          <GoSearch className="searchIcon" />
        </form>
        {hideLinksm === false && (
          <SearchItemsParent>
            {FindItem.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  onClick={() => setHideLinks(true)}
                >
                  {item.name}
                </Link>
              );
            })}
          </SearchItemsParent>
        )}
        <div className="login-cart">
          <div className="signIn-signUp">
            <Link to={"/Login"} className="LoginBtn">
              Login
            </Link>
            <Link to={"/Register"} className="registerBtn">
              Registration
            </Link>
          </div>
          <div className="cart-wishlist">
            <Link to={"/Wishlist"}>
              <span className="CartItemsLength">{wishlistItems.length}</span>
              <FaRegHeart />
            </Link>
            <Link to={"/Cart"}>
              <span className="CartItemsLength">{cartItems.length}</span>
              <FaCartShopping />
            </Link>
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

const SearchItemsParent = styled.div`
  border-radius: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  top: 100px;
  display: flex;
  align-items: left;
  flex-direction: column;
  z-index: 10;
  background-color: white;
  gap: 10px;
  box-shadow: 0px 0px 30px gray;
  padding: 7px;

  a {
    text-decoration: none;
    padding: 2px;
    font-weight: bold;
    color: black;

    cursor: pointer;
  }
`;

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
        position: relative;
        font-size: 17px;

        span {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -12px;
          right: -5px;
          background-color: #b4d984;
          color: white;
          font-size: 10px;
          border-radius: 50%;
          min-width: 14px;
          padding: 1.5px;
          height: 14px;
        }
      }
    }

    .signIn-signUp {
      display: flex;
      align-items: center;
      column-gap: 15px;

      a {
        text-decoration: none;
        cursor: pointer;
        background-color: transparent;
        border: none;
        letter-spacing: 1px;
        font-weight: bold;
        color: black;
      }

      .registerBtn {
        background-color: yellow;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 0px 2px gray;
      }
    }
  }
`;

const HeaderComponent = styled.header`
  padding: 0 50px;

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
