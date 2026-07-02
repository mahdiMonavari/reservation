"use client";
import { errorToast } from "@/components/modules/toast/toast";
import useReservationStore from "@/store/reservationStore";
import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiList,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTime = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const getTotalDuration = (services) =>
  services.reduce((sum, s) => {
    const duration = parseFloat(s.duration);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0);

function Confirm() {
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const selectedServices = useReservationStore((s) => s.selectedServices);
  const selectedDate = useReservationStore((s) => s.selectedDate);
  const selectedTime = useReservationStore((s) => s.selectedTime);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const totalDuration = getTotalDuration(selectedServices);
  const timeEnd = minutesToTime(timeToMinutes(selectedTime) + totalDuration);
  const displayDate = selectedDate
    ? new Date(selectedDate.date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleConfirm = async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceIds: selectedServices.map((s) => s._id),
          doctorId: selectedDoctor,
          totalTime: totalDuration,
          timeStart: selectedTime,
          timeEnd,
          date: selectedDate.date,
        }),
      });

      if (!res.ok) throw new Error("مشکلی در ثبت نوبت رخ داد.");

      const dateShamsi = new Date(selectedDate.date).toLocaleDateString(
        "fa-IR",
      );

      const resSms = await fetch("/api/sms/confirm", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ dateShamsi, timeStart: selectedTime }),
      });
      setSuccess(true);

      if (!resSms.ok) {
        errorToast(
          "پیام رزرو با موفقیت ارسال نشد، تاریخ حضور خود را یادداشت کنید",
        );
      }

      setTimeout(
        () => {
          router.replace("/p-user");
        },
        resSms.ok ? 1500 : 4000,
      );
    } catch (err) {
      setError(err.message || "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
          <FiCheckCircle size={32} className="text-emerald-500" />
        </div>
        <h3 className="text-xl font-Morabba-Bold text-emerald-800 dark:text-emerald-200">
          نوبت شما با موفقیت ثبت شد
        </h3>
        <p className="text-sm font-Dana-Regular text-slate-500 dark:text-slate-400">
          {displayDate} — ساعت {selectedTime} تا {timeEnd}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-right mb-6">
        <h2 className="text-xl mt-3 md:text-2xl font-Morabba-Bold text-emerald-900 dark:text-white">
          تأیید و ثبت نهایی نوبت
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-400">
          اطلاعات زیر را بررسی کنید و سپس نوبت را ثبت کنید
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {/* تاریخ */}
        <div className="flex items-center gap-3 bg-white/60 dark:bg-white/5 border border-emerald-100 dark:border-white/10 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
            <FiCalendar
              size={16}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div className="text-right">
            <p className="text-[11px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-0.5">
              تاریخ مراجعه
            </p>
            <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-white">
              {displayDate}
            </p>
          </div>
        </div>

        {/* ساعت */}
        <div className="flex items-center gap-3 bg-white/60 dark:bg-white/5 border border-emerald-100 dark:border-white/10 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
            <FiClock
              size={16}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div className="text-right">
            <p className="text-[11px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-0.5">
              ساعت مراجعه
            </p>
            <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-white">
              {selectedTime} تا {timeEnd}
              <span className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500 mr-2">
                ({totalDuration} دقیقه)
              </span>
            </p>
          </div>
        </div>

        {/* خدمات */}
        <div className="flex items-start gap-3 bg-white/60 dark:bg-white/5 border border-emerald-100 dark:border-white/10 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <FiList
              size={16}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div className="text-right flex-1">
            <p className="text-[11px] font-Dana-Regular text-slate-400 dark:text-slate-500 mb-2">
              خدمات انتخابی
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectedServices.map((s) => (
                <span
                  key={s._id}
                  className="text-[11px] px-2.5 py-1 rounded-full font-Dana-Regular
                    bg-emerald-100 text-emerald-700
                    dark:bg-emerald-500/20 dark:text-emerald-300
                    border border-emerald-200 dark:border-emerald-500/30"
                >
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3 mb-4">
          <FiAlertCircle size={15} />
          <span className="font-Dana-Regular">{error}</span>
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleConfirm}
        className="w-full py-3.5 rounded-2xl font-Morabba-Bold text-base
          bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
          disabled:bg-emerald-300 dark:disabled:bg-emerald-800
          text-white transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <FiLoader size={16} className="animate-spin" />
            در حال ثبت...
          </>
        ) : (
          "ثبت نهایی نوبت"
        )}
      </button>
    </div>
  );
}

export default Confirm;
