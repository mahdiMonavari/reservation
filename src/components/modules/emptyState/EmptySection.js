function EmptySection({ title = "موردی یافت نشد", description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
      <div
        className="w-16 h-16 rounded-2xl
        bg-emerald-100 dark:bg-emerald-900/20
        text-emerald-500 dark:text-emerald-400
        flex items-center justify-center text-3xl"
      >
        🔍
      </div>
      <div className="text-center flex flex-col gap-1.5">
        <h3 className="text-base font-Morabba-Bold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-Dana-Medium text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmptySection;
