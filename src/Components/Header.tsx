import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "/Images/logo.webp";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import data from "../data.json";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

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
  let [toggleNav, setToggleNav] = useState<boolean>(false);

  // search items by input
  let findItems = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setHideLinks(true);

    if (value.trim() !== "") {
      let items = data.products.filter((item) => {
        if (
          item.name.toLowerCase().includes(value) ||
          item.category.toLowerCase().includes(value)
        ) {
          setHideLinks(false);
          return item.name;
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
            <button onClick={() => setHideLinks(true)} className="closeLinks">
              <IoMdClose />
            </button>
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
        <button onClick={() => setToggleNav(true)} className="open">
          <GiHamburgerMenu />
        </button>
        <ul className={toggleNav ? "activeNav" : ""}>
          <button onClick={() => setToggleNav(false)} className="close">
            <IoMdClose />
          </button>
          <li>
            {" "}
            <Link to={"/"} onClick={() => setToggleNav(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/Shopping/Electronics`}
              onClick={() => setToggleNav(false)}
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link to={"/Shopping/Fitness"} onClick={() => setToggleNav(false)}>
              Fitness
            </Link>
          </li>
          <li>
            <Link
              to={"/Shopping/Clothes&Shoes"}
              onClick={() => setToggleNav(false)}
            >
              Clothes & Shoes
            </Link>
          </li>
          <li>
            <Link
              to={"/Shopping/Bottles&Bags"}
              onClick={() => setToggleNav(false)}
            >
              Bottles & Bags
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderComponent>
  );
}

const SearchItemsParent = styled.div`
  max-height: 500px;
  overflow-y: auto;
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

  .closeLinks {
    display: flex;
    align-self: end;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    padding: 2px;
    font-weight: bold;
    color: black;

    cursor: pointer;
  }

  @media screen and (max-width: 1150px) {
    width: 70%;
  }

  @media screen and (max-width: 950px) {
    a {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 895px) {
    width: 90%;
  }
  @media screen and (max-width: 755px) {
    top: 180px;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    a {
      padding: 7px 0.2px;
      font-size: 12px;
    }
  }
`;

const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 755px) {
    flex-direction: column;
    gap: 30px;
  }
  .Logo {
    height: 120px;

    @media screen and (max-width: 755px) {
      height: 90px;
    }

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

    @media screen and (max-width: 965px) {
      width: 35%;
    }

    @media screen and (max-width: 835px) {
      width: 30%;
    }

    @media screen and (max-width: 755px) {
      width: 88%;
    }
  }

  .login-cart {
    display: flex;
    align-items: center;
    column-gap: 50px;

    @media screen and (max-width: 755px) {
      margin-top: 10px;
      width: auto;
      justify-content: space-between;
    }

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
      column-gap: 10px;

      a {
        text-decoration: none;
        cursor: pointer;
        background-color: transparent;
        border: none;
        letter-spacing: 1px;
        font-weight: bold;
        font-size: 13px;
        color: black;
      }

      .registerBtn {
        background-color: yellow;
        padding: 8px 5px;
        border-radius: 5px;
        box-shadow: 0px 0px 2px gray;
      }
    }
  }
`;

const HeaderComponent = styled.header`
  padding: 0 50px;

  nav {
    .open {
      display: none;
    }

    @media screen and (max-width: 755px) {
      .open {
        display: block;
        position: absolute;
        right: 50px;
        top: 30px;
        background-color: transparent;
        cursor: pointer;
        border: none;
        color: black;
        font-size: 25px;
      }
    }
    ul {
      display: flex;
      justify-content: center;
      column-gap: 10px;
      list-style: none;
      transition: 0.3s ease;

      .close {
        display: none;
      }

      @media screen and (max-width: 755px) {
        position: fixed;
        width: 100%;
        height: 100vh;
        background-color: black;
        top: 0;
        left: -100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        overflow: scroll;
        padding: 10px;
        z-index: 50;

        .close {
          display: block;
          position: absolute;
          right: 50px;
          top: 30px;
          background-color: transparent;
          cursor: pointer;
          border: none;
          color: white;
          font-size: 25px;
        }

        li {
          a {
            color: white !important;
          }
        }
      }

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
    .activeNav {
      left: 0;
    }
  }
`;
