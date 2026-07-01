"use client";
import useReservationStore from "@/store/reservationStore";
import SelectDoctor from "./steps/SelectDoctor";
import SelectService from "./steps/SelectService";
import SelectDate from "./steps/SelectDate";
import React, { useEffect, useState } from "react";
import SelectTime from "./steps/SelectTime";
import Confirm from "./steps/Confirm";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";

const STEPS = [
  { label: "دکتر", component: SelectDoctor },
  { label: "خدمات", component: SelectService },
  { label: "تاریخ", component: SelectDate },
  { label: "ساعت", component: SelectTime },
  { label: "تأیید", component: Confirm },
];

function Reservation({ doctors }) {
  const step = useReservationStore((s) => s.step);
  const nextStep = useReservationStore((s) => s.nextStep);
  const prevStep = useReservationStore((s) => s.prevStep);
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const selectedServices = useReservationStore((s) => s.selectedServices);
  const selectedDate = useReservationStore((s) => s.selectedDate);
  const selectedTime = useReservationStore((s) => s.selectedTime);
  const [isLoading, setIsLoading] = useState(false);

  const isStepValid = () => {
    if (step === 1) return !!selectedDoctor;
    if (step === 2) return selectedServices.length > 0;
    if (step === 3) return !!selectedDate;
    if (step === 4) return !!selectedTime;
    if (step === 5) return true;
    return false;
  };

  const canProceed = isStepValid();
  const ActiveComponent = STEPS[step - 1]?.component ?? SelectDoctor;

  return (
    <>
      <div
        className="relative flex items-start justify-center
       bg-gray-100 dark:bg-slate-950 overflow-hidden"
      >
        <div className="relative w-full max-w-3xl">
          <div
            className="absolute -inset-1 rounded-3xl
          bg-transparent dark:bg-emerald-500/15 blur-sm"
          />

          <div
            className="relative backdrop-blur-xl rounded-3xl overflow-hidden
          bg-white/70 border border-emerald-200/60
          dark:bg-white/5 dark:border-white/10
          shadow-sm dark:shadow-2xl dark:shadow-emerald-950/50"
          >
            <LoadingOverlay loading={isLoading} />
            <div
              className="h-px w-full bg-gradient-to-r
            from-transparent via-emerald-400/50 to-transparent
            dark:via-emerald-400/70"
            />

            {/* ── Header ── */}
            <div className="px-10 pt-8 pb-6 border-b border-emerald-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg
                bg-emerald-100 border border-emerald-200/80 text-emerald-600
                dark:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-300"
                >
                  ✦
                </div>
                <div className="text-right">
                  <h1
                    className="text-xl font-Morabba-Bold leading-none
                  text-emerald-800 dark:text-emerald-100"
                  >
                    رزرو نوبت
                  </h1>
                  <p className="text-sm text-emerald-800 dark:text-emerald-400 mt-3 font-Morabba-Bold">
                    مرحله {step} از {STEPS.length}
                  </p>
                </div>
              </div>

              {/* step bar */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const active = i === step - 1;
                  return (
                    <React.Fragment key={i}>
                      {i > 0 && (
                        <div
                          className={`flex-1 h-0.5 rounded-full transition-all duration-500
                        ${
                          done
                            ? "bg-emerald-600"
                            : "bg-emerald-300 dark:bg-white/15"
                        }`}
                        />
                      )}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center
                        text-xs font-Morabba-Bold transition-all duration-300
                        ${
                          done
                            ? "bg-emerald-500 text-white"
                            : active
                              ? "bg-emerald-500/15 border-2 border-teal-500 text-emerald-700 dark:bg-emerald-400/20 dark:border-emerald-300 dark:text-emerald-200"
                              : "bg-white border border-emerald-200 text-emerald-400 dark:bg-white/5 dark:border-white/20 dark:text-white/40"
                        }`}
                        >
                          {done ? "✓" : i + 1}
                        </div>
                        <span
                          className={`text-sm font-Morabba-Bold transition-colors duration-300
                        ${
                          active
                            ? "text-emerald-700 dark:text-emerald-200"
                            : done
                              ? "text-emerald-500"
                              : "text-emerald-400 dark:text-white/40"
                        }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* ── Content ── */}
            <div className="py-2 px-4 lg:px-10 lg:py-8 min-h-80">
              {step === 1 ? (
                <ActiveComponent doctors={doctors} />
              ) : (
                <ActiveComponent setIsLoading={setIsLoading} />
              )}
            </div>

            {/* ── Footer ── */}
            <div
              className="py-2 px-4 lg:px-10 lg:py-8 flex items-center justify-between gap-3
            border-t border-emerald-100 dark:border-white/5"
            >
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2 px-2 xs:px-6 py-2.5 rounded-xl
                text-xs xs:text-sm font-Morabba-Bold transition-all duration-200 active:scale-[0.97]
                border border-emerald-200 text-emerald-500
                hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50
                dark:border-white/10 dark:text-white/50
                dark:hover:border-white/20 dark:hover:text-white/80 dark:hover:bg-white/5
                disabled:opacity-0 disabled:pointer-events-none"
              >
                <FaChevronRight />
                مرحله قبل
              </button>

              {/* step dots — موبایل */}
              <div className="flex gap-1.5 sm:hidden">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300
                    ${
                      i === step - 1
                        ? "w-5 bg-emerald-500"
                        : i < step - 1
                          ? "w-2 bg-emerald-400/60"
                          : "w-2 bg-emerald-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed}
                className={`relative flex items-center gap-2 px-2 xs:px-6 py-2.5 rounded-xl
                text-xs xs:text-sm font-Morabba-Bold text-white overflow-hidden
                transition-all duration-200 active:scale-[0.97] group
                bg-emerald-500 hover:bg-emerald-600
                hover:shadow-md hover:shadow-emerald-500/20
                dark:hover:shadow-lg dark:hover:shadow-emerald-500/25
                disabled:bg-emerald-200 disabled:dark:bg-emerald-900/40
                disabled:text-emerald-400/80 disabled:dark:text-emerald-700
                disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100 ${
                  step === 5 ? "invisible" : ""
                }`}
              >
                <span className="relative z-10">
                  <span className="flex items-center justify-center gap-1 md:gap-2">
                    مرحله بعد <FaChevronLeft />
                  </span>
                </span>
                {canProceed && (
                  <span
                    className="absolute inset-0 bg-gradient-to-l
                  from-white/0 via-white/10 to-white/0
                  translate-x-full group-hover:translate-x-[-200%]
                  transition-transform duration-700"
                  />
                )}
              </button>
            </div>

            <div
              className="h-px w-full bg-gradient-to-r
            from-transparent via-emerald-300/40 to-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reservation;
