import Link from "next/link";
import { FiHome, FiCalendar } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* عدد ۴۰۴ */}
        <div className="relative mb-8">
          <p
            className="text-[10rem] font-Morabba-Bold leading-none
            text-emerald-100 dark:text-emerald-950/80 select-none"
          >
            ۴۰۴
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10
              border border-emerald-100 dark:border-emerald-500/20
              flex items-center justify-center"
            >
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        {/* متن */}
        <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-white mb-3">
          صفحه پیدا نشد
        </h1>
        <p className="text-sm font-Dana-Regular text-slate-400 dark:text-slate-500 leading-relaxed mb-8">
          صفحه‌ای که دنبالش می‌گردی وجود نداره یا منتقل شده.
          <br />
          می‌تونی به صفحه اصلی برگردی.
        </p>

        {/* دکمه‌ها */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
              text-white text-sm font-Morabba-Bold
              transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiHome size={15} />
            صفحه اصلی
          </Link>
          <Link
            href="/reservation"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              border border-emerald-200 dark:border-emerald-500/30
              text-emerald-600 dark:text-emerald-400
              hover:bg-emerald-50 dark:hover:bg-emerald-500/10
              text-sm font-Morabba-Bold transition-all duration-200"
          >
            <FiCalendar size={15} />
            رزرو نوبت
          </Link>
        </div>
      </div>
    </div>
  );
}
