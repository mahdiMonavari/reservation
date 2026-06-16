"use client";
import React, { useContext } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaConciergeBell,
  FaCalendarCheck,
  FaTachometerAlt,
} from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";

const menu = [
  { label: "داشبورد", href: "/p-admin", icon: <FaTachometerAlt /> },
  { label: "کاربران", href: "/p-admin/users", icon: <FaUsers /> },
  {
    label: "کامنت‌ها",
    href: "/p-admin/comments",
    icon: <FaComments />,
  },
  {
    label: "نوبت‌ها",
    href: "/p-admin/reservations",
    icon: <FaCalendarAlt />,
  },
  {
    label: "خدمات",
    href: "/p-admin/services",
    icon: <FaConciergeBell />,
  },
  {
    label: "روزهای حضور",
    href: "/p-admin/schedule",
    icon: <FaCalendarCheck />,
  },
];

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <aside
      className="sticky top-0 h-screen w-70  flex-col
        bg-slate-50 dark:bg-slate-950 hidden md:flex
        border-l border-slate-200 dark:border-slate-800/60"
    >
      {/* logo */}
      <div className="px-5 h-20 flex items-center border-b border-slate-200 dark:border-slate-800/60">
        <div className="flex items-center gap-5">
          <div
            className="w-8 h-8 rounded-lg
            bg-violet-600 dark:bg-violet-600
            shadow-lg shadow-violet-200 dark:shadow-violet-900/50
            flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div>
            <p className="text-slate-800 dark:text-slate-100 text-xl font-Morabba-Bold leading-none">
              پنل مدیریت
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-3 font-Morabba-Medium">
              کلینیک
            </p>
          </div>
        </div>
      </div>

      {/* menu */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {menu.map(({ label, href, icon }) =>
          (href === "/p-admin/comments" || href === "/p-admin/users") &&
          user.role === "DOCTOR" ? (
            ""
          ) : (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-slate-500 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-slate-100
              hover:bg-violet-50 dark:hover:bg-slate-800/70
              transition-all duration-200 group text-right"
            >
              <span
                className="text-violet-400 dark:text-violet-500
              group-hover:text-emerald-500 dark:group-hover:text-emerald-400
              transition-colors duration-200 text-xl"
              >
                {icon}
              </span>
              <span className="text-xl font-Morabba-Bold">{label}</span>
            </Link>
          )
        )}
      </nav>

      {/* divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-800/60 mx-3" />

      {/* footer */}
      <div className="px-3 py-4">
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full
            text-slate-400 dark:text-slate-500
            hover:text-red-500 dark:hover:text-red-400
            hover:bg-red-50 dark:hover:bg-red-950/40
            transition-all duration-200 text-right"
        >
          <span className="text-red-400 dark:text-red-700 text-lg">↩</span>
          <span className="text-sm font-bold">خروج</span>
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
