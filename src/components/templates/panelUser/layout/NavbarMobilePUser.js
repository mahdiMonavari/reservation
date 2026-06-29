"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuMobile } from "@/context/MenuMobile";
import { FiLogOut } from "react-icons/fi";

function NavbarMobilePUser({ user, menu }) {
  const { isMenuOpen, toggleMenu } = useContext(menuMobile);
  const pathname = usePathname();

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 md:hidden
          bg-white dark:bg-slate-900
          border-l border-teal-100 dark:border-slate-800
          shadow-xl flex flex-col
          transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-teal-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center">
              <span className="text-white font-Morabba-Bold text-xs">پ</span>
            </div>
            <p className="font-Morabba-Bold text-slate-800 dark:text-white text-sm">
              پنل کاربری
            </p>
          </div>
          <button
            onClick={toggleMenu}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={toggleMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl
                  font-Dana-Medium text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                <Icon size={17} className={isActive ? "text-teal-500" : ""} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-teal-100 dark:border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-500/10">
            <div className="w-8 h-8 rounded-lg bg-teal-200 dark:bg-teal-500/30 flex items-center justify-center shrink-0">
              <span className="text-teal-700 dark:text-teal-300 font-Morabba-Bold text-xs">
                {user?.firstName?.[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs mb-1 font-Morabba-Bold text-slate-700 dark:text-slate-200 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 truncate">
                {user?.phoneNumber}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl
      text-xs font-Dana-Medium
      text-rose-500 dark:text-rose-400
      hover:bg-rose-50 dark:hover:bg-rose-500/10
      transition-all duration-150"
          >
            <FiLogOut size={13} />
            خروج از حساب
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarMobilePUser;
