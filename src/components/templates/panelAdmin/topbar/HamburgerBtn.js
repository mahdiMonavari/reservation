// HamburgerBtn.jsx
"use client";
import { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { menuMobile } from "@/context/MenuMobile";

function HamburgerBtn() {
  const { toggleMenu } = useContext(menuMobile);
  return (
    <button
      onClick={toggleMenu}
      className="md:hidden w-9 h-9 flex items-center justify-center rounded-full
        bg-slate-100 dark:bg-slate-800
        text-violet-600 dark:text-violet-400
        hover:bg-violet-100 dark:hover:bg-violet-900/30
        transition-all duration-200
        border border-slate-200 dark:border-slate-700"
    >
      <FaBars size={15} />
    </button>
  );
}

export default HamburgerBtn;
