"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

function DeleteModal({ isOpen, onClose, onConfirm, title }) {
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimClass("open"), 10);
    } else {
      setAnimClass("");
      setVisible(false);
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
      onClose();
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
        className="w-full max-w-sm mx-4 rounded-2xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50"
      >
        {/* body */}
        <div className="flex flex-col items-center gap-4 px-6 py-8">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl
            bg-red-100 dark:bg-red-900/20
            text-red-500 dark:text-red-400"
          >
            <FaTrash size={20} />
          </div>
          <div className="text-center flex flex-col gap-1.5">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              حذف {title}
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
              آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست
            </p>
          </div>
        </div>

        {/* footer */}
        <div
          className="flex items-center gap-2 px-5 py-4
          border-t border-slate-100 dark:border-slate-800"
        >
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold
              bg-red-500 hover:bg-red-600 text-white
              shadow-md shadow-red-200 dark:shadow-red-900/30
              transition-all duration-150 active:scale-95"
          >
            حذف
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

export default DeleteModal;
