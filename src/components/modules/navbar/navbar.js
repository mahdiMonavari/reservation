import React from "react";
import ThemeCta from "./ThemeCta";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavbarResarvationLink from "./NavbarReservationLink";
import { getCookie, verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../model/user";
import connectionToDB from "@/utiles/DB/connection";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact-us", label: "ارتباط با ما" },
  { href: "/doctors", label: "دکترها" },
  { href: "/reservation", label: "رزرو نوبت" },
];

async function Navbar({ theme }) {
  await connectionToDB();
  const token = await getCookie("token");
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne(
    { phoneNumber: phone },
    "firstName lastName"
  );
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
        {user ? (
          `${user.firstName} ${user.lastName}`
        ) : (
          <ul className="flex items-center gap-x-3 font-Morabba-Bold text-sm md:text-lg">
            <li>
              <Link
                href="/login"
                className="flex items-center gap-2 text-green-800/80 dark:text-gray-200
                hover:text-green-900 dark:hover:text-teal-400 transition-all duration-200 group"
              >
                <span>ورود</span>
                <span
                  className="h-5 w-px rounded-full bg-green-400/60 dark:bg-teal-600
                group-hover:bg-green-600 dark:group-hover:bg-teal-400 transition-colors duration-200"
                />
                <span>ثبت نام</span>
              </Link>
            </li>
            <li>
              <ThemeCta prevTheme={theme} />
            </li>
          </ul>
        )}
      </nav>

      {/* ─── Mobile navbar ─── */}
      <MobileMenu theme={theme} navLinks={navLinks} />
    </>
  );
}

export default Navbar;
