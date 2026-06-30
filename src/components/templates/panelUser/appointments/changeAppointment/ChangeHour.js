"use client";
import { useEffect, useState } from "react";
import { FiClock, FiAlertCircle } from "react-icons/fi";

const STEP_MINUTES = 15;

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTime = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const generateSlots = (start, end) => {
  const startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);
  const slots = [];
  for (let m = startMin; m < endMin; m += STEP_MINUTES) {
    slots.push(minutesToTime(m));
  }
  return slots;
};

const getTotalDuration = (services) =>
  services.reduce((sum, s) => {
    const duration = parseInt(s.duration, 10);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0);

const isSlotTaken = (slot, takenAppointments) => {
  const slotMin = timeToMinutes(slot);
  return takenAppointments.some((app) => {
    const appStart = timeToMinutes(app.timeStart);
    const appEnd = timeToMinutes(app.timeEnd);
    return slotMin >= appStart && slotMin < appEnd;
  });
};

const isSlotInsufficient = (
  slot,
  takenAppointments,
  endTime,
  totalDuration
) => {
  const slotMin = timeToMinutes(slot);
  const slotEndMin = slotMin + totalDuration;
  const shiftEndMin = timeToMinutes(endTime);

  if (slotEndMin > shiftEndMin) return true;

  return takenAppointments.some((app) => {
    const appStart = timeToMinutes(app.timeStart);
    return appStart > slotMin && appStart < slotEndMin;
  });
};

function ChangeHour({
  doctorId,
  date,
  serviceIds,
  selectedTime,
  setSelectedTime,
  timeStartWork,
  timeEndWork,
}) {
  const [takenSlots, setTakenSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const slots =
    timeStartWork && timeEndWork
      ? generateSlots(timeStartWork, timeEndWork)
      : [];

  const totalDuration = getTotalDuration(serviceIds || []);

  useEffect(() => {
    const controller = new AbortController();
    getTakenAppointments(controller.signal);
    return () => controller.abort();
  }, []);

  const getTakenAppointments = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/appointments/slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, date }),
        signal,
      });
      if (!res.ok) throw new Error("مشکلی در برقراری ارتباط با سرور رخ داد.");
      const data = await res.json();
      setTakenSlots(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-lg font-Morabba-Bold text-slate-800 dark:text-white">
          ساعت جدید را انتخاب کنید
        </h2>
        <p className="text-xs mt-1 font-Dana-Regular text-slate-400 dark:text-slate-500">
          هر slot معادل ۱۵ دقیقه می‌باشد
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3 mb-4">
          <FiAlertCircle size={15} />
          <span className="font-Dana-Regular">{error}</span>
        </div>
      )}

      {!loading && !error && slots.length === 0 && (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 font-Dana-Regular text-sm">
          برای این تاریخ زمانی تعریف نشده است
        </div>
      )}

      {slots.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isSelected = selectedTime === slot;
            const isTaken = isSlotTaken(slot, takenSlots);
            const isInsufficient =
              !isTaken &&
              timeEndWork &&
              isSlotInsufficient(slot, takenSlots, timeEndWork, totalDuration);
            const isDisabled = isTaken || isInsufficient;

            return (
              <button
                key={slot}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedTime(slot)}
                className={`flex items-center justify-center gap-1 rounded-xl py-2.5 px-1
                  border transition-all duration-200 font-Dana-Medium text-xs
                  ${
                    isTaken
                      ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through"
                      : isInsufficient
                        ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-400 dark:text-amber-500/60 cursor-not-allowed"
                        : isSelected
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                          : "bg-white/60 dark:bg-white/5 border-emerald-100 dark:border-white/10 text-emerald-800 dark:text-white/70 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:border-white/20 dark:hover:bg-white/10"
                  }`}
              >
                <FiClock
                  size={11}
                  className={
                    isTaken
                      ? "text-slate-400 dark:text-slate-600"
                      : isInsufficient
                        ? "text-amber-400 dark:text-amber-500/60"
                        : isSelected
                          ? "text-white"
                          : "text-emerald-400"
                  }
                />
                {slot}
              </button>
            );
          })}
        </div>
      )}

      {selectedTime && (
        <div className="mt-4 bg-emerald-500/10 border border-emerald-300/50 dark:border-emerald-400/20 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <FiClock
              size={13}
              className="text-emerald-500 dark:text-emerald-400"
            />
            <span className="text-xs font-Dana-Regular text-emerald-600 dark:text-emerald-400">
              ساعت جدید:
            </span>
            <span className="text-xs font-Morabba-Bold text-emerald-700 dark:text-emerald-300">
              {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeHour;
