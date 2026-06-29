import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

function NewReservation() {
  return (
    <Link
      href="/reservation"
      className="flex items-center justify-center gap-2 py-4 rounded-2xl
              bg-teal-500 hover:bg-teal-600 active:bg-teal-700
              text-white font-Morabba-Bold text-sm
              transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <FiPlus size={18} />
      رزرو نوبت جدید
    </Link>
  );
}

export default NewReservation;
