import { getYear, getMonth, getDaysInMonth, parse } from "date-fns-jalali";

const resoneOfDate = (year, month, date) => {
  const newDate = new Date(year, month, date);
  const firstDayJalali = {
    year: getYear(newDate),
    month: getMonth(newDate) + 1,
    day: 1,
  };
  const stringDateJalali = `${firstDayJalali.year}/${firstDayJalali.month}/${firstDayJalali.day}`;
  const firstDayJalaliToGregorian = parse(
    stringDateJalali,
    "yyyy/MM/dd",
    new Date()
  );

  // شنبه=۰ ... جمعه=۶ به‌جای یکشنبه=۰ ... شنبه=۶
  const witchOfTheWeekDay = (firstDayJalaliToGregorian.getDay() + 1) % 7;

  const howMenyDaysHave = calculationDays(firstDayJalaliToGregorian);

  const array = [];
  Array.from({ length: witchOfTheWeekDay }).forEach(() =>
    array.push(undefined)
  );

  Array.from({ length: howMenyDaysHave }).forEach((_, index) => {
    const stringDateJalali = `${firstDayJalali.year}/${firstDayJalali.month}/${
      firstDayJalali.day + index
    }`;
    const gregorian = parse(stringDateJalali, "yyyy/MM/dd", new Date());
    array.push({
      gregorian: {
        year: gregorian.getFullYear(),
        month: gregorian.getMonth(),
        date: gregorian.getDate(),
      },
      jalali: {
        year: firstDayJalali.year,
        month: firstDayJalali.month - 1,
        date: firstDayJalali.day + index,
      },
    });
  });

  return array;
};

const calculationDays = (dateGregorian) => {
  return getDaysInMonth(dateGregorian);
};

export { resoneOfDate };
