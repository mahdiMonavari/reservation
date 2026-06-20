"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({
  isOpen,
  onClose,
  onConfirm,
  fields,
  title,
  data,
  formData,
  setFormData,
}) {
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimClass("open"), 10);
    } else {
      setAnimClass("");
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = data[field.name] || "";
        return acc;
      }, {})
    );
  }, [data, isOpen]);

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
                text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-Morabba-Medium
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-colors duration-150"
          >
            <FaTimes />
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-6">
          <p className="text-lg text-slate-400 font-Morabba-Bold dark:text-rose-50 text-right mb-5">
            {title}
          </p>
          <div className="flex flex-col gap-3">
            {fields.map((field) =>
              field.type === "textarea" ? (
                <label key={field.name} className="flex flex-col gap-1.5">
                  <span className="text-md  text-slate-500 dark:text-slate-300 font-Morabba-Medium text-right">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 mr-1">*</span>
                    )}
                  </span>
                  <textarea
                    value={formData[field.name]}
                    placeholder={field.label}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-sm
                bg-slate-50 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-600
                focus:outline-none focus:border-violet-400 dark:focus:border-violet-500
                focus:bg-white dark:focus:bg-slate-800/80
                transition-all duration-200 resize-none text-right"
                  />
                </label>
              ) : field.type === "select" ? (
                <label
                  key={field.name}
                  className="flex flex-col gap-1.5 items-start w-full"
                >
                  <span className="text-md  text-slate-500 dark:text-slate-300 font-Morabba-Medium text-right">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 mr-1">*</span>
                    )}
                  </span>
                  <div className="flex  gap-3 w-full flex-wrap">
                    {field.fields.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center font-Morabba-Medium gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer border transition-all duration-200
            ${
              formData[field.name] === option.value
                ? "bg-violet-500 dark:bg-violet-600 border-violet-500 dark:border-violet-600 text-white"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-500"
            }`}
                      >
                        <input
                          type="radio"
                          name={option.name}
                          value={option.value}
                          checked={formData[field.name] === option.value}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          className="hidden"
                        />
                        {option.title}
                      </label>
                    ))}
                  </div>
                </label>
              ) : (
                <label key={field.name} className="flex flex-col gap-1.5">
                  <span className="text-md text-slate-500 dark:text-slate-300 font-Morabba-Medium text-right">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 mr-1">*</span>
                    )}
                  </span>
                  <input
                    value={formData[field.name]}
                    type={field.type}
                    placeholder={field.label}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm
                bg-slate-50 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-600
                focus:outline-none focus:border-violet-400 dark:focus:border-violet-500
                focus:bg-white dark:focus:bg-slate-800/80
                transition-all duration-200 text-right"
                  />
                </label>
              )
            )}
          </div>
        </div>

        {/* footer */}
        <div
          className="flex items-center gap-2 px-5 py-4 font-Morabba-Bold
            border-t border-slate-100 dark:border-slate-800"
        >
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm
                bg-violet-600 hover:bg-violet-700 text-white
                shadow-md shadow-violet-200 dark:shadow-violet-900/30
                transition-all duration-150 active:scale-95"
          >
            تایید
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl text-sm
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
