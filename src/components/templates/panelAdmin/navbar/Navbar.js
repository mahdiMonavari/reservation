"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import NavMobile from "./NavMobile";
import menu from "./navbarLinks";
import NavbarLink from "./NavbarLink";
function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <NavMobile menu={menu} user={user} setUser={setUser} />
      <aside
        className={`sticky top-0 h-screen w-70  flex-col
        bg-slate-50 dark:bg-slate-950 md:flex right-0 hidden
        border-l border-slate-200 dark:border-slate-800/60`}
      >
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

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {menu.map(({ label, href, icon }) => (
            <NavbarLink
              label={label}
              href={href}
              icon={icon}
              role={user.role}
              key={href}
            />
          ))}
        </nav>

        <div className="h-px bg-slate-200 dark:bg-slate-800/60 mx-3" />

        <Link href={"/"} className="px-3 py-4">
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
        </Link>
      </aside>
    </>
  );
}

export default Navbar;
