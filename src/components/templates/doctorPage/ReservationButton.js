"use client";
import React from "react";
import Link from "next/link";
import useReservationStore from "@/store/reservationStore";

function ReservationButton() {
  const nextStep = useReservationStore((s) => s.nextStep);
  return (
    <Link
      href={"/reservation"}
      onClick={nextStep}
      className="rounded-2xl bg-emerald-600 cursor-pointer px-5 py-3 font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors duration-300"
    >
      رزرو نوبت
    </Link>
  );
}

export default ReservationButton;
