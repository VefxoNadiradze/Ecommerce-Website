import { useParams } from "react-router-dom";
import data from "../data.json";
import styled from "styled-components";
import { FaCartShopping } from "react-icons/fa6";
import { addItemsInCart } from "../Redux/cartData";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { JSX } from "react/jsx-runtime";

interface IData {
  cart: Product[];
}

export default function ItemDetails() {
  const { id } = useParams();
  let ShopingItems = data.products.filter((item: Product) => item.id === id);
  let discountItems = data.discount.filter((item: Product) => item.id === id);
  let cartItems = useSelector((state: IData) => state.cart);
  let dispatch = useDispatch();

  let ProductaddNotification = () => {
    toast.success("item succesfully added to cart");
  };
  let ProductaddedNotification = () => {
    toast.warn("The item is already in the cart");
  };
  const [reviews, setReview] = useState<boolean>(false);

  const stars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<FaStar key={i} />);
  }

  const [currentImage, setCurrentImage] = useState<string>("");

  return (
    <ItemDetailsParent>
      {ShopingItems.length > 0
        ? ShopingItems.map((item) => {
            return (
              <div key={item.id}>
                <AboutItem>
                  <div className="productImage">
                    <img
                      src={
                        currentImage?.length < 1 ? item.img[0] : currentImage
                      }
                      alt=""
                    />

                    <div className="productImages">
                      {item.img.map((itemImg, index) => {
                        return (
                          <img
                            key={index}
                            onClick={() => setCurrentImage(itemImg)}
                            src={itemImg}
                            alt=""
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="itemAbout">
                    <h2>{item.name}</h2>
                    <div className="itemRating">
                      <div className="stars">
                        {stars.map((Staritem, index) => {
                          return (
                            <span
                              className={
                                index < item.ratings ? "yellowStar" : ""
                              }
                              key={index}
                            >
                              {Staritem}
                            </span>
                          );
                        })}
                      </div>
                      <p>
                        {item.ratings}
                        <span> ratings</span>
                      </p>
                    </div>
                    <p className="price">Price: ${item.price}</p>
                    <p className="category">category: {item.category}</p>
                    <button
                      className="addCartBtn"
                      onClick={() => {
                        const cartItem = cartItems.find(
                          (cartItem) => cartItem.id === item.id
                        );
                        if (!cartItem) {
                          dispatch(addItemsInCart(item.id));
                          ProductaddNotification();
                        } else [ProductaddedNotification()];
                      }}
                    >
                      <FaCartShopping />
                    </button>
                  </div>
                </AboutItem>
                <DescriptionReview>
                  <div className="descriptionReviewHeader">
                    <button
                      onClick={() => setReview(false)}
                      className={reviews === false ? "descriptionBtn" : ""}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setReview(true)}
                      className={reviews ? "reviewBtn" : ""}
                    >
                      Review
                    </button>
                  </div>
                  {!reviews ? (
                    <div className="description">
                      <p>{item.description}</p>
                    </div>
                  ) : (
                    item.review.map((Reviewitem, index) => (
                      <div className="review" key={index}>
                        <p className="Rname">{Reviewitem.name}</p>
                        <p className="Rtext">{Reviewitem.text}</p>
                      </div>
                    ))
                  )}
                </DescriptionReview>
                <ToastContainer closeOnClick />
              </div>
            );
          })
        : discountItems.map((item) => {
            return (
              <div key={item.id}>
                <AboutItem>
                  <div className="productImage">
                    <img src={item.img[0]} alt="" />
                  </div>
                  <div className="itemAbout">
                    <h2>{item.name}</h2>
                    <div className="itemRating">
                      <div className="stars">
                        {stars.map((Staritem, index) => {
                          return (
                            <span
                              className={
                                index < item.ratings ? "yellowStar" : ""
                              }
                              key={index}
                            >
                              {Staritem}
                            </span>
                          );
                        })}
                      </div>
                      <p>
                        {item.ratings}
                        <span> ratings</span>
                      </p>
                    </div>
                    <p className="price">Price: ${item.price}</p>
                    <p className="category">category: {item.category}</p>
                    <button
                      className="addCartBtn"
                      onClick={() => {
                        const cartItem = cartItems.find(
                          (cartItem) => cartItem.id === item.id
                        );
                        if (!cartItem) {
                          dispatch(addItemsInCart(item.id));
                          ProductaddNotification();
                        } else [ProductaddedNotification()];
                      }}
                    >
                      <FaCartShopping />
                    </button>
                  </div>
                </AboutItem>
                <DescriptionReview>
                  <div className="descriptionReviewHeader">
                    <button
                      onClick={() => setReview(false)}
                      className={reviews === false ? "descriptionBtn" : ""}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setReview(true)}
                      className={reviews ? "reviewBtn" : ""}
                    >
                      Review
                    </button>
                  </div>
                  {!reviews ? (
                    <div className="description">
                      <p>{item.description}</p>
                    </div>
                  ) : (
                    item.review.map((Reviewitem, index) => (
                      <div className="review" key={index}>
                        <p className="Rname">{Reviewitem.name}</p>
                        <p className="Rtext">{Reviewitem.text}</p>
                      </div>
                    ))
                  )}
                </DescriptionReview>
                <ToastContainer closeOnClick />
              </div>
            );
          })}
    </ItemDetailsParent>
  );
}

const ItemDetailsParent = styled.div`
  padding: 20px 0 50px 0;
  margin-top: 35px;
`;

const DescriptionReview = styled.div`
  width: 70%;
  margin-top: 50px;

  margin-left: 50px;

  .description {
    @media screen and (max-width: 610px) {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-left: 0;
  }
  .review {
    margin: 20px 0;

    display: flex;
    flex-direction: column;
    gap: 5px;

    .Rname {
      font-size: 18px;
      font-weight: bold;
      @media screen and (max-width: 610px) {
        font-size: 15px;
      }
    }
    .Rtext {
      font-size: 14px;
      @media screen and (max-width: 610px) {
        font-size: 13px;
      }
    }
  }

  .descriptionReviewHeader {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }

    .descriptionBtn {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 2px;
        background-color: black;
      }
    }

    .reviewBtn {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 2px;
        background-color: black;
      }
    }
  }
`;

const AboutItem = styled.div`
  display: flex;

  justify-content: space-around;
  gap: 20px;

  .productImage {
    display: flex;
    max-width: 30%;
    gap: 20px;
    flex-direction: column;
    height: 501px;

    @media screen and (max-width: 750px) {
      max-width: 51%;
      max-height: 52vh;
    }

    img {
      height: 50%;
      width: 100%;
      object-fit: contain;
    }

    .productImages {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      img {
        border: 2px solid black;
        width: 50%;
        height: 100px;
        cursor: pointer;
        padding: 4px;
        border-radius: 5px;
      }
    }
  }

  @media screen and (max-width: 610px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .itemAbout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 50%;
    padding: 10px 55px;

    @media screen and (max-width: 750px) {
      max-width: 38%;
      padding: 7px;

      h2 {
        font-size: 16px;
      }
    }

    @media screen and (max-width: 610px) {
      max-width: 100%;
      padding: 5px;
    }

    button {
      display: block;
      width: 25px;
      height: 25px;
      font-size: 17px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    .itemRating {
      display: flex;
      align-items: center;
      gap: 10px;

      .stars {
        display: flex;
        align-items: center;
        gap: 3px;

        @media screen and (max-width: 750px) {
          font-size: 13px;
        }

        .yellowStar {
          path {
            color: #ffcd4e;
          }
        }

        path {
          color: #80808078;
        }
      }

      p {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;
