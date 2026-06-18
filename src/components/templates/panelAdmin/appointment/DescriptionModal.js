"use client";
import { useState } from "react";
import { successToast, errorToast } from "@/components/modules/toast/toast";

function DescriptionModal({ appointment, onClose, onSave }) {
  const [text, setText] = useState(appointment.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useState(() => {
    setTimeout(() => setAnimClass("open"), 10);
  }, []);

  const handleClose = () => {
    setAnimClass("");
    setTimeout(onClose, 300);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/appointments/${appointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });
      if (res.status === 200) {
        successToast("شرح حال ذخیره شد");
        onSave(appointment._id, text);
      } else {
        errorToast("خطایی پیش آمد");
      }
    } catch {
      errorToast("خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${animClass === "open" ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: animClass === "open" ? "scale(1)" : "scale(0)",
          opacity: animClass === "open" ? 1 : 0,
          transition: "transform 300ms ease, opacity 300ms ease",
        }}
        className="w-full max-w-md mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
          <p className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100">
            شرح حال
          </p>
        </div>

        <div className="px-5 py-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="شرح حال بیمار را بنویسید..."
            className="w-full px-4 py-3 rounded-xl text-sm font-Dana-Medium
              bg-slate-50 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-800 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-600
              focus:outline-none focus:border-violet-400 dark:focus:border-violet-600
              transition-all duration-200 resize-none text-right leading-7"
          />
        </div>

        <div className="flex items-center gap-2 px-5 py-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl text-sm font-Morabba-Bold
              bg-violet-600 hover:bg-violet-700 text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150 active:scale-95"
          >
            {isLoading ? "در حال ذخیره..." : "ذخیره"}
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-Morabba-Bold
              text-slate-500 dark:text-slate-400
              bg-slate-100 dark:bg-slate-800
              hover:bg-slate-200 dark:hover:bg-slate-700
              transition-all duration-150 active:scale-95"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DescriptionModal;
