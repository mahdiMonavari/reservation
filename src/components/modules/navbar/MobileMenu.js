"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import ThemeCta from "./ThemeCta";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function MobileMenu({ theme, navLinks }) {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      setOpen(false);
      router.replace("/login");
      router.refresh();
      setUser(null);
    }
  };

  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3
          bg-green-50/80 dark:bg-teal-900/80 backdrop-blur-md
          border-b border-green-200/50 dark:border-teal-700/40
          shadow-sm"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="منو"
          className="text-2xl text-green-800 dark:text-gray-100
            hover:text-green-600 dark:hover:text-teal-400 transition-colors"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <span className="font-Morabba-Bold text-lg text-green-800 dark:text-gray-100">
          کلینیک
        </span>

        <ThemeCta prevTheme={theme} />
      </div>

      {/* Drawer */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
          bg-green-50/95 dark:bg-teal-900/95 backdrop-blur-md
          border-b border-green-200/50 dark:border-teal-700/40
          ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1 font-Morabba-Bold text-lg">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded-lg
                  text-green-800/80 dark:text-gray-200
                  hover:text-green-900 dark:hover:text-teal-400
                  hover:bg-green-100/60 dark:hover:bg-teal-800/40
                  transition-all duration-200 text-right"
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Auth section */}
          <li className="pt-2 border-t border-green-200/50 dark:border-teal-700/40 mt-1">
            {user ? (
              <div className="flex flex-col gap-1">
                {/* user header */}
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg
                    hover:bg-green-100/60 dark:hover:bg-teal-800/40
                    transition-all duration-200"
                >
                  <FaChevronDown
                    size={12}
                    className={`text-green-600 dark:text-teal-400
                      transition-transform duration-300
                      ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-800/80 dark:text-gray-200">
                      {user.firstName} {user.lastName}
                    </span>
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full
                      bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    >
                      <FaUser size={13} />
                    </div>
                  </div>
                </button>

                {/* user dropdown */}
                <div
                  className={`flex flex-col gap-1 overflow-hidden transition-all duration-300
                  ${userMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <Link
                    href="/p-user"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-end gap-2.5 py-2.5 px-3 rounded-lg
                      text-sm text-green-800/80 dark:text-gray-200
                      hover:bg-green-100/60 dark:hover:bg-teal-800/40
                      transition-colors duration-150"
                  >
                    پنل کاربری
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    >
                      <FaUser size={12} />
                    </span>
                  </Link>
                  {user.role !== "USER"}
                  <Link
                    href="/p-admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-end gap-2.5 py-2.5 px-3 rounded-lg
                      text-sm text-green-800/80 dark:text-gray-200
                      hover:bg-green-100/60 dark:hover:bg-teal-800/40
                      transition-colors duration-150"
                  >
                    پنل مدریت
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    >
                      <FaUser size={12} />
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-end gap-2.5 py-2.5 px-3 rounded-lg
                      text-sm text-red-500 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20
                      transition-colors duration-150 w-full"
                  >
                    خروج از حساب
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400"
                    >
                      <FaChevronDown size={12} className="-rotate-90" />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2.5 px-3 rounded-lg
                    bg-emerald-500 hover:bg-emerald-600
                    text-white text-sm
                    shadow-sm shadow-emerald-500/30
                    transition-all duration-200"
                >
                  ثبت نام
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2.5 px-3 rounded-lg
                    text-sm text-green-800/80 dark:text-gray-200
                    hover:bg-green-100/60 dark:hover:bg-teal-800/40
                    transition-all duration-200"
                >
                  ورود
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
