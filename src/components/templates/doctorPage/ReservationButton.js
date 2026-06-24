"use client";
import React from "react";
import Link from "next/link";
import useReservationStore from "@/store/reservationStore";

function ReservationButton({ params, children }) {
  const setStep = useReservationStore((s) => s.setStep);
  const setDoctor = useReservationStore((s) => s.setDoctor);
  const manageStateHandler = () => {
    setStep(2);
    setDoctor(params);
  };
  return (
    <Link href={"/reservation"} onClick={manageStateHandler}>
      {children}
    </Link>
  );
}

export default ReservationButton;
