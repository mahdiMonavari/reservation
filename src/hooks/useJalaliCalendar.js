import { useMemo, useState, useCallback } from "react";
import {
  getTodayJalali,
  jalaaliMonthLength,
  getWeekDayIndex,
  addMonthsJalali,
  compareJalali,
} from "../lib/jalali";

/**
 * @param {Object} options
 * @param {number} options.monthsAhead - چند ماه بعد از ماه جاری قابل مشاهده باشه (ادمین: ۲، کاربر: ۱)
 * @param {boolean} options.disablePast - روزهای گذشته‌ی ماه جاری غیرفعال باشن (پیش‌فرض: true)
 */
export function useJalaliCalendar({
  monthsAhead = 1,
  disablePast = true,
} = {}) {
  const today = useMemo(() => getTodayJalali(), []);
  const [monthOffset, setMonthOffset] = useState(0);

  const { jy, jm } = useMemo(
    () => addMonthsJalali(today.jy, today.jm, monthOffset),
    [today, monthOffset]
  );

  const canGoPrev = monthOffset > 0;
  const canGoNext = monthOffset < monthsAhead;

  const goPrev = useCallback(() => {
    setMonthOffset((o) => Math.max(0, o - 1));
  }, []);

  const goNext = useCallback(() => {
    setMonthOffset((o) => Math.min(monthsAhead, o + 1));
  }, [monthsAhead]);

  const goToOffset = useCallback(
    (offset) => {
      setMonthOffset(Math.min(monthsAhead, Math.max(0, offset)));
    },
    [monthsAhead]
  );

  const weeks = useMemo(() => {
    const daysInMonth = jalaaliMonthLength(jy, jm);
    // ایندکس روز هفته برای روز اول ماه (۰=شنبه ... ۶=جمعه)
    const firstDayWeekIndex = getWeekDayIndex(jy, jm, 1);

    const cells = [];

    // پدینگ ابتدای ماه
    for (let i = 0; i < firstDayWeekIndex; i += 1) {
      cells.push(null);
    }

    for (let jd = 1; jd <= daysInMonth; jd += 1) {
      const isToday = compareJalali({ jy, jm, jd }, today) === 0;
      const isPast = compareJalali({ jy, jm, jd }, today) < 0;
      cells.push({
        jy,
        jm,
        jd,
        isToday,
        isPast,
        isDisabled: disablePast && isPast,
      });
    }

    // پدینگ انتهای ماه تا تکمیل آخرین هفته
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    const result = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  }, [jy, jm, today, disablePast]);

  return {
    today,
    jy,
    jm,
    weeks,
    monthOffset,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
    goToOffset,
  };
}
