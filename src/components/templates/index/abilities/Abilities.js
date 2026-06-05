"use client"
import { offerServices } from '@/utiles/const'
import Abilite from './Abilite'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function Abilities() {
  return (
    <>
      <h2 className='mb-5 text-3xl text-emerald-900 font-Morabba-Bold'>خدمات برتری که ارائه می‌دهیم</h2>
      
      <div className="w-full py-10">
        <Swiper
          // --- تنظیمات اصلی ---
          spaceBetween={30}    
          allowTouchMove={true} // قابلیت ورق زدن فعال
          slidesPerView={2}
          loop={true}           // ✅ قابلیت برگشت از آخر به اول (بی‌نهایت)
          
          // --- تنظیمات Pagination ---
          pagination={{
            clickable: true,    // پیشنهاد: اگر می‌خواهید کاربر با کلیک روی نقاط هم جابه‌جا شود true بگذارید
          }}
          
          // --- تنظیمات Autoplay ---
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000, 
            disableOnInteraction: false, // اگر کاربر ورق زد، خودکار متوقف نشود
          }}
          
          // --- تنظیمات ریسپانسیو ---
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
          
          // اضافه کردن padding برای نمایش بهتر نقاط پایین اسلایدر
          className="mySwiper"
        >    
          {/* ❌ دیو با کلاس grid را حذف کردیم. اسلایدها باید مستقیم اینجا باشند */}
          {offerServices.map((offer) => (
            <SwiperSlide key={offer.id}>
              <Abilite {...offer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
