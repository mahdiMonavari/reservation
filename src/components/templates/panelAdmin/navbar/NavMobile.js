// NavMobile.jsx
"use client";
import { menuMobile } from "@/context/MenuMobile";
import clsx from "clsx";
import React, { useContext } from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

function NavMobile({ menu, user }) {
  const { isMenuOpen, toggleMenu } = useContext(menuMobile);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={toggleMenu}
        className={clsx(
          "md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "md:hidden fixed top-0 z-50 h-screen w-70 flex flex-col",
          "bg-slate-50 dark:bg-slate-950",
          "border-l border-slate-200 dark:border-slate-800/60",
          "transition-all duration-300 -right-70",
          isMenuOpen && "right-0"
        )}
      >
        {/* logo + close */}
        <div className="px-5 h-20 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 shrink-0">
          <button
            onClick={toggleMenu}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FaTimes />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 shadow-lg shadow-violet-200 dark:shadow-violet-900/50 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-Morabba-Bold">A</span>
            </div>
            <div>
              <p className="text-slate-800 dark:text-slate-100 text-base font-Morabba-Bold leading-none">
                پنل مدیریت
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-Dana-Medium mt-1">
                کلینیک
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {menu.map(({ label, href, icon }) => {
            const isHidden =
              href === "/p-admin/users" && user?.role === "DOCTOR";
            if (isHidden) return null;
            return (
              <Link
                key={href}
                href={href}
                onClick={toggleMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-slate-500 dark:text-slate-400
                  hover:text-slate-900 dark:hover:text-slate-100
                  hover:bg-violet-50 dark:hover:bg-slate-800/70
                  transition-all duration-200 group"
              >
                <span
                  className="text-violet-400 dark:text-violet-500
                  group-hover:text-emerald-500 dark:group-hover:text-emerald-400
                  transition-colors duration-200 text-lg shrink-0"
                >
                  {icon}
                </span>
                <span className="text-base font-Morabba-Bold">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="h-px bg-slate-200 dark:bg-slate-800/60 mx-3 shrink-0" />

        {/* footer */}
        <div className="px-3 py-4 shrink-0">
          <Link
            href={"/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full
              text-slate-400 dark:text-slate-500
              hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-950/40
              transition-all duration-200"
          >
            <span className="text-red-400 dark:text-red-700 text-lg">↩</span>
            <span className="text-base font-Morabba-Bold">خروج</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavMobile;
