"use client"
import Comment from "@/components/modules/comment/Comment";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {  Autoplay } from 'swiper/modules';


export default function App() {
  return (
    <>
      <Swiper
      loop={true}
          pagination={{
            clickable: true,
          }}        
          modules={[Autoplay]}
          autoplay={{
            delay: 5000, 
            disableOnInteraction: false,
          }}
          allowTouchMove={true}
          slidesPerView={1}
          >
        <SwiperSlide>
            <Comment/>
        </SwiperSlide>
        <SwiperSlide>
            <Comment/>
        </SwiperSlide>
        <SwiperSlide>
            <Comment/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
