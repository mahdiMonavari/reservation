"use client";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { useEffect, useState } from "react";
import ChangeDate from "./changeAppointment/ChangeDate";
import ChangeHour from "./changeAppointment/ChangeHour";

const STEPS = {
  DATE: 1,
  HOUR: 2,
};

function ChangeBase({
  timeStart,
  timeEnd,
  totalTime,
  isShowReschedule,
  onToggleShow,
  doctorId,
  resevatedDate,
  serviceIds,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DATE);

  useEffect(() => {
    const controller = new AbortController();
    if (isShowReschedule) {
      getWorkingDays(controller.signal);
    }
    return () => controller.abort();
  }, [isShowReschedule, doctorId, resevatedDate]);

  const getWorkingDays = async (signal) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/schedule/${doctorId}`, { signal });
      if (!res.ok) throw new Error("مشکلی در برقراری ارتباط با سرور رخ داد.");
      const data = await res.json();
      setDateList(data);
      const matched = data.find((item) => item.date === resevatedDate);
      if (matched) setSelectedDate(matched);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    console.log("Confirming step:", step);
  };

  const handleSelectDate = (d) => {
    const matched = dateList.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === d.gregorian.year &&
        itemDate.getMonth() === d.gregorian.month &&
        itemDate.getDate() === d.gregorian.date
      );
    });
    if (matched) setSelectedDate(matched);
  };

  const stepComponents = {
    [STEPS.DATE]: (
      <ChangeDate
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
        dateList={dateList}
      />
    ),
    [STEPS.HOUR]: (
      <ChangeHour
        doctorId={doctorId}
        date={resevatedDate}
        serviceIds={serviceIds}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        timeStart={timeStart}
        timeEnd={timeEnd}
        totalTime={totalTime}
        timeStartWork={selectedDate?.timeStart}
        timeEndWork={selectedDate?.timeEnd}
      />
    ),
  };

  const ActiveComponent = stepComponents[step] ?? stepComponents[STEPS.DATE];

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300
          ${isShowReschedule ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onToggleShow}
        />

        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-800 transition-all transform">
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-slate-500 font-Morabba-Bold dark:text-slate-400">
                مرحله {step} از ۲
              </span>
              <div className="flex gap-1 flex-1">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    step >= 1
                      ? "bg-emerald-600"
                      : "bg-slate-200 dark:bg-slate-600"
                  }`}
                />
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    step >= 2
                      ? "bg-emerald-600"
                      : "bg-slate-200 dark:bg-slate-600"
                  }`}
                />
              </div>
            </div>
            <section className="min-h-[300px]">{ActiveComponent}</section>
          </div>
          <section className="border-t font-Morabba-Bold border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 flex items-center justify-between gap-3">
            {step === STEPS.HOUR ? (
              <button
                onClick={() => setStep(STEPS.DATE)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                بازگشت
              </button>
            ) : (
              <button
                onClick={onToggleShow}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
              >
                انصراف
              </button>
            )}
            <button
              onClick={
                step === STEPS.HOUR ? handleConfirm : () => setStep(STEPS.HOUR)
              }
              disabled={!selectedDate && step === STEPS.DATE}
              className={`flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all active:scale-95 
                ${
                  !selectedDate && step === STEPS.DATE
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none"
                }`}
            >
              {step === STEPS.DATE ? "انتخاب ساعت" : "تایید نهایی"}
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default ChangeBase;
