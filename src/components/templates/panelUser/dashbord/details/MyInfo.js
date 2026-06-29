import Link from "next/link";
import React from "react";

function MyInfo({ user }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h3 className="font-Morabba-Bold text-slate-700 dark:text-slate-200 text-base mb-4">
        پروفایل من
      </h3>
      <div className="flex flex-col gap-3">
        <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center mx-auto">
          <span className="text-teal-600 dark:text-teal-300 font-Morabba-Bold text-xl">
            {user?.firstName?.[0]}
          </span>
        </div>
        <p className="text-center font-Morabba-Bold text-slate-800 dark:text-white text-sm">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-center text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
          {user?.phoneNumber}
        </p>
        <Link
          href="/p-user/profile"
          className="mt-1 text-center text-xs font-Dana-Medium
                  text-teal-600 dark:text-teal-400
                  hover:text-teal-700 dark:hover:text-teal-300
                  transition-colors duration-150"
        >
          ویرایش پروفایل ←
        </Link>
      </div>
    </div>
  );
}

export default MyInfo;
