"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import MyInfo from "./details/MyInfo";
import NewReservation from "./details/NewReservation";
import PastsAppointments from "./details/PastsAppointments";
import NextAppointment from "./details/NextAppointment";
import UserPanelCard from "./details/UserPanelCard";

const toDateTime = (date, timeStart) => {
  const [hours, minutes] = timeStart.split(":").map(Number);
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const isUpcoming = (date, timeStart) =>
  toDateTime(date, timeStart) >= new Date();

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

  const upcoming = useMemo(
    () =>
      appointments
        .filter((a) => isUpcoming(a.date, a.timeStart))
        .sort(
          (a, b) =>
            toDateTime(a.date, a.timeStart) - toDateTime(b.date, b.timeStart),
        ),
    [appointments],
  );

  const past = useMemo(
    () =>
      appointments
        .filter((a) => !isUpcoming(a.date, a.timeStart))
        .sort(
          (a, b) =>
            toDateTime(b.date, b.timeStart) - toDateTime(a.date, a.timeStart),
        ),
    [appointments],
  );

  const nextAppointment = upcoming[0] || null;

  const stats = [
    {
      id: "total",
      label: "کل نوبت‌ها",
      value: appointments.length,
      icon: FiCalendar,
      color: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
      border: "border-teal-100 dark:border-teal-500/20",
    },
    {
      id: "upcoming",
      label: "نوبت‌های آینده",
      value: upcoming.length,
      icon: FiClock,
      color: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
      border: "border-sky-100 dark:border-sky-500/20",
    },
    {
      id: "past",
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
      <div className="mb-6">
        <h2 className="text-xl font-Morabba-Bold text-slate-800 dark:text-white">
          سلام، {user?.firstName} عزیز 👋
        </h2>
        <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 mt-1">
          خلاصه‌ای از نوبت‌های شما
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <UserPanelCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <NextAppointment nextAppointment={nextAppointment} />
          <PastsAppointments past={past} />
        </div>
        <div className="flex flex-col gap-4">
          <NewReservation />
          <MyInfo user={user} />
        </div>
      </div>
    </div>
  );
}
