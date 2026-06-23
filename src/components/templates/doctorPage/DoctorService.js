import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

// فرض بر این است که سرویس‌ها شامل قیمت هم هستند، اگر نیست می‌توانید آن را حذف کنید
function DoctorService({ service, index }) {
  return (
    <div
      className="group relative p-6 rounded-[2rem] border border-emerald-100/90 bg-white/80 backdrop-blur-md transition-all duration-500 
                 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-lg hover:shadow-emerald-900/40 dark:border-emerald-900/30 dark:bg-slate-900/40"
    >
      {/* شماره سرویس با استایل مدرن‌تر */}
      <div
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 
                      flex items-center justify-center mb-5 text-xl font-Morabba-Bold text-emerald-700 dark:text-emerald-400 transition-transform duration-500 group-hover:scale-110"
      >
        {new Intl.NumberFormat("fa-IR").format(index + 1)}
      </div>

      {/* عنوان سرویس */}
      <h3 className="text-xl font-Morabba-Bold text-emerald-950 dark:text-emerald-50 mb-3 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
        {service.title}
      </h3>

      {/* توضیحات */}
      <p className="text-sm font-Dana-Medium text-emerald-900/70 dark:text-emerald-50/70 leading-7 mb-6 line-clamp-3">
        {service.description}
      </p>

      {/* بخش پایین: قیمت و لینک رزرو */}
      <div className="flex items-center justify-between pt-4 border-t border-emerald-100/50 dark:border-emerald-900/30">
        {/* قیمت (اگر در دیتا وجود داشت) */}
        {service.price && (
          <div className="flex flex-col">
            <span className="text-[10px] font-Dana-Medium text-emerald-600/60">
              هزینه سرویس
            </span>
            {console.log(service.price)}
            {service.price !== "0" ? (
              <span className="text-sm font-Morabba-Bold text-emerald-800 dark:text-emerald-300">
                {new Intl.NumberFormat("fa-IR").format(service.price)}{" "}
                <span className="text-[10px] font-Dana-Medium">تومان</span>
              </span>
            ) : (
              <span className="text-sm font-Morabba-Bold text-emerald-800 dark:text-emerald-300">
                نیاز به مراجعه
              </span>
            )}
          </div>
        )}

        {/* لینک رزرو با انیمیشن فلش */}
        <Link
          href={"/reservation"}
          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-Morabba-Bold text-sm transition-all group/link"
        >
          <span>رزرو نوبت</span>
          <span className="transition-transform duration-300 group-hover/link:translate-x-[-4px]">
            <FaChevronLeft size={12} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default DoctorService;
