import React from "react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import ThemeCta from "@/components/modules/navbar/ThemeCta";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import Link from "next/link";

async function TopBar() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const token = cookieStore.get("token")?.value;
  const admin = verifyAccessToken(token);

  return (
    <header
      className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-6
        bg-slate-50/80 dark:bg-slate-950/80
        backdrop-blur-md
        border-b border-slate-200 dark:border-slate-800/60"
    >
      {/* right — title */}
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-slate-500 dark:text-slate-400">
          پنل مدیریت
        </h1>
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          داشبورد
        </span>
      </div>

      {/* left */}
      <div className="flex items-center gap-3">
        <ThemeCta prevTheme={theme} />

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        {/* admin dropdown */}
        <div className="relative group">
          <button
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl
              hover:bg-slate-100 dark:hover:bg-slate-800/70
              transition-all duration-200 select-none"
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full
              bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/50"
            >
              <FaUser size={13} />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">
                {admin?.firstName} {admin?.lastName}
              </p>
              <p className="text-xs text-violet-500 dark:text-violet-400 mt-0.5">
                مدیر سیستم
              </p>
            </div>
            <FaChevronDown
              size={11}
              className="text-slate-400 dark:text-slate-500
                transition-transform duration-300
                group-hover:rotate-180"
            />
          </button>

          {/* dropdown */}
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
            {/* header */}
            <div
              className="px-4 py-3 border-b border-slate-100 dark:border-slate-800
              bg-slate-50 dark:bg-slate-800/50"
            >
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                ادمین
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {admin?.firstName} {admin?.lastName}
              </p>
              <p className="text-xs text-violet-500 dark:text-violet-400 mt-0.5">
                {admin?.phone}
              </p>
            </div>

            {/* links */}
            <div className="p-1.5 flex flex-col gap-0.5">
              <Link
                href="/admin-p/profile"
                className="flex items-center justify-end gap-2.5 px-3 py-2.5 rounded-xl
                  text-sm font-bold text-slate-600 dark:text-slate-300
                  hover:bg-violet-50 dark:hover:bg-violet-900/20
                  hover:text-violet-700 dark:hover:text-violet-300
                  transition-colors duration-150"
              >
                پروفایل
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-lg
                  bg-violet-100 dark:bg-violet-500/20
                  text-violet-600 dark:text-violet-400"
                >
                  <FaUser size={12} />
                </span>
              </Link>

              <div className="h-px bg-slate-100 dark:bg-slate-800 mx-1 my-0.5" />

              <button
                className="flex items-center justify-end gap-2.5 px-3 py-2.5 rounded-xl
                  text-sm font-bold text-red-500 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors duration-150 w-full"
              >
                خروج
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-lg
                  bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400"
                >
                  <FaChevronDown size={12} className="-rotate-90" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
