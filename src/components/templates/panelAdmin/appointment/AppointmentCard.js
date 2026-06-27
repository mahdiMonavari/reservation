"use client";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import {
  FaClock,
  FaUser,
  FaStethoscope,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";
import { successToast, errorToast } from "@/components/modules/toast/toast";

function AppointmentCard({ appointment, onEdit }) {
  const [isVisited, setIsVisited] = useState(appointment.isVisited);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/appointments/${appointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisited: !isVisited }),
      });
      if (res.status === 200) {
        setIsVisited((prev) => !prev);
        successToast(!isVisited ? "مراجعه ثبت شد" : "مراجعه لغو شد");
      } else {
        errorToast("خطایی پیش آمد");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = appointment.date
    ? new Date(appointment.date).toLocaleDateString("fa-IR")
    : null;

  return (
    <div
      className={`rounded-2xl border
        shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-4
        ${
          isVisited
            ? "border-emerald-200 bg-white dark:bg-slate-900 dark:border-emerald-900 hover:shadow-emerald-50 dark:hover:shadow-emerald-950"
            : "border-slate-200 bg-white/70 dark:bg-slate-900/70  dark:border-slate-800 hover:shadow-slate-100 dark:hover:shadow-slate-950"
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/30
                text-violet-700 dark:text-violet-400
                flex items-center justify-center shrink-0"
            >
              <FaUser size={11} />
            </div>
            <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100">
              {appointment.userId?.firstName} {appointment.userId?.lastName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30
                text-emerald-700 dark:text-emerald-400
                flex items-center justify-center shrink-0"
            >
              <FaStethoscope size={11} />
            </div>
            <span className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100">
              {appointment.doctorId?.firstName} {appointment.doctorId?.lastName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleVisit}
            disabled={isLoading}
            title={isVisited ? "لغو مراجعه" : "ثبت مراجعه"}
            className={`w-8 h-8 flex items-center justify-center rounded-lg
              border transition-all duration-150
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isVisited
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-500 hover:border-emerald-200"
              }`}
          >
            <FaCheck size={11} />
          </button>

          <button
            onClick={() => onEdit(appointment)}
            title="افزودن توضیحات"
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-400 hover:text-violet-600 dark:hover:text-violet-400
              hover:bg-violet-50 dark:hover:bg-violet-900/20
              border border-transparent hover:border-violet-200 dark:hover:border-violet-800
              transition-all duration-150"
          >
            <FiEdit3 size={14} />
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />
      <div className="flex items-center flex-wrap gap-3">
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <FaCalendarAlt size={11} />
            <span className="text-xs font-Dana-Medium">{formattedDate}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <FaClock size={11} />
          <span className="text-xs font-Dana-Medium" dir="ltr">
            {appointment.timeStart} — {appointment.timeEnd}
          </span>
        </div>
        <span className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500">
          {appointment.totalTime} دقیقه
        </span>
      </div>
      <div
        className={`flex items-center gap-1.5 text-xs font-Morabba-Bold px-2.5 py-1.5 rounded-lg w-fit
          ${
            isVisited
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          }`}
      >
        <FaCheck size={10} />
        {isVisited ? "مراجعه کرده" : "مراجعه نکرده"}
      </div>
      {appointment.serviceIds?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {appointment.serviceIds.map((service) => (
            <span
              key={service._id}
              className="text-xs font-Morabba-Bold px-2.5 py-1 rounded-lg
                bg-blue-50 dark:bg-blue-900/20
                text-blue-700 dark:text-blue-400
                border border-blue-100 dark:border-blue-900"
            >
              {service.title}
            </span>
          ))}
        </div>
      )}
      {appointment.description && (
        <div
          className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3
            border border-slate-100 dark:border-slate-800"
        >
          <p className="text-xs font-Morabba-Bold text-slate-500 dark:text-slate-400 mb-1">
            شرح حال
          </p>
          <p className="text-sm font-Dana-Medium text-slate-600 dark:text-slate-300 leading-6">
            {appointment.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
