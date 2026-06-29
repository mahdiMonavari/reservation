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
        {comments.length ? (
          comments.map((comment) => (
            <SwiperSlide>
              <Comment key={comment._id} {...comment} />
            </SwiperSlide>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">💬</span>
            </div>
            <p className="text-gray-500 dar:text-zinc-400 font-medium">
              هنوز نظری ثبت نشده است
            </p>
          </div>
        )}
      </Swiper>
    </div>
  );
}
