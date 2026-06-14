"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, onConfirm }) {
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimClass("open"), 10);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimClass("close");
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    setAnimClass("confirm");
    setTimeout(() => {
      setVisible(false);
      onConfirm();
    }, 300);
  };

  if (!visible) return null;

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
          transform:
            animClass === "open"
              ? "scale(1)"
              : animClass === "confirm"
                ? "scale(2)"
                : "scale(0)",
          opacity: animClass === "open" ? 1 : 0,
          transition: "transform 300ms ease, opacity 300ms ease",
        }}
        className="w-full max-w-md mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50"
      >
        {/* header */}
        <div
          className="flex items-center justify-between px-5 py-4
          border-b border-slate-100 dark:border-slate-800"
        >
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-colors duration-150"
          >
            <FaTimes size={13} />
          </button>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            افزودن خدمت
          </h2>
        </div>

        {/* body */}
        <div className="px-5 py-6">
          {/* فرم اینجا */}
          <p className="text-sm text-slate-400 dark:text-slate-500 text-right">
            فرم اینجا قرار میگیره
          </p>
        </div>

        {/* footer */}
        <div
          className="flex items-center gap-2 px-5 py-4
          border-t border-slate-100 dark:border-slate-800"
        >
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold
              bg-violet-600 hover:bg-violet-700 text-white
              shadow-md shadow-violet-200 dark:shadow-violet-900/30
              transition-all duration-150 active:scale-95"
          >
            تایید
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold
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

export default Modal;
