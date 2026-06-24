"use client";
import EmptySection from "@/components/modules/emptyState/EmptySection";
import useReservationStore from "@/store/reservationStore";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";

function SelectDoctor({ doctors }) {
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const setDoctor = useReservationStore((s) => s.setDoctor);
  return (
    <div>
      <div className="text-right mb-5">
        <h2
          className="text-2xl font-Morabba-Bold
          text-emerald-900 dark:text-white"
        >
          دکتر مورد نظر خود را انتخاب کنید
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-300/50">
          با کلیک روی هر کارت، دکتر انتخاب می‌شود
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {doctors.length ? (
          doctors.map((doctor) => {
            const isSelected = selectedDoctor === doctor.userId._id;
            return (
              <button
                key={doctor._id}
                type="button"
                onClick={() => setDoctor(doctor.userId._id)}
                className={`relative w-full text-right rounded-2xl p-4
                flex items-center gap-4
                border transition-all duration-250 group
                ${
                  isSelected
                    ? "bg-emerald-50 border-emerald-400 dark:bg-emerald-500/15 dark:border-emerald-400"
                    : "bg-white/60 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/60 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                {/* عکس */}
                <div
                  className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden
                border-2 transition-colors duration-250
                border-emerald-100 dark:border-white/10
                group-hover:border-emerald-300 dark:group-hover:border-white/20"
                >
                  <Image
                    src={doctor.photo}
                    alt={doctor.userId.firstName}
                    className="object-cover"
                    fill
                    sizes={"500px"}
                  />
                </div>

                {/* اطلاعات */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-lg font-Morabba-Bold truncate
                  text-emerald-900 dark:text-white"
                  >
                    {doctor.userId.firstName}
                    {doctor.userId.lastName}
                  </p>
                  <p
                    className="text-sm mt-0.5 truncate
                  text-emerald-600 dark:text-emerald-300/60"
                  >
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center justify-between mt-5 gap-3">
                    <span className="text-sm text-emerald-500 dark:text-emerald-400/50">
                      {doctor.experience} سال
                    </span>
                    <span
                      className="flex items-center gap-1 text-sm
                    text-amber-500 dark:text-amber-400"
                    >
                      ★ {doctor.rating} امتیاز
                    </span>
                  </div>
                </div>

                {/* تیک انتخاب */}
                <div
                  className={`absolute top-3 left-3 w-5 h-5 rounded-full
                flex items-center justify-center
                transition-all duration-250
                ${
                  isSelected
                    ? "bg-emerald-500 opacity-100 scale-100"
                    : "bg-emerald-100 dark:bg-white/10 opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-90"
                }`}
                >
                  <FiCheck size={11} className="text-white" strokeWidth={3} />
                </div>
              </button>
            );
          })
        ) : (
          <EmptySection title="دکتر اکتیوی برای ارائه خدمات وجود ندارد" />
        )}
      </div>
    </div>
  );
}

export default SelectDoctor;
