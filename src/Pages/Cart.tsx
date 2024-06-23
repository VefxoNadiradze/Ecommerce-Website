import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { removeItemsFromCart } from "../Redux/cartData";

import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../Redux/cartData";
import { useState } from "react";

interface IcartData {
  cart: Product[];
}

export default function Cart() {
  let cartItems = useSelector((state: IcartData) => state.cart);
  let dispatch = useDispatch();

  // calculating price
  let [price, setPrice] = useState(
    cartItems.reduce((a, b) => a + b.price * b.quantity!, 0)
  );

  //  remove item from cart
  const handleRemove = (item: Product) => {
    setPrice(price - item.price * item.quantity!);
  };

  return (
    <CartParent>
      {cartItems.length < 1 && (
        <ErrorDiv className="error">Cart is empty</ErrorDiv>
      )}

      <CartItemsPar>
        {cartItems.map((item) => {
          return (
            <CartItem key={item.id}>
              <img src={item.img.img1} alt="" />

              <div className="itemDescription">
                <p className="itemName">{item.name}</p>
                <div className="price-deleteBtn">
                  <div className="itemquantity">
                    <button
                      onClick={() => {
                        dispatch(decrementQuantity(item.id));
                        setPrice((price -= item.price));
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        dispatch(incrementQuantity(item.id));
                        setPrice((price += item.price));
                      }}
                    >
                      +
                    </button>
                  </div>
                  {/* if item quantity is true then multiply */}
                  <span>${item.quantity && item.price * item.quantity}</span>
                  <button
                    className="deletebtn"
                    onClick={() => {
                      dispatch(removeItemsFromCart(item.id));
                      handleRemove(item);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </CartItem>
          );
        })}
      </CartItemsPar>

      {cartItems.length > 0 && (
        <div className="payment-totalprice">
          <div className="clearCart">
            <span>Clear cart</span>
            <button onClick={() => dispatch(clearCart())}>
              <FaRegTrashAlt />
            </button>
          </div>
          {cartItems.length > 0 && (
            <p className="itemslength">
              There is <span>{cartItems.length}</span> item in your cart
            </p>
          )}

          <h3>Payment</h3>

          <div className="totalPrice">
            <span>Total price</span>
            <span>${price}</span>
          </div>

          <button className="checkout">checkout</button>
        </div>
      )}
    </CartParent>
  );
}

const CartParent = styled.div`
  width: 100%;
  padding: 50px 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background-color: #f6f9fc;

  gap: 50px;

  .payment-totalprice {
    box-shadow: 0px 0px 10px gray;
    padding: 20px;
    width: 33%;
    height: max-content;
    border-radius: 5px;

    .clearCart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-bottom: 20px;
      font-weight: bold;

      button {
        background-color: transparent;
        padding: 5px;
        border: none;
        cursor: pointer;
        font-size: 18px;
      }
    }

    .totalPrice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      margin-top: 20px;
    }

    .checkout {
      display: block;
      margin: 20px auto 0 auto;
      padding: 13px 22px;
      font-weight: bold;
      color: white;
      background-color: #b4d984;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background-color: white;
        color: #a2cd6b;
        box-shadow: 0px 0px 8px #a2cd6b;
      }
    }

    .itemslength {
      margin-bottom: 20px;
      font-weight: bold;

      span {
        font-size: 20px;
      }
    }
  }
`;

const ErrorDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: red;
  font-weight: bold;
`;

const CartItemsPar = styled.div`
  display: flex;
  width: max-content;
  flex-direction: column;
  gap: 20px;
  background-color: #f6f9fc;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  border-radius: 5px;
  height: 100%;

  img {
    display: block;
    width: 200px;
    height: 200px;
    padding: 20px;
    transition: 0.5s ease;
  }

  .itemDescription {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      font-size: 15px;
      font-weight: bold;
      width: 362px;
      word-wrap: wrap;
    }

    .price-deleteBtn {
      display: flex;
      align-items: center;
      gap: 20px;
      button {
        background-color: transparent;
        padding: 5px;
        border: none;
        cursor: pointer;
        font-size: 18px;
      }
    }

    .itemquantity {
      display: flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0px 0px 5px gray;
      border-radius: 5px;
    }
  }
`;
