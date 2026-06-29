import React from "react";

function UserPanelCard({ label, icon, border, color, value }) {
  const Icon = icon;
  return (
    <div
      key={label}
      className={`rounded-2xl border px-4 py-4 flex flex-col gap-2
                bg-white dark:bg-slate-900 ${border}`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={17} />
      </div>
      <p className="text-2xl font-Morabba-Bold text-slate-800 dark:text-white">
        {value.toLocaleString("fa-IR")}
      </p>
      <p className="text-xs font-Dana-Regular text-slate-400 dark:text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default UserPanelCard;
