export function toEnglishDigits(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);

  return str
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584));
}
