import React from "react";
import { FiUser } from "react-icons/fi";

function PastsAppointments({ past }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-base mb-4">
        آخرین نوبت‌های گذشته
      </h3>

      {past.length > 0 ? (
        <div className="flex flex-col gap-2">
          {past.slice(0, 4).map((app) => (
            <div
              key={app._id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                      bg-slate-50 dark:bg-slate-800/50
                      border border-slate-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <FiUser
                  size={14}
                  className="text-slate-500 dark:text-slate-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200 truncate">
                  دکتر {app.doctorId?.firstName} {app.doctorId?.lastName}
                </p>
                <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
                  {app.doctorId?.specialty}
                </p>
              </div>
              <div className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500 shrink-0">
                {new Date(app.date).toLocaleDateString("fa-IR")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-slate-400 dark:text-slate-500 font-Dana-Regular text-sm">
          نوبت گذشته‌ای ندارید
        </div>
      )}
    </div>
  );
}

export default PastsAppointments;
