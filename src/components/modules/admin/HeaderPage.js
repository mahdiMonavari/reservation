import React from "react";
import { FaPlus } from "react-icons/fa";

function HeaderPage({ total, title, onOpen, titlePage, Other }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div>
          <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100 text-center sm:text-start">
            {titlePage}
          </h1>
          <p className="text-sm mt-2 justify-center md:justify-start flex items-center gap-1.5 text-violet-500 dark:text-violet-400 font-Morabba-Bold">
            {total}

            <span className="">{title} ثبت شده</span>
          </p>
        </div>

        {Other && <Other />}
      </div>

      {onOpen ? (
        <button
          onClick={onOpen}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
          bg-violet-600 hover:bg-violet-700
          text-white text-sm font-Morabba-Bold
          shadow-md shadow-violet-200 dark:shadow-violet-900/30
          transition-all duration-200 active:scale-95
          w-full sm:w-auto"
        >
          <FaPlus size={12} />
          افزودن {title}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeaderPage;
