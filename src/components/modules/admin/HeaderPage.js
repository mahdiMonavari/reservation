import React from "react";
import { FaPlus } from "react-icons/fa";

function HeaderPage({ total, title, onOpen, titlePage, Other }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <div>
          <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
            {titlePage}
          </h1>
          <p className="text-base text-slate-700 font-Morabba-Medium flex items-center gap-2 dark:text-slate-300 mt-0.5">
            <span>{total}</span>
            <span>{title} ثبت شده</span>
          </p>
        </div>
        {Other && <Other />}
      </div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-violet-600 hover:bg-violet-700
              text-white text-base font-Morabba-Bold
              shadow-md shadow-violet-200 dark:shadow-violet-900/30
              transition-all duration-200 active:scale-95"
      >
        <FaPlus />
        افزودن {title}
      </button>
    </div>
  );
}

export default HeaderPage;
