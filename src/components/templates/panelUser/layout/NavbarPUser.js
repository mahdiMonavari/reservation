"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { menuMobile } from "@/context/MenuMobile";
import { menuPUser } from "./menuPUser";
import NavbarMobilePUser from "./NavbarMobilePUser";

function NavbarPUser() {
  const { user } = useContext(AuthContext);
  const { isMenuOpen } = useContext(menuMobile);
  const pathname = usePathname();

  return (
    <>
      <NavbarMobilePUser user={user} menu={menuPUser} />

      <div
        className="sticky top-0 right-0 h-screen w-70 md:flex hidden flex-col
        bg-white dark:bg-slate-900
        border-l border-teal-100 dark:border-slate-800
        shadow-sm"
      >
        {/* لوگو */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-teal-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shrink-0">
            <span className="text-white font-Morabba-Bold text-sm">پ</span>
          </div>
          <div>
            <p className="font-Morabba-Bold text-slate-800 dark:text-white text-sm">
              پنل کاربری
            </p>
            <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500 truncate max-w-32">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>

        {/* منو */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {menuPUser.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl
                  font-Dana-Medium text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
              >
                <Icon size={17} className={isActive ? "text-teal-500" : ""} />
                {item.title}
                {isActive && (
                  <span className="mr-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* فوتر */}
        <div className="px-4 py-4 border-t border-teal-100 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-500/10">
            <div className="w-8 h-8 rounded-lg bg-teal-200 dark:bg-teal-500/30 flex items-center justify-center shrink-0">
              <span className="text-teal-700 dark:text-teal-300 font-Morabba-Bold text-xs">
                {user?.firstName?.[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-Morabba-Bold text-slate-700 dark:text-slate-200 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] font-Dana-Regular text-slate-400 dark:text-slate-500 truncate">
                {user?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarPUser;
