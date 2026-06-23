import Image from "next/image";
import React from "react";
import { FaUserDoctor, FaClipboardList } from "react-icons/fa6";
import { MdFolderSpecial, MdOutlineDescription } from "react-icons/md";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

function Doctor({ photo, userId, fieldOfStudy, about, specialty, _id }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white/60 shadow-lg shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-emerald-900/50 dark:bg-slate-900/40 backdrop-blur-md">
      <div className="relative overflow-hidden">
        <Image
          alt={photo}
          src={"/img/doctor-hero.jpg"}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          width={500}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col gap-4 text-slate-800 dark:text-slate-100">
        <Link href={`/doctors/${userId._id}`} className="group/name">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 font-shabnam-bold text-xl group-hover/name:text-emerald-600 transition-colors">
              <FaUserDoctor className="text-emerald-500" />
              <span className="truncate">
                {userId.firstName} {userId.lastName}
              </span>
            </h2>
            <span className="text-emerald-500 font-shabnam-bold text-xl group-hover/name:text-emerald-600 transition-colors">
              <FaChevronLeft />
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <FaClipboardList className="shrink-0" />
          <span className="font-shabnam-medium text-sm">
            مدرک تحصیلی : {fieldOfStudy}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <MdFolderSpecial className="shrink-0" />
          <span className="font-shabnam-medium text-sm">
            زمینهای فعالیت : {specialty}
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-emerald-100 dark:border-emerald-800">
          <span className="flex items-center gap-2 font-shabnam-bold text-sm text-slate-800 dark:text-slate-100">
            <MdOutlineDescription />
            درباره متخصص:
          </span>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {about}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-Morabba-Bold text-xl py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/20 active:scale-95">
          رزرو نوبت
        </button>
      </div>
    </div>
  );
}

export default Doctor;
