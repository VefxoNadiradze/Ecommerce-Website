import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { addItemsInCart } from "../Redux/cartData";
import { ToastContainer, toast } from "react-toastify";
import { removeItemsFromWishlist, clearWishlist } from "../Redux/wishlistSlice";

interface IData {
  wishlist: Product[];
  cart: Product[];
}

export default function Wishlist() {
  const wishlistItems = useSelector((state: IData) => state.wishlist);
  let cartItems = useSelector((state: IData) => state.cart);
  let dispatch = useDispatch();

  let ProductaddNotification = () => {
    toast.success("item succesfully added to cart");
  };
  let ProductaddedNotification = () => {
    toast.warn("The item is already in the cart");
  };

  return (
    <>
      {wishlistItems.length > 0 && (
        <WishlistHeader>
          <span>Clear wishlist</span>
          <button onClick={() => dispatch(clearWishlist())}>
            <FaRegTrashAlt />
          </button>
        </WishlistHeader>
      )}

      <WishlistParent>
        {wishlistItems.length < 1 && <ErrorDiv>Wishlist is empty </ErrorDiv>}
        {wishlistItems.map((item) => {
          return (
            <WishlistItem key={item.id}>
              <div className="itemHeader">
                <button
                  onClick={() => dispatch(removeItemsFromWishlist(item.id))}
                >
                  <FaRegTrashAlt />
                </button>

                <img src={item.img[0]} alt="" />
              </div>
              <div className="productOptions">
                <h3>{item.name}</h3>
                <div className="price-addCartBtn">
                  <span>${item.price}</span>

                  <button
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
                    className="addCartBtn"
                  >
                    <FaCartShopping />
                  </button>
                </div>
              </div>
            </WishlistItem>
          );
        })}
        <ToastContainer closeOnClick />
      </WishlistParent>
    </>
  );
}

const WishlistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 5px 30px;

  button {
    background-color: transparent;
    padding: 5px;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
`;

const WishlistParent = styled.div`
  position: relative;
  background-color: #f6f9fc;
  padding: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: max-content;
  gap: 20px;
  margin-top: 20px;

  @media screen and (max-width: 970px) {
    padding: 50px 10px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 678px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WishlistItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  border-radius: 5px;

  .itemHeader {
    text-align: right;
    button {
      background-color: transparent;
      padding: 5px;
      border: none;
      cursor: pointer;
      font-size: 18px;
    }
  }

  img {
    margin: 0 auto;
    display: block;
    width: 230px;
    height: 230px;
    padding: 20px;
    transition: 0.5s ease;
  }

  .productOptions {
    padding: 20px 10px 5px 10px;

    h3 {
      @media screen and (max-width: 970px) {
        font-size: 15px;
      }

      @media screen and (max-width: 678px) {
        font-size: 14px;
      }
    }
    .price-addCartBtn {
      display: flex;
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

const ErrorDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: red;
  font-weight: bold;
`;
