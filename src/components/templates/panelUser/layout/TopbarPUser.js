"use client";
import { useContext } from "react";
import { menuMobile } from "@/context/MenuMobile";
import { usePathname } from "next/navigation";
import { menuPUser } from "./menuPUser";
import { HiMenuAlt3 } from "react-icons/hi";
import ThemeCta from "@/components/modules/navbar/ThemeCta";

function TopbarPUser() {
  const { toggleMenu } = useContext(menuMobile);
  const pathname = usePathname();

  const currentPage = menuPUser.find((item) => item.href === pathname);

  return (
    <div
      className="sticky top-0 z-30 flex items-center justify-between
      px-4 py-3 mb-6
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
      border-b border-teal-100 dark:border-slate-800"
    >
      {/* چپ — همبرگر (موبایل) + عنوان صفحه */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMenu}
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center
            text-slate-500 dark:text-slate-400
            hover:bg-teal-50 dark:hover:bg-slate-800
            hover:text-teal-600 dark:hover:text-teal-400
            border border-transparent hover:border-teal-200 dark:hover:border-slate-700
            transition-all duration-150"
        >
          <HiMenuAlt3 size={20} />
        </button>

        <div>
          <h1 className="font-Morabba-Bold text-slate-800 dark:text-white text-base">
            {currentPage?.title || "پنل کاربری"}
          </h1>
          <p className="text-[11px] font-Dana-Regular text-slate-400 dark:text-slate-500 hidden sm:block">
            خوش آمدید
          </p>
        </div>
      </div>

      {/* راست — کنترل‌ها */}
      <div className="flex items-center gap-2">
        <ThemeCta />
      </div>
    </div>
  );
}

export default TopbarPUser;
