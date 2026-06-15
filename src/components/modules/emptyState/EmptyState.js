function EmptyState({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 gap-4">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl
          bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-2xl"
      >
        ○
      </div>
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          هنوز چیزی اضافه نشده
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
