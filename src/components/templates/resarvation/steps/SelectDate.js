"use client";
import Calendar from "@/components/modules/calendar/Calendar";
import useReservationStore from "@/store/reservationStore";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";

function SelectDate({ setIsLoading }) {
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const selectedDate = useReservationStore((s) => s.selectedDate);
  const setDate = useReservationStore((s) => s.setDate);
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState(null);
  const handleSelectDate = (d) => {
    setDate(d.gregorian);
  };
  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;
    if (selectedDoctor) {
      getWorkingDays(signal);
    }
    return () => controler.abort();
  }, [selectedDoctor]);

  const getWorkingDays = async (signal) => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await fetch(`/api/schedule/${selectedDoctor}`, signal);
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

  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-xl mt-3 md:text-2xl font-Morabba-Bold text-emerald-900 dark:text-white">
          تاریخ مراجعه را انتخاب کنید
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-400">
          روزهای گذشته قابل انتخاب نیستند
        </p>
      </div>

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          permission={1}
          theme="emerald"
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
            {selectedDate && (
              <span className="text-xs font-Morabba-Bold text-emerald-700 dark:text-emerald-300">
                {new Date(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.date
                ).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;
