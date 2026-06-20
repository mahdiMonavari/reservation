"use client";
import { resoneOfDate } from "@/utiles/jalali/jalali";
import React, { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Days = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const isSameDay = (a, b) =>
  a && b && a.year === b.year && a.month === b.month && a.date === b.date;

const isPastDay = (a, b) => {
  if (!a || !b) return false;
  const dayA = new Date(a.year, a.month, a.date);
  const dayB = new Date(b.year, b.month, b.date);
  return dayA < dayB;
};

// تبدیل سال/ماه میلادی به یک عدد قابل‌مقایسه، برای رعایت درست مرز سال
const totalMonths = (y, m) => y * 12 + m;

function Calendar({ role, selectedDate, onSelectDate, permission = 2 }) {
  const current = new Date();
  const today = {
    year: current.getFullYear(),
    month: current.getMonth(),
    date: current.getDate(),
  };

  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const [dates, setDates] = useState(() =>
    resoneOfDate(year, month, today.date)
  );

  useEffect(() => {
    setDates(resoneOfDate(year, month, today.date));
  }, [year, month]);

  const isNextDisabled =
    totalMonths(year, month) >=
    totalMonths(today.year, today.month) + permission;
  const isPrevDisabled =
    totalMonths(year, month) <= totalMonths(today.year, today.month);

  const nextMonthHandler = () => {
    if (isNextDisabled) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const prevMonthHandler = () => {
    if (isPrevDisabled) return;
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  return (
    <div
      dir="rtl"
      className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border
        border-slate-200 dark:border-slate-800
        shadow-sm hover:shadow-md transition-all duration-200
        p-6 max-[480px]:p-3 flex flex-col gap-5 max-[480px]:gap-3"
    >
      {/* هدر */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonthHandler}
          disabled={isPrevDisabled}
          aria-label="ماه قبل"
          className="w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 flex items-center justify-center rounded-lg
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400
            disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400
            disabled:cursor-not-allowed transition-all duration-150"
        >
          <FaChevronRight size={12} />
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 rounded-lg bg-violet-100 dark:bg-violet-900/30
              text-violet-700 dark:text-violet-400
              flex items-center justify-center shrink-0"
          >
            <FaCalendarAlt size={13} />
          </div>
          <span className="flex items-center gap-1 text-base max-[480px]:text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100">
            <span>{jalaliMonths[dates.find(Boolean).jalali.month]}</span>
            <span>{dates.find(Boolean).jalali.year}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={nextMonthHandler}
          disabled={isNextDisabled}
          aria-label="ماه بعد"
          className="w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 flex items-center justify-center rounded-lg
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400
            disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400
            disabled:cursor-not-allowed transition-all duration-150"
        >
          <FaChevronLeft size={12} />
        </button>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* نام روزها */}
      <div className="grid grid-cols-7">
        {Days.map((day, index) => (
          <span
            key={day}
            className={`flex items-center justify-center py-1 text-sm max-[480px]:text-xs font-Dana-Medium
              ${
                index === 6
                  ? "text-rose-500 dark:text-rose-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* شبکه‌ی روزها */}
      <div className="grid grid-cols-7 gap-y-2 max-[480px]:gap-y-1">
        {dates.map((d, index) => {
          if (!d) return <span key={`empty-${index}`} />;

          const isToday = isSameDay(d.gregorian, today);
          const isSelected = isSameDay(d.gregorian, selectedDate);
          const isFriday = index % 7 === 6;
          const isPast = isPastDay(d.gregorian, today);

          return (
            <div
              key={`${d.jalali.year}-${d.jalali.month}-${d.jalali.date}`}
              className="flex items-center justify-center"
            >
              <button
                type="button"
                disabled={isPast}
                onClick={() => onSelectDate?.(d)}
                className={`w-11 h-11 max-[480px]:w-9 max-[480px]:h-9 flex items-center justify-center rounded-lg
                  text-base max-[480px]:text-sm font-Dana-Medium transition-all duration-150
                  ${
                    isPast
                      ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                      : isSelected
                        ? "bg-violet-600 text-white font-Morabba-Bold shadow-sm"
                        : isToday
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-Morabba-Bold border border-emerald-200 dark:border-emerald-800"
                          : isFriday
                            ? "text-rose-500 dark:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {d.jalali.date.toLocaleString("fa-IR")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
