import { useParams } from "react-router-dom";
import data from "../data.json";
import styled from "styled-components";
import { FaCartShopping } from "react-icons/fa6";
import { addItemsInCart } from "../Redux/cartData";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

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
  return (
    <div>
      {ShopingItems.length > 0
        ? ShopingItems.map((item) => {
            return (
              <>
                <AboutItem>
                  <div className="productImage">
                    <img src={item.img.img1} alt="" />
                  </div>
                  <div className="itemAbout">
                    <h2>{item.name}</h2>
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
                    <button>Description</button>
                    <button>Review</button>
                  </div>
                  <div className="description">
                    <p>{item.description}</p>
                  </div>
                </DescriptionReview>
                <ToastContainer closeOnClick />
              </>
            );
          })
        : discountItems.map((item) => {
            return <p>{item.price}</p>;
          })}
    </div>
  );
}

const DescriptionReview = styled.div`
  width: 70%;
  margin-top: 50px;
  margin-left: 50px;

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
  }
`;

const AboutItem = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 55px;

  .productImage {
    max-width: 28%;
    max-height: 50vh;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .itemAbout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 50%;
    padding: 10px 55px;

    button {
      display: block;
      width: 25px;
      height: 25px;
      font-size: 17px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;
