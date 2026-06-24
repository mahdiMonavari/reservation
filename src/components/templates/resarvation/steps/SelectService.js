"use client";
import EmptySection from "@/components/modules/emptyState/EmptySection";
import useReservationStore from "@/store/reservationStore";
import { useEffect, useState } from "react";
import { FiCheck, FiClock } from "react-icons/fi";

function SelectService({ setIsLoading }) {
  const selectedDoctor = useReservationStore((s) => s.selectedDoctor);
  const selectedServices = useReservationStore((s) => s.selectedServices);
  const setServices = useReservationStore((s) => s.setServices);
  const [servicesList, setServicesList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;
    if (selectedDoctor) {
      getServices(signal);
    }
    return () => controler.abort();
  }, [selectedDoctor]);

  const getServices = async (signal) => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await fetch(`/api/services/${selectedDoctor}`, signal);
      if (!res.ok) throw new Error("مشکلی در برقراری ارتباط با سرور رخ داد.");
      const data = await res.json();
      setServicesList(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "خطای ناشناخته");
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = (service) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setServices(selectedServices.filter((s) => s._id !== service._id));
    } else {
      setServices([...selectedServices, service]);
    }
  };

  const isSelected = (id) => !!selectedServices.find((s) => s._id === id);

  const toEnglishDigits = (str) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[۰-۹]/g, (char) => persianDigits.indexOf(char));
  };

  const totalDuration = selectedServices.reduce((sum, s) => {
    const duration = parseInt(toEnglishDigits(s.duration), 10);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0);

  return (
    <div>
      <div className="text-right mb-5">
        <h2 className="text-xl mt-3 md:text-2xl font-Morabba-Bold text-emerald-900 dark:text-white">
          خدمات مورد نظر خود را انتخاب کنید
        </h2>
        <p className="text-sm mt-1 text-emerald-600 dark:text-emerald-400">
          می‌توانید چند خدمت را همزمان انتخاب کنید
        </p>
      </div>

      {servicesList.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {servicesList.map((service) => {
            const selected = isSelected(service._id);
            return (
              <button
                key={service._id}
                type="button"
                onClick={() => toggle(service)}
                className={`relative w-full text-right rounded-2xl px-4 py-3.5
                flex items-start gap-3 border transition-all duration-200 group
                ${
                  selected
                    ? "bg-emerald-50 border-emerald-400 dark:bg-emerald-500/15 dark:border-emerald-400"
                    : "bg-white/60 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                <div
                  className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center
                  border-2 transition-all duration-200
                  ${
                    selected
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-emerald-200 dark:border-white/20 group-hover:border-emerald-400 dark:group-hover:border-white/40"
                  }`}
                >
                  {selected && (
                    <FiCheck size={11} className="text-white" strokeWidth={3} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-Morabba-Bold truncate transition-colors duration-200
                    ${selected ? "text-emerald-800 dark:text-emerald-200" : "text-emerald-900 dark:text-white/80"}`}
                  >
                    {service.title}
                  </p>
                  <div className="flex items-center justify-end gap-3 mt-5">
                    <span className="flex items-center gap-1 text-xs text-emerald-500 dark:text-emerald-400/60">
                      <FiClock size={10} />
                      {service.duration}
                    </span>
                    {service.price !== "0" ? (
                      <span className="text-sm font-Morabba-Bold text-emerald-800 dark:text-emerald-300">
                        {new Intl.NumberFormat("fa-IR").format(service.price)}{" "}
                        <span className="text-[10px] font-Dana-Medium">
                          تومان
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm font-Morabba-Bold text-emerald-800 dark:text-emerald-300">
                        نیاز به مراجعه
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <EmptySection title="هنوز خدمتی برای این دکتر ثبت نشده است" />
      )}

      <div
        className={`transition-all duration-500 rounded-2xl overflow-hidden
        ${selectedServices.length > 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-emerald-500/10 border border-emerald-300/50 dark:border-emerald-400/20 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <FiClock
              size={13}
              className="text-emerald-500 dark:text-emerald-400"
            />
            <span className="text-xs font-Dana-Regular text-emerald-600 dark:text-emerald-400">
              مجموع زمان:
            </span>
            <span className="text-xs font-Morabba-Bold text-emerald-700 dark:text-emerald-300">
              {totalDuration.toLocaleString("fa-IR")} دقیقه
            </span>
            <span className="w-px h-3 bg-emerald-300 dark:bg-emerald-600 mx-1" />
            <span className="text-xs font-Dana-Regular text-emerald-600 dark:text-emerald-400">
              {selectedServices.length.toLocaleString("fa-IR")} خدمت انتخاب شده
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {selectedServices.map((s) => (
              <span
                key={s._id}
                className="text-[11px] px-2.5 py-1 rounded-full font-Dana-Regular
                  bg-emerald-100 text-emerald-700
                  dark:bg-emerald-500/20 dark:text-emerald-300
                  border border-emerald-200 dark:border-emerald-500/30"
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectService;
