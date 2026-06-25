import React from "react";

function ClientCalendar({
  dates,
  isSameDay,
  today,
  isPastDay,
  current,
  handleDayClick,
  selectedDate,
  workingDateList,
  t,
}) {
  const isActiveDate = (a, b) => {
    return b.findIndex((item) => {
      const newDate = new Date(item.date);
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      const date = newDate.getDate();
      return a.year === year && a.month === month && a.date === date;
    });
  };
  return (
    <div className="grid grid-cols-7 gap-y-2 max-[480px]:gap-y-1">
      {dates.map((d, index) => {
        if (!d) return <span key={`empty-${index}`} />;

        const isToday = isSameDay(d.gregorian, today);
        const isSelected = isSameDay(selectedDate, d.gregorian);
        const isFriday = index % 7 === 6;
        const isPast = isPastDay(d.gregorian, current);
        const canReservation =
          isActiveDate(d.gregorian, workingDateList) !== -1;
        const dayClass =
          isPast || !canReservation
            ? isPast && isToday
              ? `text-slate-300 dark:text-slate-700 cursor-not-allowed ${t.today}`
              : "text-slate-300 dark:text-slate-700 cursor-not-allowed"
            : isSelected
              ? t.selected
              : isToday
                ? t.today
                : isFriday
                  ? `text-rose-500 dark:text-rose-400 ${t.hover}`
                  : `text-slate-600 dark:text-slate-300 ${t.hover}`;

        return (
          <div
            key={`${d.jalali.year}-${d.jalali.month}-${d.jalali.date}`}
            className="flex items-center justify-center"
          >
            <button
              type="button"
              disabled={isPast}
              onClick={() => handleDayClick(d, canReservation)}
              className={`w-11 h-11 max-[480px]:w-9 max-[480px]:h-9 flex items-center justify-center rounded-lg
                  text-base max-[480px]:text-sm font-Dana-Medium transition-all duration-150 ${dayClass}`}
            >
              {d.jalali.date.toLocaleString("fa-IR")}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ClientCalendar;
