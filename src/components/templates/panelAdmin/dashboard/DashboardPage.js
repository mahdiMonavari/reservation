"use client";
import { useState } from "react";
import {
  FaUsers,
  FaCalendarCheck,
  FaComments,
  FaStar,
  FaCalendarAlt,
  FaCoins,
  FaChartBar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const revenueData = {
  "6m": [
    { name: "فروردین", value: 8 },
    { name: "اردیبهشت", value: 11 },
    { name: "خرداد", value: 9 },
    { name: "تیر", value: 14 },
    { name: "مرداد", value: 12 },
    { name: "شهریور", value: 12.4 },
  ],
  "12m": [
    { name: "مهر", value: 6 },
    { name: "آبان", value: 7 },
    { name: "آذر", value: 5 },
    { name: "دی", value: 8 },
    { name: "بهمن", value: 9 },
    { name: "اسفند", value: 10 },
    { name: "فروردین", value: 8 },
    { name: "اردیبهشت", value: 11 },
    { name: "خرداد", value: 9 },
    { name: "تیر", value: 14 },
    { name: "مرداد", value: 12 },
    { name: "شهریور", value: 12.4 },
  ],
};

const roleLabel = { ADMIN: "ادمین", DOCTOR: "پزشک", USER: "کاربر" };
const roleStyle = {
  ADMIN: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  DOCTOR:
    "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  USER: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

function StatCard({ icon, label, value, sub, iconBg, iconColor }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-2">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="text-sm font-Dana-Medium text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
        {value}
      </div>
      {sub && (
        <div className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500">
          {sub}
        </div>
      )}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name?.slice(0, 2) || "؟";
  return (
    <div
      className="w-8 h-8 rounded-full shrink-0
        bg-violet-100 dark:bg-violet-900/30
        text-violet-700 dark:text-violet-400
        flex items-center justify-center text-xs font-Morabba-Bold"
    >
      {initials}
    </div>
  );
}

function DashboardPage({ adminStats, doctorStats, recentUsers, userRole }) {
  const [range, setRange] = useState("6m");

  const isAdmin = userRole === "ADMIN";
  const isDoctor = userRole === "DOCTOR";

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* آمار ادمین */}
      {isAdmin && (
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-Morabba-Bold text-slate-700 dark:text-slate-300">
            نمای کلی سیستم
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              icon={<FaUsers size={14} />}
              label="کاربران"
              value={adminStats?.usersCount ?? "—"}
              sub={`+${adminStats?.newUsersThisWeek ?? 0} این هفته`}
              iconBg="bg-violet-100 dark:bg-violet-900/30"
              iconColor="text-violet-600 dark:text-violet-400"
            />
            <StatCard
              icon={<FaChartBar size={14} />}
              label="پزشکان"
              value={adminStats?.doctorsCount ?? "—"}
              sub={`${adminStats.deactiveDoctor} دکتر غیر فعال است`}
              iconBg="bg-emerald-100 dark:bg-emerald-900/30"
              iconColor="text-emerald-600 dark:text-emerald-400"
            />
            <StatCard
              icon={<FaCalendarCheck size={14} />}
              label="نوبت‌ها"
              value={adminStats?.reservationsCount ?? "—"}
              sub="کل ثبت شده"
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              icon={<FaComments size={14} />}
              label="کامنت‌ها"
              value={adminStats?.commentsCount ?? "—"}
              sub={`${adminStats?.pendingComments ?? 0} در انتظار`}
              iconBg="bg-amber-100 dark:bg-amber-900/30"
              iconColor="text-amber-600 dark:text-amber-400"
            />
          </div>
        </section>
      )}

      {/* آمار دکتر */}
      {(isDoctor || isAdmin) && (
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-Morabba-Bold text-slate-700 dark:text-slate-300">
            آمار {isAdmin ? "پزشک" : "شما"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              icon={<FaCalendarAlt size={14} />}
              label="نوبت‌های امروز"
              value={doctorStats?.todayReservations ?? "—"}
              sub={`${doctorStats?.remaining ?? 0} باقی‌مانده`}
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              icon={<FaCalendarCheck size={14} />}
              label="کل نوبت‌ها"
              value={doctorStats?.totalReservations ?? "—"}
              sub="از ابتدا"
              iconBg="bg-emerald-100 dark:bg-emerald-900/30"
              iconColor="text-emerald-600 dark:text-emerald-400"
            />
            <StatCard
              icon={<FaCoins size={14} />}
              label="درآمد ماه"
              value={doctorStats?.monthlyIncome ?? "—"}
              sub="تومان"
              iconBg="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
            />
            <StatCard
              icon={<FaStar size={14} />}
              label="امتیاز"
              value={doctorStats?.rating ?? "—"}
              sub="از ۵"
              iconBg="bg-amber-100 dark:bg-amber-900/30"
              iconColor="text-amber-600 dark:text-amber-400"
            />
          </div>
        </section>
      )}

      {/* چارت درآمد */}
      <section className="flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100">
              درآمد ماهانه
            </h2>
            <div className="flex gap-1.5">
              {["6m", "12m"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`text-xs font-Dana-Medium px-3 py-1 rounded-full border transition-all duration-150
                    ${
                      range === r
                        ? "bg-violet-600 text-white border-violet-600"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-violet-300 dark:hover:border-violet-700"
                    }`}
                >
                  {r === "6m" ? "۶ ماه" : "۱۲ ماه"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-sm bg-violet-600 inline-block" />
            <span className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500">
              میلیون تومان
            </span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData[range]} barSize={24}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v + "M"}
              />
              <Tooltip
                formatter={(v) => [v.toFixed(1) + " میلیون تومان", "درآمد"]}
                contentStyle={{
                  background: "var(--tw-bg, white)",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* آخرین کاربران — فقط ادمین */}
      {isAdmin && (
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-Morabba-Bold text-slate-700 dark:text-slate-300">
            آخرین کاربران ثبت‌نام شده
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {(recentUsers ?? []).map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 px-5 py-3
                  border-b border-slate-100 dark:border-slate-800 last:border-b-0
                  hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Avatar name={user.firstName} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p
                    className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500"
                    dir="ltr"
                  >
                    {user.phoneNumber}
                  </p>
                </div>
                <span
                  className={`text-xs font-Morabba-Bold px-2.5 py-1 rounded-lg ${roleStyle[user.role]}`}
                >
                  {roleLabel[user.role]}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default DashboardPage;
