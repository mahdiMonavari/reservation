"use client";
import Calendar from "@/components/modules/calendar/Calendar";
import useReservationStore from "@/store/reservationStore";
import { useEffect, useState } from "react";
import { FiCalendar, FiAlertCircle } from "react-icons/fi";

function SelectDate({ setIsLoading }) {
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const selectedDate = useReservationStore((s) => s.selectedDate);
  const setDate = useReservationStore((s) => s.setDate);
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState(null);
  const handleSelectDate = (d) => {
    const matched = dateList.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === d.gregorian.year &&
        itemDate.getMonth() === d.gregorian.month &&
        itemDate.getDate() === d.gregorian.date
      );
    });
    if (matched) setDate(matched);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (selectedDoctor) {
      getWorkingDays(controller.signal);
    }
    return () => controller.abort();
  }, [selectedDoctor]);

  const getWorkingDays = async (signal) => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await fetch(`/api/schedule/${selectedDoctor}`, { signal });
      if (!res.ok) throw new Error("مشکلی در برقراری ارتباط با سرور رخ داد.");
      const data = await res.json();
      setDateList(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "خطای ناشناخته");
    } finally {
      setIsLoading(false);
    }
  };

  const displayDate = selectedDate
    ? new Date(selectedDate.date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-xl mt-3 md:text-2xl font-Morabba-Bold text-emerald-900 dark:text-white">
          تاریخ مراجعه را انتخاب کنید
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-400 font-Dana-Medium">
          روزهای گذشته قابل انتخاب نیستند
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3 mb-4">
          <FiAlertCircle size={15} />
          <span className="font-Dana-Regular">{error}</span>
        </div>
      )}

      <div className="flex justify-center">
        <Calendar
          mode="single"
          theme="emerald"
          permission={1}
          selectedDate={
            selectedDate
              ? (() => {
                  const d = new Date(selectedDate.date);
                  return {
                    year: d.getFullYear(),
                    month: d.getMonth(),
                    date: d.getDate(),
                  };
                })()
              : null
          }
          onSelectDate={handleSelectDate}
          workingDateList={dateList}
        />
      </div>

      <div
        className={`transition-all duration-500 rounded-2xl overflow-hidden mt-4
        ${selectedDate ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-emerald-500/10 border border-emerald-300/50 dark:border-emerald-400/20 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-2">
            <FiCalendar
              size={13}
              className="text-emerald-500 dark:text-emerald-400"
            />
            <span className="text-xs font-Dana-Regular text-emerald-600 dark:text-emerald-400">
              تاریخ انتخاب شده:
            </span>
            {displayDate && (
              <span className="text-xs font-Morabba-Bold text-emerald-700 dark:text-emerald-300">
                {displayDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;
