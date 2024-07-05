import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addItemsInCart } from "../Redux/cartData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWishlistitems } from "../Redux/wishlistSlice";
import { TbZoom } from "react-icons/tb";
import data from "../data.json";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface Idatas {
  datas: Product[];
}
interface IState {
  arrangement: string;
}
interface IData {
  cart: Product[];
  wishlist: Product[];
}
export default function Discount() {
  let dispatch = useDispatch();
  const dataSelector = useSelector((state: Idatas) => state.datas);
  let cartItems = useSelector((state: IData) => state.cart);
  let wishlistItems = useSelector((state: IData) => state.wishlist);

  const arrangementSelector = useSelector((state: IState) => state.arrangement);

  const { page } = useParams();

  let product = dataSelector.filter((item: Product) => item.page === page);

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
    let findIndex = data.products.find((item) => item.id === id);

    setZoomImg(findIndex?.img[0]);
  };

  return (
    <ProductsPar arrangementselector={arrangementSelector}>
      {/* if product length is less then 1 display the error */}
      {product.length < 1 && <ErrorDiv>Product not found</ErrorDiv>}

      {zoomImg && (
        <ZoomImgPar onClick={() => setZoomImg("")}>
          <button className="closeZoom">
            <IoCloseSharp />
          </button>
          <img src={zoomImg} onClick={(e) => e.stopPropagation()} />
        </ZoomImgPar>
      )}

      {product.map((item: Product, index) => {
        return (
          <ShoppingItem key={index} arrangementselector={arrangementSelector}>
            <div className="itemHead">
              <div className="zoom-wish">
                <button
                  onClick={() => {
                    const wishlistItem = wishlistItems.find(
                      (wishlistItm) => wishlistItm.id === item.id
                    );
                    if (!wishlistItem) {
                      dispatch(addWishlistitems(item.id));
                      wishListProductaddNotification();
                    } else {
                      wishListProductaddedNotification();
                    }
                  }}
                  className="wishlistBtn"
                >
                  <FaRegHeart />
                </button>

                <button className="zoomBtn" onClick={() => ImageZoom(item.id)}>
                  <TbZoom />
                </button>
              </div>
            </div>
            <Link to={`/item/${item.id}`}>
              <img
                src={item.img[0]}
                alt="product item img"
                className="ItemImg"
              />
            </Link>
            <div className="productOptions">
              <h3>{item.name}</h3>
              <div className="price-addCartBtn">
                <span>${item.price}</span>

                <button
                  className="addCartBtn"
                  onClick={() => {
                    const cartItem = cartItems.find(
                      (cartItem) => cartItem.id === item.id
                    );
                    if (!cartItem) {
                      dispatch(addItemsInCart(item.id));
                      ProductaddNotification();
                    } else {
                      ProductaddedNotification();
                    }
                  }}
                >
                  <FaCartShopping />
                </button>
              </div>
            </div>
          </ShoppingItem>
        );
      })}
      <ToastContainer closeOnClick />
    </ProductsPar>
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
    object-fit: contain;
  }
`;

const ErrorDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: red;
  font-weight: bold;
`;

const ProductsPar = styled.div<{ arrangementselector: string }>`
  position: relative;
  background-color: #f6f9fc;
  padding: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.arrangementselector === "grid" && "repeat(3,1fr)"};
  height: max-content;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: ${(props) =>
      props.arrangementselector === "grid" && "repeat(2,1fr)"};
  }

  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 50px 0;
  }
`;

const ShoppingItem = styled.div<{ arrangementselector: string }>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.arrangementselector === "grid" && "column"};
  align-items: ${(props) => props.arrangementselector === "list" && "center"};
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  border-radius: 5px;
  &:hover .itemHead .zoom-wish .wishlistBtn {
    opacity: 1;
  }
  &:hover .itemHead .zoom-wish .zoomBtn {
    opacity: 1;
  }
  .itemHead {
    width: ${(props) => props.arrangementselector === "grid" && "100%"};
    margin-top: ${(props) => props.arrangementselector === "list" && "-20px"};
    order: ${(props) => props.arrangementselector === "list" && "1"};

    .zoom-wish {
      display: flex;
      justify-content: right;
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

  .ItemImg {
    display: block;
    margin: 0 auto;
    height: 200px;
    width: 100%;
    object-fit: contain;
    padding: 20px;
    transition: 0.5s ease;
  }

  .productOptions {
    padding: 20px 10px 5px 10px;
    display: ${(props) => props.arrangementselector === "list" && "flex"};
    justify-content: ${(props) =>
      props.arrangementselector === "list" && "space-between"};
    width: ${(props) => props.arrangementselector === "list" && "58%"};
    align-items: center;

    @media screen and (max-width: 1000px) {
      font-size: 14px;
    }

    .price-addCartBtn {
      display: flex;
      flex-direction: ${(props) =>
        props.arrangementselector === "list" && "column"};
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      button {
        background-color: transparent;
        padding: 5px;
        border: none;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
`;
