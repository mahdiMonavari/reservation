"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiPlus,
} from "react-icons/fi";
import Link from "next/link";

const isUpcoming = (date) => new Date(date) >= new Date();

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;
    const controller = new AbortController();
    fetchAppointments(controller.signal);
    return () => controller.abort();
  }, [user]);

  const fetchAppointments = async (signal) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/appointments/${user._id}`, { signal });
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
      const { data } = await res.json();
      setAppointments(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const upcoming = appointments
    .filter((a) => isUpcoming(a.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = appointments
    .filter((a) => !isUpcoming(a.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const nextAppointment = upcoming[0] || null;

  const stats = [
    {
      label: "کل نوبت‌ها",
      value: appointments.length,
      icon: FiCalendar,
      color: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
      border: "border-teal-100 dark:border-teal-500/20",
    },
    {
      label: "نوبت‌های آینده",
      value: upcoming.length,
      icon: FiClock,
      color: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
      border: "border-sky-100 dark:border-sky-500/20",
    },
    {
      label: "نوبت‌های گذشته",
      value: past.length,
      icon: FiCheckCircle,
      color: "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
      border: "border-slate-100 dark:border-slate-700",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-60">
        <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-teal-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3">
        <FiAlertCircle size={15} />
        <span className="font-Dana-Regular">{error}</span>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* خوش‌آمدگویی */}
      <div className="mb-6">
        <h2 className="text-xl font-Morabba-Bold text-slate-800 dark:text-white">
          سلام، {user?.firstName} عزیز 👋
        </h2>
        <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 mt-1">
          خلاصه‌ای از نوبت‌های شما
        </p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl border px-4 py-4 flex flex-col gap-2
                bg-white dark:bg-slate-900 ${stat.border}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <Icon size={17} />
              </div>
              <p className="text-2xl font-Morabba-Bold text-slate-800 dark:text-white">
                {stat.value.toLocaleString("fa-IR")}
              </p>
              <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* نزدیک‌ترین نوبت */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-base mb-4">
              نزدیک‌ترین نوبت
            </h3>

            {nextAppointment ? (
              <div className="rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center shrink-0">
                    <FiUser
                      size={18}
                      className="text-teal-600 dark:text-teal-400"
                    />
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
                    {new Date(nextAppointment.date).toLocaleDateString(
                      "fa-IR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
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

          {/* آخرین نوبت‌های گذشته */}
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
        </div>

        {/* ستون کناری */}
        <div className="flex flex-col gap-4">
          {/* دکمه رزرو */}
          <Link
            href="/reservation"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl
              bg-teal-500 hover:bg-teal-600 active:bg-teal-700
              text-white font-Morabba-Bold text-sm
              transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus size={18} />
            رزرو نوبت جدید
          </Link>

          {/* اطلاعات پروفایل */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-base mb-4">
              پروفایل من
            </h3>
            <div className="flex flex-col gap-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center mx-auto">
                <span className="text-teal-600 dark:text-teal-300 font-Morabba-Bold text-xl">
                  {user?.firstName?.[0]}
                </span>
              </div>
              <p className="text-center font-Morabba-Bold text-slate-800 dark:text-white text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-center text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
                {user?.phoneNumber}
              </p>
              <Link
                href="/p-user/profile"
                className="mt-1 text-center text-xs font-Dana-Medium
                  text-teal-600 dark:text-teal-400
                  hover:text-teal-700 dark:hover:text-teal-300
                  transition-colors duration-150"
              >
                ویرایش پروفایل ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
