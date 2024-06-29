import styled from "styled-components";
import Productdata from "../data.json";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addItemsInCart } from "../Redux/cartData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWishlistitems } from "../Redux/wishlistSlice";
import { TbZoom } from "react-icons/tb";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface IData {
  cart: Product[];
  wishlist: Product[];
}
export default function Discount() {
  let cartItems = useSelector((state: IData) => state.cart);
  let wishlistItems = useSelector((state: IData) => state.wishlist);

  let dispatch = useDispatch();

  let ProductaddNotification = () => {
    toast.success("item succesfully added to cart");
  };
  let ProductaddedNotification = () => {
    toast.warn("The item is already in the cart");
  };

  let wishListProductaddNotification = () => {
    toast.success("item succesfully added to wishlist");
  };
  let wishListProductaddedNotification = () => {
    toast.warn("The item is already in the wishlist");
  };

  let [zoomImg, setZoomImg] = useState<string | undefined>();
  const ImageZoom = (id: string) => {
    let findIndex = Productdata.discount.find((item) => item.id === id);

    setZoomImg(findIndex?.img[0]);
  };

  return (
    <>
      <DiscountTitle>Discount</DiscountTitle>
      {zoomImg && (
        <ZoomImgPar onClick={() => setZoomImg("")}>
          <button className="closeZoom">
            <IoCloseSharp />
          </button>
          <img src={zoomImg} onClick={(e) => e.stopPropagation()} />
        </ZoomImgPar>
      )}
      <DiscountComponent>
        {Productdata.discount.map((discountItem) => {
          return (
            <div key={discountItem.id} className="discountCard">
              <div className="cardHeader">
                <span>50% Off</span>
                <div className="zoom-wish">
                  <button
                    onClick={() => {
                      const wishlistItem = wishlistItems.find(
                        (wishlistItm) => wishlistItm.id === discountItem.id
                      );
                      if (!wishlistItem) {
                        dispatch(addWishlistitems(discountItem.id));
                        wishListProductaddNotification();
                      } else {
                        wishListProductaddedNotification();
                      }
                    }}
                    className="wishlistBtn"
                  >
                    <FaRegHeart />
                  </button>
                  <button
                    className="zoomBtn"
                    onClick={() => ImageZoom(discountItem.id)}
                  >
                    <TbZoom />
                  </button>
                </div>
              </div>
              <Link to={`/item/${discountItem.id}`}>
                <img src={discountItem.img[0]} alt="product item image" />
              </Link>

              <div className="ItemOptions">
                <p className="itemName">{discountItem.name}</p>

                <div className="itemPrice-cartBtn">
                  <div className="pricePar">
                    <span className="itemOldPrice">
                      ${discountItem.oldprice}
                    </span>
                    <span className="ItemPrice">${discountItem.price}</span>
                  </div>
                  <button
                    className="addCartBtn"
                    onClick={() => {
                      const cartItem = cartItems.find(
                        (cartItem) => cartItem.id === discountItem.id
                      );
                      if (!cartItem) {
                        dispatch(addItemsInCart(discountItem.id));
                        ProductaddNotification();
                      } else [ProductaddedNotification()];
                    }}
                  >
                    <FaCartShopping />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <ToastContainer closeOnClick />
      </DiscountComponent>
    </>
  );
}

const ZoomImgPar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #0000007f;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  .closeZoom {
    position: absolute;
    right: 150px;
    top: 50px;
    color: white;
    font-size: 35px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  img {
    width: 35%;
    height: 65%;
  }
`;
const DiscountComponent = styled.div`
  max-width: 100%;
  margin: 30px auto 0 auto;
  display: grid;
  column-gap: 50px;
  row-gap: 30px;
  grid-template-columns: repeat(3, 400px);
  justify-content: center;
  padding: 100px 0;
  background-color: #f6f9fc;
  .discountCard {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 10px gray;
    border-radius: 5px;

    &:hover .cardHeader .zoom-wish .wishlistBtn {
      opacity: 1;
    }
    &:hover .cardHeader .zoom-wish .zoomBtn {
      opacity: 1;
    }

    .cardHeader {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      span {
        background-color: #0e3460;
        color: white;
        padding: 4px;
        font-size: 12px;
        border-radius: 15px;
      }
      .zoom-wish {
        display: flex;
        align-items: center;
        gap: 5px;
        .wishlistBtn {
          background-color: transparent;
          border: none;
          padding: 5px;
          cursor: pointer;
          font-size: 17px;
          opacity: 0;
          transition: 0.5s ease;
        }

        .zoomBtn {
          padding: 5px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 17px;
          opacity: 0;
          transition: 0.5s ease;
        }
      }
    }

    img {
      display: block;
      height: 150px;
      margin: 0 auto;
      transition: 0.5s ease-in-out;
      overflow: hidden;
      padding: 10px;

      &:hover {
        transform: scale(1.2);
      }
    }

    .ItemOptions {
      margin-bottom: 0px;
      padding: 20px 10px 5px 10px;
      .itemName {
        font-weight: bold;
      }

      .itemPrice-cartBtn {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .pricePar {
          display: flex;
          gap: 10px;
          .itemOldPrice {
            color: gray;
            text-decoration: line-through;
          }

          .ItemPrice {
            background-color: green;
            padding: 2px 10px;
            border-radius: 15px;
            color: white;
          }
        }

        .addCartBtn {
          background-color: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
`;

const DiscountTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin-top: 70px;
  font-size: 30px;
`;
