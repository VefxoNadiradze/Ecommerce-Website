import data from "../data.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styled from "styled-components";

export default function Slider() {
  return (
    <SliderParent>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 25500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.HomesliderArray.map((sliderItem) => {
          return (
            <SwiperSlide key={sliderItem.id} className="swiperSlide">
              <div className="SliderText">
                <h3>{sliderItem.discount}</h3>
                <p>{sliderItem.AboutItem}</p>
              </div>
              <img src={sliderItem.url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderParent>
  );
}

const SliderParent = styled.div`
  margin: 55px 0;

  .swiperSlide {
    position: relative;
    @media screen and (max-width: 755px) {
      .SliderText {
        position: absolute;
        right: 5%;
        top: 0;
        background-color: #000000bf;
        color: white;
        border-radius: 5px;
        width: 280px;
        padding: 5px;
        h3 {
          font-size: 20px;
        }
        p {
          font-size: 15px;
        }
      }
    }

    @media screen and (max-width: 370px) {
      .SliderText {
        right: 0%;
        max-width: 90%;

        h3 {
          font-size: 17px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
`;
