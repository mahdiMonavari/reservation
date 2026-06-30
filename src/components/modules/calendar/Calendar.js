"use client";
import { resoneOfDate } from "@/utiles/jalali/jalali";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import AdminCalendar from "./AdminCalendar";
import ClientCalendar from "./ClientCalendar";

const DAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const JALALI_MONTHS = [
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

const THEMES = {
  violet: {
    icon: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
    navBtn: "hover:text-violet-600 dark:hover:text-violet-400",
    selected: "bg-violet-600 text-white font-Morabba-Bold shadow-sm",
    today:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
    focusRing:
      "focus-within:border-violet-500 dark:focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 dark:focus-within:ring-violet-900/40",
    hover: "hover:bg-slate-100 dark:hover:bg-slate-800",
  },
  emerald: {
    icon: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    navBtn: "hover:text-emerald-600 dark:hover:text-emerald-400",
    selected: "bg-emerald-600 text-white font-Morabba-Bold shadow-sm",
    today:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
    focusRing:
      "focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 dark:focus-within:ring-emerald-900/40",
    hover: "hover:bg-slate-100 dark:hover:bg-emerald-800",
  },
};

const noSpinnerClass =
  "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]";

const isSameDay = (a, b) =>
  a && b && a.year === b.year && a.month === b.month && a.date === b.date;

const isPastDay = (a, b) => {
  if (!a || !b) return false;
  const dateSlice = new Date(a.year, a.month, a.date, 12, 0, 0);
  return dateSlice < b;
};

const totalMonths = (y, m) => y * 12 + m;

const findScheduleIndex = (schedules, gregorian) =>
  schedules.findIndex((s) => {
    const d = new Date(s.date);
    return (
      d.getFullYear() === gregorian.year &&
      d.getMonth() === gregorian.month &&
      d.getDate() === gregorian.date
    );
  });

const parseTimeParts = (time) => {
  const [h, m] = (time || "00:00").split(":");
  return { hour: h, minute: m };
};

const formatTimeParts = (hour, minute) =>
  `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const inRange = (type, value) => (type === "hour" ? value <= 23 : value <= 59);

function Calendar({
  theme = "violet",
  mode = "single",
  permission = 2,
  selectedDate,
  onSelectDate,
  doctorId,
  schedules = [],
  setSchedulesDate,
  defaultStartTime,
  defaultEndTime,
  setDefaultStartTime,
  setDefaultEndTime,
  workingDateList,
}) {
  const current = new Date();
  const today = {
    year: current.getFullYear(),
    month: current.getMonth(),
    date: current.getDate(),
  };
  const t = THEMES[theme] ?? THEMES.violet;
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
    } else setMonth((m) => m + 1);
  };

  const prevMonthHandler = () => {
    if (isPrevDisabled) return;
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const handleDayClick = (d, canClice) => {
    if (mode !== "multi") {
      if (!canClice) {
        return;
      }
      onSelectDate?.(d);
      return;
    }
    const existingIndex = findScheduleIndex(schedules, d.gregorian);
    if (existingIndex !== -1) {
      setSchedulesDate(schedules.filter((_, i) => i !== existingIndex));
    } else {
      setSchedulesDate([
        ...schedules,
        {
          doctorId,
          date: new Date(d.gregorian.year, d.gregorian.month, d.gregorian.date),
          timeStart: defaultStartTime,
          timeEnd: defaultEndTime,
        },
      ]);
    }
  };

  const startParts = parseTimeParts(defaultStartTime);
  const endParts = parseTimeParts(defaultEndTime);

  const makeTimeHandler = (setter, parts, field) => (e) => {
    if (!inRange(field, e.target.value)) return;
    const val = Number(e.target.value);
    setter(
      field === "hour"
        ? formatTimeParts(val, parts.minute)
        : formatTimeParts(parts.hour, val)
    );
  };

  const firstDate = dates.find(Boolean);

  return (
    <div
      dir="rtl"
      className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl border
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
          className={`w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 flex items-center justify-center rounded-lg
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800 ${t.navBtn}
            disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400
            disabled:cursor-not-allowed transition-all duration-150`}
        >
          <FaChevronRight size={12} />
        </button>

        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 rounded-lg flex items-center justify-center shrink-0 ${t.icon}`}
          >
            <FaCalendarAlt size={13} />
          </div>
          <span className="flex items-center gap-1 text-base max-[480px]:text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100">
            <span>{JALALI_MONTHS[firstDate.jalali.month]}</span>
            <span>{firstDate.jalali.year}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={nextMonthHandler}
          disabled={isNextDisabled}
          aria-label="ماه بعد"
          className={`w-8 h-8 max-[480px]:w-7 max-[480px]:h-7 flex items-center justify-center rounded-lg
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800 ${t.navBtn}
            disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400
            disabled:cursor-not-allowed transition-all duration-150`}
        >
          <FaChevronLeft size={12} />
        </button>
      </div>

      {mode === "multi" && (
        <div className="flex items-center gap-3 max-[480px]:flex-col max-[480px]:gap-2">
          {[
            {
              label: "ساعت شروع",
              parts: startParts,
              onHour: makeTimeHandler(setDefaultStartTime, startParts, "hour"),
              onMinute: makeTimeHandler(
                setDefaultStartTime,
                startParts,
                "minute"
              ),
            },
            {
              label: "ساعت پایان",
              parts: endParts,
              onHour: makeTimeHandler(setDefaultEndTime, endParts, "hour"),
              onMinute: makeTimeHandler(setDefaultEndTime, endParts, "minute"),
            },
          ].map(({ label, parts, onHour, onMinute }) => (
            <div
              key={label}
              className={`flex-1 flex items-center justify-between gap-2 text-sm font-Dana-Medium
                text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50
                rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700
                transition-all duration-150 focus-within:bg-white dark:focus-within:bg-slate-800
                ${t.focusRing}`}
            >
              <span>{label}</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={parts.minute}
                  onChange={onMinute}
                  className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium ${noSpinnerClass}`}
                />
                <span className="text-slate-400 dark:text-slate-500">:</span>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={parts.hour}
                  onChange={onHour}
                  className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium ${noSpinnerClass}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-px bg-slate-100 dark:bg-slate-800" />
      <div className="grid grid-cols-7">
        {DAYS.map((day, index) => (
          <span
            key={day}
            className={`flex items-center justify-center py-1 text-sm max-[480px]:text-[10px] font-Dana-Medium
              ${index === 6 ? "text-rose-500 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"}`}
          >
            {day}
          </span>
        ))}
      </div>

      <div>
        {mode === "single" ? (
          <ClientCalendar
            t={t}
            dates={dates}
            isSameDay={isSameDay}
            today={today}
            isPastDay={isPastDay}
            current={current}
            handleDayClick={handleDayClick}
            selectedDate={selectedDate}
            workingDateList={workingDateList}
          />
        ) : (
          <AdminCalendar
            t={t}
            schedules={schedules}
            dates={dates}
            isSameDay={isSameDay}
            today={today}
            findScheduleIndex={findScheduleIndex}
            isPastDay={isPastDay}
            current={current}
            handleDayClick={handleDayClick}
          />
        )}
      </div>
    </div>
  );
}

export default Calendar;
