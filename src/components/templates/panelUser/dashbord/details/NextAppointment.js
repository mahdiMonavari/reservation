import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

function NextAppointment({ nextAppointment }) {
  return (
    <div className="rounded-2xl border border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-base mb-4">
        نزدیک‌ترین نوبت
      </h3>

      {nextAppointment ? (
        <div className="rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center shrink-0">
              <FiUser size={18} className="text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="font-Morabba-Bold text-slate-800 dark:text-white text-sm">
                دکتر {nextAppointment.doctorId?.firstName}{" "}
                {nextAppointment.doctorId?.lastName}
              </p>
              <p className="text-xs font-Dana-Regular text-teal-600 dark:text-teal-400 mt-0.5">
                {nextAppointment.doctorId?.specialty}
              </p>
            </div>
          </div>

          <div className="h-px bg-teal-200 dark:bg-teal-500/20" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-Dana-Regular text-slate-500 dark:text-slate-400">
              <FiCalendar size={12} className="text-teal-500" />
              {new Date(nextAppointment.date).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-Dana-Regular text-slate-500 dark:text-slate-400">
              <FiClock size={12} className="text-teal-500" />
              {nextAppointment.timeStart} تا {nextAppointment.timeEnd}
            </div>
          </div>

          {nextAppointment.serviceIds?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {nextAppointment.serviceIds.map((s) => (
                <span
                  key={s._id}
                  className="text-[11px] px-2.5 py-1 rounded-full font-Dana-Regular
                          bg-teal-100 dark:bg-teal-500/20
                          text-teal-700 dark:text-teal-300
                          border border-teal-200 dark:border-teal-500/30"
                >
                  {s.title}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 font-Dana-Regular text-sm">
          نوبت آینده‌ای ندارید
        </div>
      )}
    </div>
  );
}

export default NextAppointment;
