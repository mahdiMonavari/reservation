"use client";
import { useState } from "react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { MdOutlineUpdate } from "react-icons/md";
import ChangeBase from "./ChangeBase";

function AppointmentCard({
  userId,
  doctorId,
  date,
  createdAt,
  timeStart,
  timeEnd,
  totalTime,
  serviceIds,
  isVisited,
}) {
  const [isShowReschedule, setIsShowReschedule] = useState(false);
  const userName = `${userId?.firstName || ""} ${userId?.lastName || ""}`;
  const doctorName = `${doctorId?.firstName || ""} ${doctorId?.lastName || ""}`;
  const onToggleShow = () => setIsShowReschedule(!isShowReschedule);
  const visitDate = new Date(date);
  const reserveDate = new Date(createdAt);
  const now = new Date();
  const canReschedule = !isVisited && visitDate > now;

  return (
    <>
      {
        <ChangeBase
          timeStart={timeStart}
          timeEnd={timeEnd}
          totalTime={totalTime}
          doctorId={doctorId._id}
          isShowReschedule={isShowReschedule}
          onToggleShow={onToggleShow}
          resevatedDate={date}
          serviceIds={serviceIds}
        />
      }
      <div
        className={` relative 
        border border-teal-100 dark:border-slate-800
        rounded-2xl p-5 flex flex-col gap-4
        hover:shadow-md transition-all duration-200 ${
          canReschedule
            ? "bg-slate-50 dark:bg-slate-900 border-teal-100 dark:border-slate-800"
            : isVisited
              ? "bg-teal-50/60 dark:bg-slate-800/60 border-teal-100 dark:border-teal-800"
              : "bg-red-50/60 dark:bg-slate-800/60 border-yellow-100 dark:border-yellow-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-Dana-Medium
            ${
              isVisited
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
            }`}
          >
            {isVisited ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
            {isVisited ? "ویزیت شده" : "ویزیت نشده"}
          </div>

          {canReschedule && (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={onToggleShow}
            >
              {" "}
              <button
                title="تغییر زمان مراجعه"
                className="w-8 h-8 rounded-lg flex items-center justify-center
              text-teal-500 dark:text-teal-400
              bg-teal-50 dark:bg-teal-500/10
              hover:bg-teal-100 dark:hover:bg-teal-500/20
              border border-teal-200 dark:border-teal-500/20
              transition-all duration-150"
              >
                <MdOutlineUpdate size={16} />
              </button>{" "}
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 font-Morabba-Bold">
                تغییر زمان
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <FiUser
                size={14}
                className="text-slate-500 dark:text-slate-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500">
                کاربر
              </p>
              <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-white">
                {userName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center shrink-0">
              <FiUser size={14} className="text-teal-500" />
            </div>
            <div>
              <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500">
                دکتر
              </p>
              <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-white">
                دکتر {doctorName}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
              <FiCalendar size={11} />
              تاریخ مراجعه
            </p>
            <p className="text-xs font-Dana-Medium text-slate-700 dark:text-slate-200">
              {visitDate.toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
              <FiCalendar size={11} />
              تاریخ رزرو
            </p>
            <p className="text-xs font-Dana-Medium text-slate-700 dark:text-slate-200">
              {reserveDate.toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <FiClock size={11} />
              ساعت مراجعه
            </p>
            <span
              className="text-xs font-Dana-Medium text-slate-700 dark:text-slate-200 max-w-fit"
              dir="ltr"
            >
              {timeStart} - {timeEnd}
            </span>
          </div>

          <div>
            <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-1">
              مدت زمان
            </p>
            <p className="text-xs font-Dana-Medium text-slate-700 dark:text-slate-200">
              {totalTime} دقیقه
            </p>
          </div>
        </div>

        {serviceIds?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {serviceIds.map((s) => (
              <span
                key={s._id}
                className="text-[11px] px-2.5 py-1 rounded-full font-Dana-Regular
                bg-teal-50 dark:bg-teal-500/10
                text-teal-700 dark:text-teal-300
                border border-teal-200 dark:border-teal-500/20"
              >
                {s.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AppointmentCard;
