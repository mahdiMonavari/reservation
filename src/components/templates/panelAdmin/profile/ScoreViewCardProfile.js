import React from "react";

function ScoreViewCardProfile({ bg, border, color, icon, label, value }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border ${bg} ${border}`}
    >
      <span className={`text-2xl ${color}`}>{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {label}
        </span>
        <span className="text-lg font-Morabba-Bold text-slate-700 dark:text-slate-200">
          {value}
        </span>
      </div>
    </div>
  );
}

export default ScoreViewCardProfile;
