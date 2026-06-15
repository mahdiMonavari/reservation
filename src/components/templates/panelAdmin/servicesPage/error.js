"use client";
export default function error({ reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 gap-6">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl
          bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-2xl"
      >
        ✕
      </div>
      <div className="text-center flex flex-col gap-1.5">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
          خطا در دریافت اطلاعات
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          متأسفانه مشکلی پیش آمد، لطفاً دوباره تلاش کنید
        </p>
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold
          shadow-md shadow-violet-200 dark:shadow-violet-900/30
          transition-all duration-200 active:scale-95"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
