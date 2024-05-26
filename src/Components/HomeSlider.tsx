import data from "../data.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <>
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
            <SwiperSlide key={sliderItem.id}>
              <div className="SliderText">
                <h3>{sliderItem.discount}</h3>
                <p>{sliderItem.AboutItem}</p>
              </div>
              <img src={sliderItem.url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
