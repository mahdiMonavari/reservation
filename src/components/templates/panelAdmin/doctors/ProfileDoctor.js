"use client";
import { useState, useEffect } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaCheckCircle,
  FaBan,
  FaTimes,
  FaStar,
  FaBriefcase,
  FaComments,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import DoctorCard from "./DoctorCard";

function ProfileDoctor({ isProfileOpen, onClose, doctor }) {
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (isProfileOpen) {
      setVisible(true);
      setTimeout(() => setAnimClass("open"), 10);
    } else {
      setAnimClass("");
      setTimeout(() => setVisible(false), 300);
    }
  }, [isProfileOpen]);

  const stats = [
    {
      icon: <FaStar />,
      label: "امتیاز",
      value: doctor?.rating ?? "—",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
    },
    {
      icon: <FaBriefcase />,
      label: "سابقه (سال)",
      value: doctor?.experience ?? "—",
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-900/20",
      border: "border-violet-200 dark:border-violet-800",
    },
    {
      icon: <FaComments />,
      label: "نظرات",
      value: doctor?.reviewsCount ?? "—",
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-900/20",
      border: "border-sky-200 dark:border-sky-800",
    },
    {
      icon: <FaClock />,
      label: "زمان ویزیت (دقیقه)",
      value: doctor?.avgAppointmentTime ?? "—",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "حق ویزیت (تومان)",
      value: doctor?.baseFee ? doctor.baseFee.toLocaleString("fa-IR") : "—",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-200 dark:border-rose-800",
    },
  ];

  const handleClose = () => {
    setAnimClass("");
    setTimeout(onClose, 300);
  };

  if (!visible) return null;

  const user = doctor?.userId || {};
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${animClass === "open" ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: animClass === "open" ? "scale(1)" : "scale(0.85)",
          opacity: animClass === "open" ? 1 : 0,
          transition: "transform 300ms ease, opacity 300ms ease",
        }}
        className="w-full max-w-lg mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50
          overflow-hidden"
      >
        <div
          className="relative flex items-center gap-4 px-6 py-5
          bg-gradient-to-l from-violet-50 to-slate-50
          dark:from-violet-900/10 dark:to-slate-800/50
          border-b border-slate-100 dark:border-slate-800"
        >
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl
            bg-violet-100 dark:bg-violet-900/30
            text-violet-600 dark:text-violet-400 shrink-0"
          >
            <FaUserMd size={24} />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate">
              {fullName || "نام نامشخص"}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {doctor?.specialty || "تخصص ثبت نشده"}
              </span>
              {doctor?.isActive ? (
                <span
                  className="flex items-center gap-1 text-xs font-medium
                  text-emerald-600 dark:text-emerald-400
                  bg-emerald-50 dark:bg-emerald-900/20
                  border border-emerald-200 dark:border-emerald-800
                  px-2 py-0.5 rounded-full"
                >
                  <FaCheckCircle size={10} /> فعال
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 text-xs font-medium
                  text-rose-500 dark:text-rose-400
                  bg-rose-50 dark:bg-rose-900/20
                  border border-rose-200 dark:border-rose-800
                  px-2 py-0.5 rounded-full"
                >
                  <FaBan size={10} /> غیرفعال
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="absolute left-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-all duration-150"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 py-5">
          {stats.map((s, i) => (
            <DoctorCard key={i} s={s} />
          ))}

          <div
            className="flex flex-col gap-2 p-3 rounded-xl border
            bg-slate-50 dark:bg-slate-800/50
            border-slate-200 dark:border-slate-700"
          >
            <span className="text-base text-slate-400">
              <FaGraduationCap />
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              رشته تحصیلی
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
              {doctor?.fieldOfStudy || "—"}
            </span>
          </div>
        </div>

        {/* about */}
        {doctor?.about && (
          <div
            className="mx-6 mb-5 flex gap-3 p-4 rounded-xl
            bg-slate-50 dark:bg-slate-800/50
            border border-slate-200 dark:border-slate-700"
          >
            <MdInfo size={18} className="text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {doctor.about}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDoctor;
