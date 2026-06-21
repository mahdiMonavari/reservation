"use client";

import EmptyState from "@/components/modules/emptyState/EmptyState";
import React from "react";
import { FaRegTrashAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns-jalali";

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const toFaDigits = (value) =>
  String(value).replace(/\d/g, (d) => persianDigits[d]);

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const getWeekDayName = (date) => weekDays[(date.getDay() + 1) % 7];

const formatTime = (value) => {
  const [hour, minute] = value.split(":");
  return { hour, minute };
};

function WorkingDayCard({ schedules, setSchedulesDate }) {
  const sortedSchedules = schedules
    .map((schedule, index) => ({ schedule, index }))
    .sort((a, b) => new Date(a.schedule.date) - new Date(b.schedule.date));
  const formatTimeParts = (hour, minute) => {
    const h = String(hour).padStart(2, "0");
    const m = String(minute).padStart(2, "0");
    return `${h}:${m}`;
  };
  const inRangeHandler = (type, value) => {
    if (type === "hour") {
      return value <= 23 ? true : false;
    } else {
      return value <= 59 ? true : false;
    }
  };
  const handleStartMinuteChange = (e, hour, indexEntier) => {
    const inRange = inRangeHandler("minute", e.target.value);
    if (inRange === false) return;
    const minute = Number(e.target.value);
    const timeStart = formatTimeParts(hour, minute);
    setSchedulesDate((prev) =>
      prev.map((item, index) =>
        index === indexEntier ? { ...item, timeStart } : item
      )
    );
  };
  const handleStartHourChange = (e, minute, indexEntier) => {
    const inRange = inRangeHandler("hour", e.target.value);
    if (inRange === false) return;
    const hour = Number(e.target.value);
    const timeStart = formatTimeParts(hour, minute);
    setSchedulesDate((prev) =>
      prev.map((item, index) =>
        index === indexEntier ? { ...item, timeStart } : item
      )
    );
  };
  const handleEndMinuteChange = (e, hour, indexEntier) => {
    const inRange = inRangeHandler("minute", e.target.value);
    if (inRange === false) return;
    const minute = Number(e.target.value);
    const timeEnd = formatTimeParts(hour, minute);
    setSchedulesDate((prev) =>
      prev.map((item, index) =>
        index === indexEntier ? { ...item, timeEnd } : item
      )
    );
  };
  const handleEndHourChange = (e, minute, indexEntier) => {
    const inRange = inRangeHandler("hour", e.target.value);
    if (inRange === false) return;
    const hour = Number(e.target.value);
    const timeEnd = formatTimeParts(hour, minute);
    setSchedulesDate((prev) =>
      prev.map((item, index) =>
        index === indexEntier ? { ...item, timeEnd } : item
      )
    );
  };
  const removeSchedule = (index) => {
    setSchedulesDate(schedules.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 w-full">
      {sortedSchedules.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {sortedSchedules.map(({ schedule, index }) => {
            const dateObj = new Date(schedule.date);
            const isInvalidRange = schedule.timeStart >= schedule.timeEnd;
            const startTime = formatTime(schedule.timeStart);
            const endTime = formatTime(schedule.timeEnd);
            return (
              <div
                key={dateObj.getTime()}
                className={`bg-white dark:bg-slate-900 rounded-2xl border
                  ${
                    isInvalidRange
                      ? "border-rose-300 dark:border-rose-800"
                      : "border-slate-200 dark:border-slate-800"
                  }
                  shadow-sm hover:shadow-md transition-all duration-200
                  p-4 max-[480px]:p-3 flex flex-col gap-3 min-w-0`}
              >
                {/* هدر کارت: تاریخ + دکمه حذف */}
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30
                        text-violet-700 dark:text-violet-400
                        flex items-center justify-center shrink-0"
                    >
                      <FaClock size={13} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 truncate">
                        {toFaDigits(format(dateObj, "d MMMM yyyy"))}
                      </span>
                      <span className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500">
                        {getWeekDayName(dateObj)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    aria-label="حذف روز"
                    className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0
                      text-slate-400 dark:text-slate-500
                      hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-500 dark:hover:text-rose-400
                      transition-all duration-150"
                  >
                    <FaRegTrashAlt size={14} />
                  </button>
                </div>

                {/* کنترل ساعت شروع و پایان — بر اساس عرض واقعی کارت می‌شکنه، نه عرض صفحه */}
                <div className="flex flex-wrap gap-3">
                  <div
                    className="flex-1 min-w-[136px] flex items-center justify-center gap-2 text-sm font-Dana-Medium
                    text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50
                    rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700
                    transition-all duration-150
                    focus-within:border-violet-500 dark:focus-within:border-violet-500
                    focus-within:ring-2 focus-within:ring-violet-200 dark:focus-within:ring-violet-900/40
                    focus-within:bg-white dark:focus-within:bg-slate-800"
                  >
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={startTime.minute}
                        onChange={(e) =>
                          handleStartMinuteChange(e, startTime.hour, index)
                        }
                        className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium`}
                      />
                      <span className="text-slate-400 dark:text-slate-500">
                        :
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={23}
                        value={startTime.hour}
                        onChange={(e) =>
                          handleStartHourChange(e, startTime.minute, index)
                        }
                        className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium`}
                      />
                    </div>
                  </div>
                  <div
                    className="flex-1 min-w-[136px] flex items-center justify-center gap-2 text-sm font-Dana-Medium
                    text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50
                    rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700
                    transition-all duration-150
                    focus-within:border-violet-500 dark:focus-within:border-violet-500
                    focus-within:ring-2 focus-within:ring-violet-200 dark:focus-within:ring-violet-900/40
                    focus-within:bg-white dark:focus-within:bg-slate-800"
                  >
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={endTime.minute}
                        onChange={(e) =>
                          handleEndMinuteChange(e, endTime.hour, index)
                        }
                        className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium`}
                      />
                      <span className="text-slate-400 dark:text-slate-500">
                        :
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={23}
                        value={endTime.hour}
                        onChange={(e) =>
                          handleEndHourChange(e, endTime.minute, index)
                        }
                        className={`w-9 text-center bg-transparent outline-none text-slate-800 dark:text-slate-100 font-Dana-Medium`}
                      />
                    </div>
                  </div>
                </div>

                {isInvalidRange && (
                  <span className="text-xs font-Dana-Medium text-rose-500 dark:text-rose-400">
                    ساعت پایان باید بعد از ساعت شروع باشد
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState title="هنوز تاریخ حضوری تایین نکرده اید" />
      )}
    </div>
  );
}

export default WorkingDayCard;
