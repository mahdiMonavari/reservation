import jalaali from "jalaali-js";

export const WEEKDAY_LABELS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

export const WEEKDAY_SHORT_LABELS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export const MONTH_LABELS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** عدد لاتین رو به رقم فارسی تبدیل می‌کنه. مثلا 1403 -> ۱۴۰۳ */
export function toPersianDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** تاریخ جلالی امروز رو برمی‌گردونه: { jy, jm, jd } */
export function getTodayJalali() {
  const now = new Date();
  const { jy, jm, jd } = jalaali.toJalaali(now);
  return { jy, jm, jd };
}

/** میلادی -> جلالی */
export function gregorianToJalali(date) {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return { jy, jm, jd };
}

/** جلالی -> آبجکت Date میلادی (ساعت روی نیمه‌شب لوکال تنظیم می‌شه) */
export function jalaliToGregorian(jy, jm, jd) {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd);
}

/** جلالی -> رشته‌ی ISO (برای فیلد `date` در بک‌اند، مدل Mongoose) */
export function jalaliToISOString(jy, jm, jd) {
  return jalaliToGregorian(jy, jm, jd).toISOString();
}

/** تعداد روزهای یک ماه جلالی خاص */
export function jalaaliMonthLength(jy, jm) {
  return jalaali.jalaaliMonthLength(jy, jm);
}

export function isLeapJalaaliYear(jy) {
  return jalaali.isLeapJalaaliYear(jy);
}

/** {jy,jm} ماه بعدی/قبلی رو با جابه‌جایی n ماه (مثبت یا منفی) برمی‌گردونه */
export function addMonthsJalali(jy, jm, n) {
  const total = jy * 12 + (jm - 1) + n;
  const newJy = Math.floor(total / 12);
  const newJm = (total % 12) + 1;
  return { jy: newJy, jm: newJm };
}

/** مقایسه‌ی دو تاریخ جلالی: منفی اگه a<b، صفر اگه برابر، مثبت اگه a>b */
export function compareJalali(a, b) {
  if (a.jy !== b.jy) return a.jy - b.jy;
  if (a.jm !== b.jm) return a.jm - b.jm;
  return a.jd - b.jd;
}

export function isSameJalaliDay(a, b) {
  return compareJalali(a, b) === 0;
}

/** "۱۴۰۳/۰۴/۰۱" */
export function formatJalaliNumeric(jy, jm, jd) {
  const mm = String(jm).padStart(2, "0");
  const dd = String(jd).padStart(2, "0");
  return toPersianDigits(`${jy}/${mm}/${dd}`);
}

/** "۱ تیر ۱۴۰۳" */
export function formatJalaliLong(jy, jm, jd) {
  return `${toPersianDigits(jd)} ${MONTH_LABELS[jm - 1]} ${toPersianDigits(jy)}`;
}

/** نام روز هفته برای یک تاریخ جلالی مشخص */
export function getWeekDayLabel(jy, jm, jd) {
  const gDate = jalaliToGregorian(jy, jm, jd);
  // JS getDay(): 0=یکشنبه ... 6=شنبه  →  می‌خوایم 0=شنبه ... 6=جمعه
  const persianIndex = (gDate.getDay() + 1) % 7;
  return WEEKDAY_LABELS[persianIndex];
}

/** ایندکس روز هفته (۰=شنبه ... ۶=جمعه) برای یک تاریخ جلالی */
export function getWeekDayIndex(jy, jm, jd) {
  const gDate = jalaliToGregorian(jy, jm, jd);
  return (gDate.getDay() + 1) % 7;
}
