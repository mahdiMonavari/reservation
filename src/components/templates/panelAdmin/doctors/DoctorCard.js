import React from "react";

function DoctorCard(s) {
  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-xl border ${s.bg} ${s.border}`}
    >
      <span className={`text-base ${s.color}`}>{s.icon}</span>
      <span className="text-xs text-slate-400 dark:text-slate-500">
        {s.label}
      </span>
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {s.value}
      </span>
    </div>
  );
}

export default DoctorCard;
