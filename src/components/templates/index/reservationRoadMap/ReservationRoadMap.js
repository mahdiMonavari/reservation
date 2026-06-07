import TitleHeader from '@/components/modules/titleHeader/TitleHeader'
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa";

function ReservationRoadMap() {
  const steps = [
    {
      num: 1,
      title: 'ثبت نام در سایت',
      lines: [
        'برای این که بتوانید نوبتی رزرو کنید ابتدا باید در سایت ثبت نام کنید',
        'برای این امر باید شماره تلفنی که ثبت میکنید در دسترس خود شما باشد',
      ],
      side: 'right',
    },
    {
      num: 2,
      title: 'انتخاب دکتر مد نظر',
      lines: [
        'بعد از ثبت نام در سایت به صفحه رزرو نوبت بروید',
        'دکتر مورد نظرخودتون رو انتخاب کنید',
      ],
      side: 'left',
    },
    {
      num: 3,
      title: 'انتخاب خدمت یا خدمات',
      lines: [
        'بعد از انتخاب دکتر مورد نظر سپس لیست خدمات هر دکتر نشان داده میشود',
        'با کلیک روی هر خدمت، خدمت مورد نظر شما به لیست خدمات درخواستی شما اضافه میشود',
      ],
      side: 'right',
    },
    {
      num: 4,
      title: 'انتخاب تاریخ مراجعه',
      lines: [
        'سپس از تقویم نمایش داده شده روز مراجعه خود را انتخاب کنید',
        'تاریخ‌های کم‌رنگ قابل رزرو نیستند',
      ],
      side: 'left',
    },
    {
      num: 5,
      title: 'انتخاب ساعت مراجعه',
      lines: [
        'در نهایت ساعت مراجعه خود را انتخاب کنید',
        'ساعت‌های کم‌رنگ قابل رزرو نیستند؛ مجموع خدمات باید با ساعت مراجعه همخوانی داشته باشد',
      ],
      side: 'right',
    },
  ];

  return (
    <div className='flex justify-center'>
      <div>
        <TitleHeader title={"نحوه ثبت نوبت"} />
        <div className="flex justify-center relative px-10 sm:px-6">
          <div className="mt-10 sm:mt-20 w-full max-w-2xl xl:max-w-none">

            {steps.map((step, index) => {
              const isLeft = step.side === 'left';
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.num}
                  className={[
                    "relative w-full xl:w-180",
                    "min-h-32 xl:h-60",
                    "border-dashed",                    
                    !isLast ? "border-b-2 ml-6 xl:m-0" : "",
                    isLeft ? "border-l-2 mr-6  xl:m-0" : "border-r-2",
                    !isLast && isLeft
                      ? "rounded-tl-4xl rounded-bl-4xl"
                      : !isLast && !isLeft
                      ? "rounded-br-4xl rounded-tr-4xl"
                      : isLeft
                      ? "rounded-tl-4xl"
                      : "rounded-tr-4xl",
                      index===0?"rounded-tr-none":"",
                    isLeft ? "xl:mr-6.25" : "xl:ml-6.25",
                    "border-e-lime-950 dark:border-emerald-300",
                    "py-6 xl:py-0",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-aos={isLeft ? "fade-right" : index === 0 || isLast ? "fade-up" : "fade-left"}
                >
                  <span
                    className={[
                      "absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
                      "bg-emerald-500/80 backdrop-blur-sm text-emerald-950 dark:text-white font-shabnam-bold",
                      "top-6 xl:top-1/2 xl:-translate-y-1/2",
                      isLeft
                        ? "left-0 -translate-x-1/2"
                        : "right-0 translate-x-1/2",
                    ].join(" ")}
                  >
                    {new Intl.NumberFormat("fa-IR").format(step.num)}
                  </span>

                  {/* Content */}
                  <div
                    className={[
                      "flex items-center h-full",
                      "px-8 sm:px-10",
                      isLeft ? "justify-end text-right" : "justify-start text-right",
                    ].join(" ")}
                  >
                    <div className="text-emerald-800/70 text-base sm:text-xl dark:text-gray-100 max-w-md xl:max-w-none">
                      <h2 className="text-emerald-800 text-xl sm:text-2xl xl:text-3xl font-Morabba-Bold mb-2 dark:text-emerald-100">
                        {step.title}
                      </h2>
                      {step.lines.map((line, i) => (
                        <p key={i} className="leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href={"/reserve"}>
            <span className="text-emerald-600 text-center text-2xl sm:text-3xl font-Morabba-Bold mb-3 dark:text-emerald-300
              inline-flex items-center gap-3 justify-center group relative">
              رزرو نوبت
              <span className="text-xl sm:text-2xl text-emerald-600 dark:text-emerald-300">
                <FaChevronLeft />
              </span>
              <span className="w-0 h-0.5 dark:bg-emerald-300 bg-emerald-600 group-hover:w-full rounded-full transition-all duration-200
                absolute -bottom-1 right-0 origin-right" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReservationRoadMap;