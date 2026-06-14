"use client";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ThemeCta({ prevTheme, style }) {
  const [state, setState] = useState(prevTheme);

  const toggle = () => {
    const next = state === "dark" ? "light" : "dark";
    document.documentElement.className = next;
    document.cookie = `theme=${next};path=/;max-age=31536000`;
    setState(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="تغییر تم"
      className={
        style
          ? style
          : `w-9 h-9 flex items-center justify-center rounded-full
        bg-green-100/70 dark:bg-teal-800/60
        text-green-700 dark:text-teal-300
        hover:bg-green-200/80 dark:hover:bg-teal-700/70
        hover:scale-110 active:scale-95
        transition-all duration-200 text-base
        border border-green-200/50 dark:border-teal-600/40`
      }
    >
      {state === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeCta;
