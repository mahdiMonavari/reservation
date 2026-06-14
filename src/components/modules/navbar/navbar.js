"use client";
import React, { useContext } from "react";
import ThemeCta from "./ThemeCta";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavbarResarvationLink from "./NavbarReservationLink";
import { AuthContext } from "@/context/AuthContext";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { successToast } from "../toast/toast";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact-us", label: "ارتباط با ما" },
  { href: "/doctors", label: "دکترها" },
  { href: "/reservation", label: "رزرو نوبت" },
];

function Navbar({ theme }) {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const router = useRouter();
  const logoutHandler = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      successToast("خروج موفقیت آمیز بود");
      setUser(null);
      router.refresh();
    }
  };
  return (
    <>
      {/* ─── Desktop navbar ─── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50
          hidden sm:flex items-center justify-between
          px-6 py-3
          w-[92%] max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
          bg-green-50/60 dark:bg-teal-900/60
          backdrop-blur-md
          rounded-2xl
          border border-green-200/60 dark:border-teal-700/50
          shadow-lg shadow-green-900/5 dark:shadow-teal-950/30
          transition-colors duration-300"
      >
        {/* Nav links */}
        <ul className="flex items-center gap-x-1 font-Morabba-Bold text-sm md:text-lg">
          {navLinks.map(({ href, label }) =>
            href !== "/reservation" ? (
              <li key={href}>
                <Link
                  href={href}
                  className="relative px-3 py-1.5 rounded-lg
                  text-green-800/80 dark:text-gray-200
                  hover:text-green-900 dark:hover:text-teal-400
                  hover:bg-green-100/60 dark:hover:bg-teal-800/40
                  transition-all duration-200 inline-block"
                >
                  {label}
                </Link>
              </li>
            ) : (
              <NavbarResarvationLink key={href} />
            )
          )}
        </ul>

        {/* Auth + theme */}
        <div className=" flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl
        text-green-800/80 dark:text-gray-200
        hover:bg-green-100/60 dark:hover:bg-teal-800/40
        transition-all duration-200 select-none"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full
        bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                >
                  <FaUser />
                </div>
                <span className="text-sm font-Morabba-Bold">
                  {user.firstName} {user.lastName}
                </span>
                <FaChevronDown
                  className="text-green-600 dark:text-teal-400
          transition-transform duration-300
          group-hover:rotate-180"
                />
              </button>

              {/* dropdown */}
              <div
                className="absolute left-0 top-[calc(100%+8px)] w-52
        opacity-0 invisible translate-y-2
        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
        transition-all duration-250
        bg-white/80 dark:bg-teal-950/80
        backdrop-blur-md
        border border-green-200/60 dark:border-teal-700/50
        rounded-2xl shadow-xl shadow-green-900/10 dark:shadow-teal-950/40
        overflow-hidden z-50"
              >
                {/* header */}
                <div className="px-4 py-3 border-b border-green-100/60 dark:border-teal-800/50">
                  <p className="text-xs text-green-500/60 dark:text-teal-400/60 font-Morabba-Bold">
                    خوش آمدید
                  </p>
                  <p className="text-sm font-Morabba-Bold text-green-900 dark:text-white mt-0.5">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                {/* links */}
                <div className="p-1.5 flex flex-col gap-0.5">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-Morabba-Bold
            text-green-800/80 dark:text-gray-200
            hover:bg-green-100/60 dark:hover:bg-teal-800/40
            transition-colors duration-150"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg
            bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    >
                      <FaUser size={12} />
                    </span>
                    پنل کاربری
                  </Link>

                  <div className="h-px bg-green-100/80 dark:bg-teal-800/50 mx-1 my-0.5" />

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-Morabba-Bold
            text-red-500 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-900/20
            transition-colors duration-150 w-full"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg
            bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400"
                    >
                      <FaChevronDown
                        size={12}
                        className="-rotate-90"
                        onClick={logoutHandler}
                      />
                    </span>
                    خروج از حساب
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ul className="flex items-center gap-x-2 font-Morabba-Bold text-sm md:text-lg">
              <li>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-xl
          text-green-800/80 dark:text-gray-200
          hover:text-green-900 dark:hover:text-teal-400
          hover:bg-green-100/60 dark:hover:bg-teal-800/40
          transition-all duration-200 inline-block"
                >
                  ورود
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-xl
          bg-emerald-500 hover:bg-emerald-600
          text-white
          shadow-sm shadow-emerald-500/30
          hover:shadow-md hover:shadow-emerald-500/20
          transition-all duration-200 inline-block"
                >
                  ثبت نام
                </Link>
              </li>
            </ul>
          )}
          <ThemeCta prevTheme={theme} />
        </div>
      </nav>

      {/* ─── Mobile navbar ─── */}
      <MobileMenu theme={theme} navLinks={navLinks} />
    </>
  );
}

export default Navbar;
