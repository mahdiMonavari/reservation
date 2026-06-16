// TopBar.jsx
import React from "react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import ThemeCta from "@/components/modules/navbar/ThemeCta";
import Link from "next/link";
import HamburgerBtn from "./HamburgerBtn";

const themeCtaStyle = `w-9 h-9 flex items-center justify-center rounded-full
  bg-slate-100 dark:bg-slate-800
  text-violet-600 dark:text-violet-400
  hover:bg-violet-100 dark:hover:bg-violet-900/30
  hover:scale-110 active:scale-95
  transition-all duration-200 text-base
  border border-slate-200 dark:border-slate-700`;

async function TopBar({ theme, admin }) {
  return (
    <header
      className="sticky top-0 z-40 w-full flex items-center justify-between px-4 md:px-6
        bg-slate-50/80 dark:bg-slate-950/80 h-20
        backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60"
    >
      {/* right */}
      <div className="flex items-center gap-3">
        {/* لوگو — فقط موبایل */}
        <div className="flex md:hidden items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center
              shadow-md shadow-violet-200 dark:shadow-violet-900/50 shrink-0"
          >
            <span className="text-white text-xs font-Morabba-Bold">A</span>
          </div>
          <p className="text-slate-800 dark:text-slate-100 text-base font-Morabba-Bold">
            پنل مدیریت
          </p>
        </div>

        {/* عنوان — فقط دسکتاپ */}
        <h1 className="hidden md:block text-base font-Morabba-Bold text-slate-500 dark:text-slate-400">
          پنل مدیریت
        </h1>
      </div>

      {/* left */}
      <div className="flex items-center gap-2 md:gap-3">
        <ThemeCta prevTheme={theme} style={themeCtaStyle} />

        {/* همبرگر — فقط موبایل */}
        <HamburgerBtn />

        {/* پروفایل — فقط دسکتاپ */}
        <div className="hidden md:flex items-center gap-3">
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="relative group">
            <button
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl
                hover:bg-slate-100 dark:hover:bg-slate-800/70
                transition-all duration-200 select-none"
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0
                  bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/50"
              >
                <FaUser size={14} />
              </div>
              <div className="text-right">
                <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 leading-none">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="text-xs font-Dana-Medium text-violet-500 dark:text-violet-400 mt-0.5">
                  مدیر سیستم
                </p>
              </div>
              <FaChevronDown
                className="text-slate-400 dark:text-slate-500
                  transition-transform duration-300 group-hover:rotate-180 shrink-0"
              />
            </button>

            <div
              className="absolute left-0 top-[calc(100%+8px)] w-56
                opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50
                overflow-hidden z-50"
            >
              <div
                className="px-4 py-3 border-b border-slate-100 dark:border-slate-800
                  bg-slate-50 dark:bg-slate-800/50"
              >
                <p className="text-xs font-Dana-Medium text-slate-400 dark:text-slate-500">
                  ادمین
                </p>
                <p className="text-sm font-Morabba-Bold text-slate-800 dark:text-slate-100 mt-0.5">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="text-xs font-Dana-Medium text-violet-500 dark:text-violet-400 mt-0.5">
                  {admin?.phoneNumber}
                </p>
              </div>

              <div className="p-1.5 flex flex-col gap-0.5">
                <Link
                  href="/p-admin/profile"
                  className="flex items-center justify-end gap-2.5 px-3 py-2.5 rounded-xl
                    text-sm font-Morabba-Bold text-slate-600 dark:text-slate-300
                    hover:bg-violet-50 dark:hover:bg-violet-900/20
                    hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-150"
                >
                  پروفایل
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 shrink-0"
                  >
                    <FaUser size={12} />
                  </span>
                </Link>

                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-1 my-0.5" />

                <button
                  className="flex items-center justify-end gap-2.5 px-3 py-2.5 rounded-xl
                    text-sm font-Morabba-Bold text-red-500 dark:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20
                    transition-colors duration-150 w-full"
                >
                  خروج
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400 shrink-0"
                  >
                    <FaChevronDown size={12} className="-rotate-90" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
