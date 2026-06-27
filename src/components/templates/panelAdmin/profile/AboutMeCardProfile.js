import React from "react";
import { MdInfo } from "react-icons/md";

function AboutMeCardProfile({ form, isEditing, handleChange, doctor }) {
  return (
    <div
      className="rounded-2xl bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <MdInfo className="text-slate-400" />
        <h2 className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200">
          درباره من
        </h2>
      </div>
      <div className="p-5">
        {isEditing ? (
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows={5}
            placeholder="درباره خود بنویسید..."
            className="w-full bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  rounded-xl px-4 py-3 text-sm font-Dana-Medium
                  text-slate-700 dark:text-slate-200
                  focus:outline-none focus:ring-2 focus:ring-violet-400
                  resize-none transition-all duration-150 leading-relaxed"
          />
        ) : (
          <p className="text-sm font-Dana-Medium text-slate-500 dark:text-slate-400 leading-relaxed">
            {doctor?.about || "توضیحاتی ثبت نشده است."}
          </p>
        )}
      </div>
    </div>
  );
}

export default AboutMeCardProfile;
