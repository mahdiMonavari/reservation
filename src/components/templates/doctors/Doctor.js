import Image from "next/image";
import React from "react";
import { FaUserDoctor, FaClipboardList, FaChevronLeft } from "react-icons/fa6";
import { MdFolderSpecial, MdOutlineDescription } from "react-icons/md";
import Link from "next/link";

function Doctor({ photo, userId, fieldOfStudy, about, specialty, _id }) {
  // فرض بر این است که photo آدرس تصویر واقعی است، اگر نیست از fallback استفاده می‌کنیم
  const doctorImage = photo || "/img/doctor-hero.jpg";

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border 
      border-emerald-100/50 bg-white/70 shadow-xl shadow-emerald-900/5 transition-all 
      duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-500/10
      dark:border-emerald-900/30 dark:bg-slate-900/50 backdrop-blur-xl"
    >
      {/* بخش تصویر با افکت زوم */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          alt={`${userId.firstName} ${userId.lastName}`}
          src={doctorImage}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          width={500}
          height={400}
          priority
        />
        {/* Overlay ملایم برای زیبایی */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* محتوای متنی */}
      <div className="p-6 flex flex-col gap-5 text-slate-800 dark:text-slate-100">
        {/* هدر: نام و لینک */}
        <Link href={`/doctors/${userId._id}`} className="group/name block">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-Morabba-Bold text-2xl leading-tight group-hover/name:text-emerald-600 transition-colors">
                {userId.firstName} {userId.lastName}
              </h2>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 group-hover/name:translate-x-[-4px] transition-all duration-300">
              <FaChevronLeft size={16} />
            </div>
          </div>
        </Link>

        {/* اطلاعات تکمیلی: مدرک و تخصص */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <FaClipboardList className="text-emerald-500" size={16} />
            </div>
            <span className="font-Dana-Medium text-sm">
              <span className="text-slate-400 font-shabnam-medium text-xs ml-1">
                مدرک:
              </span>
              {fieldOfStudy}
            </span>
          </div>

          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <MdFolderSpecial className="text-emerald-500" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-shabnam-medium text-xs mb-0.5">
                زمینه‌های فعالیت:
              </span>
              <span className="font-Dana-Medium text-sm line-clamp-1 leading-relaxed">
                {specialty}
              </span>
            </div>
          </div>
        </div>

        {/* بخش درباره متخصص - استفاده از Divider ظریف */}
        <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/20">
          <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-100">
            <MdOutlineDescription className="text-emerald-500" size={18} />
            <span className="font-Morabba-Bold text-sm">درباره متخصص</span>
          </div>
          <p className="font-Dana-Medium text-sm leading-7 text-slate-600 dark:text-slate-400 line-clamp-3">
            {about}
          </p>
        </div>
      </div>

      {/* دکمه عملیاتی - در انتهای کارت */}
      <div className="px-6 pb-7">
        <button className="relative w-full overflow-hidden group/btn bg-emerald-600 hover:bg-emerald-700 text-white font-Morabba-Bold text-lg py-4 rounded-[1.5rem] transition-all duration-300 shadow-lg shadow-emerald-600/25 active:scale-95">
          <span className="relative z-10 flex items-center justify-center gap-2">
            رزرو نوبت آنلاین
          </span>
          {/* افکت درخشش هنگام هاور */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-transform" />
        </button>
      </div>

      {/* استایل سفارشی برای انیمیشن shimmer (در فایل CSS اصلی یا اینجا اضافه شود) */}
    </div>
  );
}

export default Doctor;
