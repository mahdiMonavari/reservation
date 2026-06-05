import TitleHeader from '@/components/modules/titleHeader/TitleHeader'
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa";


function ReservationRoadMap() {
  return (
    <>    
        <div>
  <TitleHeader title={"نحوه ثبت نوبت"} />
  <div className="flex justify-center relative">    
    <div className="mt-20">
      <div
        className="xl:w-180 xl:h-60 border-b-2 rounded-br-4xl border-dashed relative border-r-2 border-e-lime-950
        dark:border-emerald-300"
        data-aos="fade-up"
      >
        <span className="top-1/2 text-emerald-950 right-0 translate-x-1/2 absolute -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/80 backdrop-blur-sm dark:text-white font-shabnam-bold">
          {new Intl.NumberFormat("fa-IR").format(1)}
        </span>
        <div className='flex items-center h-full px-10'>
            <div className='text-emerald-800/70 text-2xl dark:text-gray-100'>
                <h2 className='text-emerald-800 text-3xl font-Morabba-Bold mb-3'>ثبت نام در سایت</h2>
                <p>برای این که بتوانید نوبتی رزرو کنید ابتدا باید در سایت ثبت نام کنید</p>
                <p>برای این عمر باید شماره تلفنی که ثبت میکنید در دسترس خود شما باشد</p>
            </div>
        </div>
      </div>

      <div
        className="xl:w-180 xl:h-60 border-b-2 rounded-tl-4xl border-dashed border-l-2 border-e-lime-950 mr-6.25 rounded-bl-4xl
        dark:border-emerald-300"
        data-aos="fade-right"
      >
        <span className="top-1/2 text-emerald-950 left-0 -translate-x-1/2 absolute -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/80 backdrop-blur-sm dark:text-white font-shabnam-bold">
          {new Intl.NumberFormat("fa-IR").format(2)}
        </span>
        <div className='flex items-center px-10 h-full justify-end'>
            <div className='text-emerald-800/70 text-2xl dark:text-gray-100'>
                <h2 className='text-emerald-800 text-3xl font-Morabba-Bold mb-3'>انتخاب دکتر مد نظر</h2>
                <p>بعد از ثبت نام در سایت به صفحه رزرو نوبت بروید</p>
                <p>دکتر مورد نظرخودتون رو انتخاب کنید</p>
            </div>
        </div>
      </div>

      <div
        className="xl:w-180 xl:h-60 border-b-2 rounded-tr-4xl border-dashed border-r-2 border-e-lime-950 ml-6.25 rounded-br-4xl
        dark:border-emerald-300"
        data-aos="fade-left"
      >
        <span className="top-1/2 text-emerald-950 right-0 translate-x-1/2 absolute -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/80 backdrop-blur-sm dark:text-white font-shabnam-bold">
          {new Intl.NumberFormat("fa-IR").format(3)}
        </span>
        <div className='flex items-center px-10 h-full'>
            <div className='text-emerald-800/70 text-2xl dark:text-gray-100'>
                <h2 className='text-emerald-800 text-3xl font-Morabba-Bold mb-3'>انتخاب خدمت یا خدمات</h2>
                <p>بعد از انتخاب دکتر مورد نظر سپس لیست خدمات هر دکتر نشان داده میشود</p>
                <p>با کلیک روی هر خدمت ، خدمت مورد نظر شما به لیست خدمات درخاستی شما اضافه میشود</p>
            </div>
        </div>
      </div>

      <div
        className="xl:w-180 xl:h-60 border-b-2 rounded-tl-4xl border-dashed border-l-2 border-e-lime-950 mr-6.25 rounded-bl-4xl
        dark:border-emerald-300"
        data-aos="fade-right"
      >
        <span className="top-1/2 text-emerald-950 left-0 -translate-x-1/2 absolute -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/80 backdrop-blur-sm dark:text-white font-shabnam-bold">
          {new Intl.NumberFormat("fa-IR").format(4)}
        </span>
        <div className='flex items-center px-10 h-full justify-end'>
            <div className='text-emerald-800/70 text-2xl dark:text-gray-100'>
                <h2 className='text-emerald-800 text-3xl font-Morabba-Bold mb-3'>انتخاب تاریخ مراجعه</h2>
                <p>سپس از تقویم نمایش داده شده روز مراجعه خود را انتخاب کنید</p>
                <p>تاریخهای کم رنگ قابل ریزریشن نیستند</p>
            </div>
        </div>
      </div>

      <div
        className="xl:w-180 xl:h-60 rounded-tr-4xl border-dashed border-r-2 border-e-lime-950 ml-6.25 
        dark:border-emerald-300"
        data-aos="fade-up"
      >
        <span className="top-1/2 text-emerald-950 right-0 translate-x-1/2 absolute -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/80 backdrop-blur-sm dark:text-white font-shabnam-bold">
          {new Intl.NumberFormat("fa-IR").format(5)}
        </span>
        <div className='flex items-center px-10 h-full'>
            <div className='text-emerald-800/70 text-2xl dark:text-gray-100'>
                <h2 className='text-emerald-800 text-3xl font-Morabba-Bold mb-3'>انتخاب ساعت مراجعه</h2>
                <p>در نهایت ساعت مراجعه خود را انتخاب کنید</p>
                <p>ساعتهای کم رنگ قابل ریزریشن نیستند مجموع خدمات باید با ساعت مراجعه همخانی داشته باشد</p>
            </div>
        </div>
      </div>
    </div>    
  </div>
  <div className='mt-10 text-center'>
  <Link href={"/reserve"}>
        <span className='text-emerald-600 text-center text-3xl font-Morabba-Bold mb-3 dark:text-emerald-300
        inline-flex items-center gap-3 justify-center group relative'>
            رزرو نوبت
            <span className='text-2xl text-emerald-600 dark:text-emerald-300'>
                <FaChevronLeft/>
            </span>
            <span className='w-0 h-0.5 dark:bg-emerald-300 bg-emerald-600 group-hover:w-full rounded-full transition-all duration-200
            absolute -bottom-1 right-0 origin-right'></span>
        </span>
    </Link>
    </div>
</div></>
  )
}

export default ReservationRoadMap