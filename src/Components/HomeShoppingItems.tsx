import data from "../data.json";
import { FaCartShopping } from "react-icons/fa6";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemsInCart } from "../Redux/cartData";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

interface IData {
  cart: Product[];
}
export default function HomeShoppingItems() {
  let dispatch = useDispatch();
  let cartItems = useSelector((state: IData) => state.cart);

  let ProductaddNotification = () => {
    toast.success("item succesfully added to cart");
  };
  let ProductaddedNotification = () => {
    toast.warn("The item is already in the cart");
  };
  return (
    <CarouselParent>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 30,
          },
        }}
        className="swiper"
      >
        {data.HomeProducts.map((item) => {
          return (
            <SwiperSlide key={item.id} className="sliderItem">
              <img src={item.img[0]} alt="" />

              <div className="itemDescription">
                {item.name}
                <p>Price: ${item.price}</p>
                <button
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CarouselParent>
  );
}

const CarouselParent = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;

  .swiper {
    .sliderItem {
      position: relative;
      display: flex;
      padding: 20px;
      cursor: pointer;
      flex-direction: column;
      overflow: hidden;

      img {
        padding: 10px;
        width: 180px;
        height: 180px;
        overflow: visible;
      }

      .itemDescription {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;

        button {
          width: 200px;
          background-color: green;
          font-size: 17px;
          padding: 5px;
          cursor: pointer;
          color: white;
          border-radius: 5px;
        }
      }
    }
  }
`;
