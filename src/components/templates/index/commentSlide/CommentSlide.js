"use client";
import Comment from "@/components/modules/comment/Comment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

export default function CommentSlide({ comments }) {
  return (
    <div className="w-full">
      <Swiper
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-emerald-400 !opacity-40 !w-1.5 !h-1.5",
          bulletActiveClass:
            "swiper-pagination-bullet-active !opacity-100 !bg-emerald-500 !w-4 !rounded-full transition-all duration-300",
        }}
        allowTouchMove={true}
        slidesPerView={1}
        className="!pb-6"
      >
        {comments.map((comment) => (
          <SwiperSlide>
            <Comment key={comment._id} {...comment} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
