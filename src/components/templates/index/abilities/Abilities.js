"use client";
import Abilite from "./Abilite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import TitleHeader from "@/components/modules/titleHeader/TitleHeader";

export default function Abilities({ services }) {
  return (
    <>
      <TitleHeader data-aos="fade-up" title="خدمات برتری که ارائه میدهیم" />
      <div className="w-full py-10" data-aos="fade-up">
        <Swiper
          spaceBetween={30}
          allowTouchMove={true}
          slidesPerView={2}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {services.map((offer) => (
            <SwiperSlide key={offer._id}>
              <Abilite {...offer} service={services} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
