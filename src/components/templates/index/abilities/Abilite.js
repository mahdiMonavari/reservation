"use client";
import useReservationStore from "@/store/reservationStore";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

function Abilite({ title, description, doctorId, service }) {
  console.log(doctorId);
  const setServices = useReservationStore((s) => s.setServices);
  const setDoctor = useReservationStore((s) => s.setDoctor);
  const setStep = useReservationStore((s) => s.setStep);
  const selectService = () => {
    setServices([service]);
    setDoctor(doctorId);
    setStep(2);
    redirect("/reservation");
  };
  return (
    <div
      className={clsx(
        `group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-100 
         bg-white/60 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 
         hover:shadow-xs dark:hover:shadow-emerald-950/30 hover:shadow-emerald-100/50 
         backdrop-blur-md dark:border-emerald-900/30 dark:bg-slate-900/20 
         dark:shadow-none dark:backdrop-blur-lg`
      )}
    >
      {/* decorative circle */}
      <div
        className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/50 transition-all group-hover:scale-150 
              dark:bg-emerald-500/20"
      ></div>

      <div className="relative mb-3">
        <h3
          onClick={selectService}
          className="font-bold text-emerald-900 transition-colors group-hover:text-emerald-600 font-Morabba-Medium 
                dark:text-emerald-50 dark:group-hover:text-emerald-400 text-4xl"
        >
          {title}
        </h3>

        <div
          className="mt-1 h-1 w-10 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-16 
                dark:bg-emerald-500/50"
        ></div>
      </div>

      <p
        className="relative flex-1 text-lg leading-relaxed text-emerald-800/70 font-shabnam-medium 
          dark:text-emerald-100/60"
      >
        {description}
      </p>

      {/* always visible — at bottom of card */}
      <Link
        href={`http://localhost:3000/doctors/${doctorId}`}
        className="relative mt-5 flex justify-end text-xs font-Dana-Medium text-emerald-600 
          opacity-100 transition-opacity duration-300 
          dark:text-emerald-400"
      >
        <span></span>
        <span className="flex items-center justify-center gap-2">
          مشاهده خدمات دیگر این متخصص
          <FaChevronLeft className="text-[10px]" />
        </span>
      </Link>
    </div>
  );
}

export default Abilite;
