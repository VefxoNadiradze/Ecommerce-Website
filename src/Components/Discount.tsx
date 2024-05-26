import styled from "styled-components";
import Productdata from "../data.json";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Discount() {
  return (
    <>
      <DiscountTitle>Discount</DiscountTitle>

      <DiscountComponent>
        {Productdata.discount.map((discountItem) => {
          return (
            <div key={discountItem.id} className="discountCard">
              <div className="cardHeader">
                <span>50% Off</span>
                <button className="wishlistBtn">
                  <FaRegHeart />
                </button>
              </div>
              <Link to={"/"}>
                <img src={discountItem.img.img1} alt="product item image" />
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
                  <button className="addCartBtn">
                    <FaCartShopping />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </DiscountComponent>
    </>
  );
}

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

    &:hover .cardHeader .wishlistBtn {
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
      .wishlistBtn {
        background-color: transparent;
        border: none;
        padding: 5px;
        cursor: pointer;
        font-size: 17px;
        opacity: 0;
        transition: 0.5s ease;
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
