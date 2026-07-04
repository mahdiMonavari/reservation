import React from "react";

function ProffessionalCardProfile({
  color,
  isEditing,
  doctor,
  icon,
  label,
  name,
  type,
  form,
  handleChange,
  setForm,
}) {
  const handleMinuteValue = (value) => {
    const [hour, minute] = value.split(":");
    return minute;
  };
  const handleChangeMinute = (e, propty, value) => {
    const [hour, minute] = value.split(":");
    const time = `${hour}:${e.target.value}`;
    setForm((prev) => ({ ...prev, [propty]: time }));
  };
  const handleHourVlue = (value) => {
    const [hour, minute] = value.split(":");

    return hour;
  };
  const handleChangeHour = (e, propty, value) => {
    const [hour, minute] = value.split(":");
    const time = `${e.target.value}:${minute}`;
    setForm((prev) => ({ ...prev, [propty]: time }));
  };
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl
                bg-slate-50 dark:bg-slate-800/50
                border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-2">
        <span className={`text-base ${color}`}>{icon}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-Dana-Medium">
          {label}
        </span>
      </div>

      {isEditing ? (
        name !== "defaultStartHour" && name !== "defaultEndHour" ? (
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            className="bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-lg px-3 py-2 text-sm font-Dana-Medium
                      text-slate-700 dark:text-slate-200
                      focus:outline-none focus:ring-2 focus:ring-violet-400
                      transition-all duration-150"
          />
        ) : (
          <div className="flex items-center gap-2">
            <input
              name={name}
              value={handleMinuteValue(form[name])}
              onChange={(e) => handleChangeMinute(e, name, form[name])}
              type="number"
              className="w-full bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-lg px-3 py-2 text-sm font-Dana-Medium
                      text-slate-700 dark:text-slate-200
                      focus:outline-none focus:ring-2 focus:ring-violet-400
                      transition-all duration-150"
            />
            <span>:</span>
            <input
              name={name}
              value={handleHourVlue(form[name])}
              onChange={(e) => handleChangeHour(e, name, form[name])}
              type="number"
              className="w-full bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-lg px-3 py-2 text-sm font-Dana-Medium
                      text-slate-700 dark:text-slate-200
                      focus:outline-none focus:ring-2 focus:ring-violet-400
                      transition-all duration-150"
            />
          </div>
        )
      ) : (
        <span className="text-sm font-Morabba-Bold text-slate-700 dark:text-slate-200">
          {name === "baseFee" && doctor?.[name]
            ? Number(doctor[name]).toLocaleString("fa-IR")
            : doctor[name]
              ? doctor[name]
              : "-"}
        </span>
      )}
    </div>
  );
}

export default ProffessionalCardProfile;
